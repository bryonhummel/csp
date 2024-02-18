import { useEffect, useState } from 'react'
import { useRoster } from '../hooks/useRoster'
import { TEAM_PRINT_ORDER, MEMBER_PRINT_ORDER } from '../utils/schedUtils'

function RosterPatrollerSelector({
    onChange,
    label,
    patrollerOptions,
    selectedValue,
}) {
    var options = []

    options.push(
        <option key={`null`} value={''}>
            Need Swap
        </option>
    )

    TEAM_PRINT_ORDER.map((t) => {
        if (!patrollerOptions[t]) return null
        MEMBER_PRINT_ORDER.map((m) => {
            if (!patrollerOptions[t][m]) return null
            options.push(
                <option key={`${t}${m}`} value={`${t}${m}`}>
                    {t}
                    {m.toUpperCase()} - {patrollerOptions[t][m].first_name}{' '}
                    {patrollerOptions[t][m].last_name}
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
                value={selectedValue == null ? '' : selectedValue}
                onChange={(e) => {
                    onChange(e.target.value == '' ? null : e.target.value)
                }}
            >
                {options}
            </select>
        </div>
    )
}

export default RosterPatrollerSelector
