import { useEffect, useState } from 'react'
import { useRoster, getRosterEntry } from '../hooks/useRoster'
import { useSchedule } from '../hooks/useSchedule'

function ShiftPatrollerSelector({
    onChange,
    label,
    selectedValue,
    patrollerOptions,
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
            <label htmlFor="to-select">{label}</label>

            <select
                id="to-select"
                className="flex-1"
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
