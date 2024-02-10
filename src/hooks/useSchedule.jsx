import { createContext, useContext, useMemo, useEffect, useState } from 'react'
import { fetchFullSchedule, fetchSwaps } from '../supabase/client'
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
    return scheduleData
}

function parseSwaps(sqlData) {
    var swapData = {}
    // construct an object that looks like:
    // {
    //   YYYY-MM-DD: {
    //       8-1: {
    //         NUM: {
    //           LETTER: {
    //               swap: {
    //                 team_number: 4
    //                 letter: b
    //               }
    //         }
    //       }
    //   }
    // }

    sqlData.map((row) => {
        swapData[row.date] = swapData[row.date] || {}
        swapData[row.date][row.shift] = swapData[row.date][row.shift] || {}

        swapData[row.date][row.shift][row.from_team] =
            swapData[row.date][row.shift][row.from_team] || {}

        swapData[row.date][row.shift][row.from_team][row.from_letter] = {
            to_team_number: row.to_team,
            to_letter: row.to_letter,
        }
    })
    return swapData
}

// returns a list of dates where myTeam+myLetter are scheduled
function getMyEvents(schedule, swaps, myTeam, myLetter) {
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

    // now go manipulate all the swap data from my events
    // - remove events where there is a "from" swap defined with a "to" available
    // - add events where a "to" swap is defined

    Object.entries(swaps).forEach(([dateKey, dateVal]) => {
        Object.entries(dateVal).forEach(([shiftKey, shiftVal]) => {
            Object.entries(shiftVal).forEach(([teamKey, letterObj]) => {
                const [letter, swap] = Object.entries(letterObj)[0]
                // found a FROM entry for me
                if (
                    teamKey == myTeam &&
                    letter == myLetter &&
                    swap.to_team_number != myTeam &&
                    swap.to_letter != myLetter &&
                    swap.to_team_number != null &&
                    swap.to_letter != null
                ) {
                    // console.log(
                    //     `REMOVE SWAP FOUND: from ${myTeam}${myLetter} to ${swap.to_team_number}${swap.to_letter}`
                    // )
                    delete myEvents[dateKey]
                }

                // found a TO entry for me
                if (
                    swap.to_team_number == myTeam &&
                    swap.to_letter == myLetter
                ) {
                    // console.log(
                    //     `ADD SWAP FOUND: from ${teamKey}${letter} to ${swap.to_team_number}${swap.to_letter}`
                    // )
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
    const [swaps, setSwaps] = useState({})

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

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchSwaps()
            const parsedData = parseSwaps(data)
            setSwaps(parsedData)
        }
        fetchData()
        return () => {
            setSwaps({})
        }
    }, [])

    const value = useMemo(
        () => ({
            schedule,
            myEvents: getMyEvents(
                schedule,
                swaps,
                cspUser.team_number,
                cspUser.team_letter
            ),
            swaps,
        }),
        [schedule, swaps]
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

export function getSwapIfExist(date, shift, team, letter) {
    const { swaps } = useSchedule()
    return swaps?.[date]?.[shift]?.[team]?.[letter]
}
