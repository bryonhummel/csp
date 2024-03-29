import { useState, useEffect } from 'react'
import { SHIFT_STRING_MAP } from '../utils/schedUtils'
import { useSchedule } from '../hooks/useSchedule'

function ShiftSelector({ onChange, selectedValue, shiftOptions, disabled }) {
    var options = []

    shiftOptions.map((shift) => {
        options.push(
            <option key={shift} value={shift}>
                {SHIFT_STRING_MAP[shift]}
            </option>
        )
    })

    // if we don't have a selected value, take the first
    // one in the list
    useEffect(() => {
        if (!selectedValue && shiftOptions?.[0]) {
            onChange(shiftOptions[0])
        }
    }, [selectedValue, shiftOptions])

    return (
        <div className="flex">
            <select
                id="shift-select"
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

export default ShiftSelector
