import { createContext, useContext, useMemo, useEffect, useState } from 'react'
import { fetchRoster } from '../supabase/client'
const RosterContext = createContext()

function parseRoster(sqlData) {
    var rosterData = {}
    sqlData.map((row) => {
        const team_number = row.team_number || null
        const team_letter = row.team_letter || null

        // Assumes
        // Team 1-5 (volunteer) as normal
        // Team 6 == Weekday (if they are not assigned to a volunteer team)
        // If someone does both weekday and volunteer, their name is in volunteer schedule/team/letter list only
        // If they only do weekday then they are in team 6
        // Team 7 == Unassigned
        // Exec (PL/APL) who are not on a team, are on team 7
        if (team_number != null && team_letter != null) {
            rosterData[team_number] = rosterData[team_number] || {}
            rosterData[team_number][team_letter] = {
                csp_id: row.csp_id,
                uuid: row.id,
                email: row.email,
                cell: row.cell,
                first_name: row.first_name,
                last_name: row.last_name,
            }
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

export function getRosterEntry(roster, team_number, team_letter) {
    if (roster[team_number] && roster[team_number][team_letter]) {
        return roster[team_number][team_letter]
    }
    return {
        csp_id: 0,
        uuid: 0,
        first_name: 'Unknown',
        last_name: 'Unknown',
    }
}
