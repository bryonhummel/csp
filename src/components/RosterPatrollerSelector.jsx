import { useEffect, useState } from 'react'
import { useRoster } from '../hooks/useRoster'
import { TEAM_PRINT_ORDER, MEMBER_PRINT_ORDER } from '../utils/schedUtils'

function RosterPatrollerSelector({ onChange, label }) {
    const { roster } = useRoster()
    const [selected, setSelected] = useState(null)

    // set our default selection when we set our set of options
    useEffect(() => {
        onChange(selected)
    }, [selected])

    var options = []

    options.push(
        <option key={`null`} value={`null`}>
            Need Swap
        </option>
    )

    TEAM_PRINT_ORDER.map((t) => {
        if (!roster[t]) return null
        MEMBER_PRINT_ORDER.map((m) => {
            if (!roster[t][m]) return null
            options.push(
                <option key={`${t}${m}`} value={`${t}${m}`}>
                    {t}
                    {m.toUpperCase()} - {roster[t][m].first_name}{' '}
                    {roster[t][m].last_name}
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
                onChange={(e) => {
                    setSelected(e.target.value)
                }}
            >
                {options}
            </select>
        </div>
    )
}

export default RosterPatrollerSelector
