import { createContext, useContext, useMemo, useEffect, useState } from 'react'
import { fetchFullSchedule } from '../supabase/client'
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
            letter_list: row.letter_list,
        }
    })
    return scheduleData
}

export const ScheduleProvider = ({ children }) => {
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
