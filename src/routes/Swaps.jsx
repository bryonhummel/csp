import React from 'react'
import { useState } from 'react'
import Swap from '../components/Swap'
import { useSchedule } from '../hooks/useSchedule'
import { SHIFT_STRING_MAP } from '../utils/schedUtils'
import { useRoster, getRosterEntry } from '../hooks/useRoster'
import { Link } from 'react-router-dom'

function FilterToggle({ toggleValue, setToggle }) {
    return (
        <div className="ml-auto">
            <label className="relative me-5 inline-flex cursor-pointer items-center">
                <input
                    type="checkbox"
                    value=""
                    className="peer sr-only"
                    defaultChecked={toggleValue}
                    onClick={() => setToggle(!toggleValue)}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-red-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-red-800"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Show All
                </span>
            </label>
        </div>
    )
}

function NewSwap() {
    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Link to={'/members/swap'}>
                <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-600 pb-0.5 text-4xl text-white active:bg-red-700 md:hover:bg-red-700 ">
                    <span>+</span>
                </div>
            </Link>
        </div>
    )
}

function Swaps() {
    const { swaps } = useSchedule()
    const { roster } = useRoster()
    const [displayAllSwaps, setDisplayAllSwaps] = useState(false)

    var swap_list = []

    Object.entries(swaps).forEach(([dateKey, dateVal]) => {
        Object.entries(dateVal).forEach(([shiftKey, shiftVal]) => {
            Object.entries(shiftVal).forEach(([teamKey, letterObj]) => {
                Object.entries(letterObj).forEach(([letter, swap]) => {
                    const key = `${dateKey}${shiftKey}${teamKey}${letter}`
                    // console.log(
                    //     `${dateKey} ${shiftKey} ${teamKey}${letter} -> ${swap.to_team_number}${swap.to_letter}`
                    // )
                    const from = getRosterEntry(roster, teamKey, letter)

                    // I hate timezones - this seems to get what i want? not ideal
                    var date = new Date(Date.parse(dateKey))
                    date.setMinutes(
                        date.getMinutes() + date.getTimezoneOffset()
                    )

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
                    if (
                        displayAllSwaps ||
                        !(swap.to_team_number && swap.to_letter)
                    ) {
                        swap_list.push(<Swap key={key} swapInfo={swapInfo} />)
                    }
                })
            })
        })
    })

    return (
        <div className=" mx-auto my-2 max-w-4xl text-center">
            <h1 className="text-lg font-bold">Shift Swaps</h1>
            <NewSwap />
            <div className="my-2 flex flex-row-reverse">
                <span className="">
                    <FilterToggle
                        toggleValue={displayAllSwaps}
                        setToggle={setDisplayAllSwaps}
                    />
                </span>
            </div>
            <div className="mx-2 grid gap-2 md:grid-cols-2">{swap_list}</div>
        </div>
    )
}

export default Swaps
