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
    //       8-1:  { team_number: NUM, letter_list: ABC},
    //       10-5: { team_number: NUM, letter_list: DI},
    //       1-9:  { team_number: NUM, letter_list: DEFGHI},
    //   }
    // }

    sqlData.map((row) => {
        scheduleData[row.date] = scheduleData[row.date] || {}
        scheduleData[row.date][row.shift] = scheduleData[row.date][
            row.shift
        ] || {
            team_number: row.team_number,
            letter_list: row.letter_list.toLowerCase(),
        }
    })
    return scheduleData
}

// returns a list of dates where myTeam+myLetter are scheduled
function getMyEvents(schedule, myTeam, myLetter) {
    var myEvents = {}

    Object.entries(schedule).forEach(([date, val]) => {
        Object.entries(val).forEach(([shift, shiftInfo]) => {
            if (
                shiftInfo.team_number == myTeam &&
                shiftInfo.letter_list.includes(myLetter)
            ) {
                myEvents[date] = shift
            }
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
