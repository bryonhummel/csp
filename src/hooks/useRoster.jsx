import { createContext, useContext, useMemo, useEffect, useState } from 'react'
import { fetchRoster } from '../supabase/client'
const RosterContext = createContext()

function parseRoster(sqlData) {
    var rosterData = {}
    sqlData.map((row) => {
        const team_number = row.team_number || null
        const team_letter = row.team_letter || null

        // first account for assigned volunteer teams (exclude 6, we handle that later since they don't have letters)
        if (team_number != null && team_letter != null && team_number != 6) {
            rosterData[team_number] = rosterData[team_number] || {}
            rosterData[team_number][team_letter] = {
                csp_id: row.csp_id,
                uuid: row.id,
                email: row.email,
                cell: row.cell,
                first_name: row.first_name,
                last_name: row.last_name,
            }
        } else if (team_number === null && !row.weekday) {
            // if no team is assigned use 0 as a placeholder list of unrostered patrollers
            if (!('0' in rosterData)) {
                rosterData['0'] = []
            }
            rosterData['0'].push({
                csp_id: row.csp_id,
                uuid: row.id,
                email: row.email,
                cell: row.cell,
                first_name: row.first_name,
                last_name: row.last_name,
            })
        }

        // if they aren't only on team 6 (weekday) make sure we add them to the list
        if (row.team_number === 6 || row.weekday) {
            if (!('6' in rosterData)) {
                rosterData['6'] = []
            }
            rosterData['6'].push({
                csp_id: row.csp_id,
                uuid: row.id,
                email: row.email,
                cell: row.cell,
                first_name: row.first_name,
                last_name: row.last_name,
            })
        }

        // add whoever is flagged as PL/APL to the exec list
        if (row.executive != null) {
            rosterData.exec = rosterData.exec || {}
            rosterData.exec[row.executive] = {
                csp_id: row.csp_id,
                uuid: row.id,
                email: row.email,
                cell: row.cell,
                first_name: row.first_name,
                last_name: row.last_name,
            }
        }
    })
    return rosterData
}

export const RosterProvider = ({ children }) => {
    const [roster, setRoster] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchRoster()
            const parsedData = parseRoster(data)
            setRoster(parsedData)
        }
        fetchData()
        return () => {
            setRoster({})
        }
    }, [])

    const value = useMemo(
        () => ({
            roster,
        }),
        [roster]
    )
    return (
        <RosterContext.Provider value={value}>
            {children}
        </RosterContext.Provider>
    )
}

export const useRoster = () => {
    return useContext(RosterContext)
}
