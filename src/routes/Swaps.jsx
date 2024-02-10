import React from 'react'
import Swap from '../components/Swap'
import { useSchedule } from '../hooks/useSchedule'
import { SHIFT_STRING_MAP } from '../utils/schedUtils'
import { useRoster, getRosterEntry } from '../hooks/useRoster'

function Swaps() {
    const { swaps } = useSchedule()
    const { roster } = useRoster()

    var swap_list = []

    Object.entries(swaps).forEach(([dateKey, dateVal]) => {
        Object.entries(dateVal).forEach(([shiftKey, shiftVal]) => {
            Object.entries(shiftVal).forEach(([teamKey, letterObj]) => {
                const [letter, swap] = Object.entries(letterObj)[0]
                const key = `${dateKey}${shiftKey}${teamKey}${letter}`
                // console.log(
                //     `${dateKey} ${shiftKey} ${teamKey}${letter} -> ${swap.to_team_number}${swap.to_letter}`
                // )
                const from = getRosterEntry(roster, teamKey, letter)

                // I hate timezones - this seems to get what i want? not ideal
                var date = new Date(Date.parse(dateKey))
                date.setMinutes(date.getMinutes() + date.getTimezoneOffset())

                var swapInfo = {
                    fromPatroller: {
                        firstName: from.first_name,
                        lastName: from.last_name,
                        team: teamKey,
                        letter: letter,
                    },
                    shiftInfo: {
                        date: date,
                        team: teamKey,
                        hours: SHIFT_STRING_MAP[shiftKey],
                    },
                }
                if (swap.to_team_number && swap.to_letter) {
                    const to = getRosterEntry(
                        roster,
                        swap.to_team_number,
                        swap.to_letter
                    )
                    swapInfo['toPatroller'] = {
                        firstName: to.first_name,
                        lastName: to.last_name,
                        team: swap.to_team_number,
                        letter: swap.to_letter,
                    }
                }
                swap_list.push(<Swap key={key} swapInfo={swapInfo} />)
            })
        })
    })

    return (
        <div className=" mx-auto my-2 max-w-4xl text-center">
            <div className="mx-2 grid gap-2 md:grid-cols-2">
                <h1 className="text-lg font-bold">Shift Swaps</h1>
                {swap_list}
            </div>
        </div>
    )
}

export default Swaps
