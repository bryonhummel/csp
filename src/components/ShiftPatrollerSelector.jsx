import { useEffect, useState } from 'react'
import { useRoster, getRosterEntry } from '../hooks/useRoster'
import { useSchedule } from '../hooks/useSchedule'

function ShiftPatrollerSelector({ onChange, label, date, shift }) {
    const { roster } = useRoster()
    const { schedule } = useSchedule()
    let scheduledShifts = schedule?.[date] || {}
    const shiftInfo = scheduledShifts?.[shift] || {}

    const [selected, setSelected] = useState(() => {
        const [team_number, letter] = Object.entries(shiftInfo)[0] || [
            '',
            { letter_list: '' },
        ]
        const selectedValue = `${team_number}${letter.letter_list.split('')[0]}`
        return selectedValue
    })

    useEffect(() => {
        const [team_number, letter] = Object.entries(shiftInfo)[0] || ['', '']
        const ll = (letter?.letter_list || '').split('')[0]
        const selectedValue = `${team_number}${ll}`
        setSelected(selectedValue)
        onChange(selectedValue)
    }, [shiftInfo])

    var options = []

    Object.entries(shiftInfo).forEach(([shiftTeam, info]) => {
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
                value={selected}
                onChange={(e) => {
                    setSelected(e.target.value)
                    if (onChange) {
                        onChange(e.target.value)
                    }
                }}
            >
                {options}
            </select>
        </div>
    )
}

export default ShiftPatrollerSelector
