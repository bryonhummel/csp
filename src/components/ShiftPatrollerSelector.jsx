import { useEffect, useState } from 'react'
import { useRoster, getRosterEntry } from '../hooks/useRoster'
import { useSchedule } from '../hooks/useSchedule'

function ShiftPatrollerSelector({
    onChange,
    selectedValue,
    patrollerOptions,
    disabled,
}) {
    const { roster } = useRoster()

    // if we don't have a selected value, take the first
    // one in the list
    useEffect(() => {
        const [team, letters] = Object.entries(patrollerOptions)[0] || [
            null,
            { letter_list: '' },
        ]

        const first_letter = letters?.letter_list.split('')[0]
        if (!selectedValue && first_letter) {
            onChange(`${team}${first_letter}`)
        }
    }, [selectedValue, patrollerOptions])

    var options = []

    Object.entries(patrollerOptions).forEach(([shiftTeam, info]) => {
        const letters = info?.letter_list.split('') || []
        letters.map((letter) => {
            const rosterEntry = getRosterEntry(roster, shiftTeam, letter)
            options.push(
                <option
                    key={`${shiftTeam}${letter}`}
                    value={`${shiftTeam}${letter}`}
                >
                    {shiftTeam}
                    {letter.toUpperCase()} - {rosterEntry.first_name}{' '}
                    {rosterEntry.last_name}
                </option>
            )
        })
    })

    return (
        <div className="flex">
            <select
                id="to-select"
                className="flex-1 appearance-none rounded-lg bg-gray-200 p-1 px-2 text-black disabled:bg-white disabled:font-bold disabled:opacity-100"
                disabled={disabled}
                value={selectedValue ? selectedValue : ''}
                onChange={(e) => {
                    onChange(e.target.value)
                }}
            >
                {options}
            </select>
        </div>
    )
}

export default ShiftPatrollerSelector
