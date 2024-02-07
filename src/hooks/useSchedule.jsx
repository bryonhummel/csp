import { createContext, useContext, useMemo, useEffect, useState } from 'react'
import { fetchFullSchedule } from '../supabase/client'
import { useAuth } from './useAuth'
const ScheduleContext = createContext()

function parseSchedule(sqlData) {
    var scheduleData = {}

    // construct an object that looks like:
    // TODO: maybe will include swaps later?
    // {
    //   YYYY-MM-DD: {
    //       8-1: {
    //         NUM: {
    //           letter_list: abc
    //         }
    //       }
    //       10-5: {
    //         NUM: {
    //           letter_list: abc
    //         },
    //         NUM2: {
    //           letter_list: abc
    //         }
    //       }
    //   }
    // }

    sqlData.map((row) => {
        scheduleData[row.date] = scheduleData[row.date] || {}
        scheduleData[row.date][row.shift] =
            scheduleData[row.date][row.shift] || {}
        scheduleData[row.date][row.shift][row.team_number] = scheduleData[
            row.date
        ][row.shift][row.team_number] || {
            letter_list: row.letter_list.toLowerCase(),
        }
    })
    console.log(scheduleData)
    return scheduleData
}

// returns a list of dates where myTeam+myLetter are scheduled
function getMyEvents(schedule, myTeam, myLetter) {
    var myEvents = {}

    Object.entries(schedule).forEach(([dateKey, dateVal]) => {
        Object.entries(dateVal).forEach(([shiftKey, shiftVal]) => {
            Object.entries(shiftVal).forEach(([teamKey, teamVal]) => {
                if (
                    teamKey == myTeam &&
                    teamVal.letter_list.includes(myLetter)
                ) {
                    myEvents[dateKey] = shiftKey
                }
            })
        })
    })
    return myEvents
}

export const ScheduleProvider = ({ children }) => {
    const { cspUser } = useAuth()
    const [schedule, setSchedule] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchFullSchedule()
            const parsedData = parseSchedule(data)
            setSchedule(parsedData)
        }
        fetchData()
        return () => {
            setSchedule({})
        }
    }, [])

    const value = useMemo(
        () => ({
            schedule,
            myEvents: getMyEvents(
                schedule,
                cspUser.team_number,
                cspUser.team_letter
            ),
        }),
        [schedule]
    )
    return (
        <ScheduleContext.Provider value={value}>
            {children}
        </ScheduleContext.Provider>
    )
}

export const useSchedule = () => {
    return useContext(ScheduleContext)
}
