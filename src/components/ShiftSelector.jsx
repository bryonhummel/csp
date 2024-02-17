import { useState, useEffect } from 'react'
import { SHIFT_STRING_MAP } from '../utils/schedUtils'
import { useSchedule } from '../hooks/useSchedule'

function ShiftSelector({ onChange, label, selectedValue, shiftOptions }) {
    console.log('ShiftSelector selectedValue: ', selectedValue)
    var options = []

    shiftOptions.map((shift) => {
        options.push(
            <option key={shift} value={shift}>
                {SHIFT_STRING_MAP[shift]}
            </option>
        )
    })

    console.log('ShiftSelector ', selectedValue)
    console.log('shiftOptions ', shiftOptions)
    // if we don't have a selected value, take the first
    // one in the list
    useEffect(() => {
        console.log('ShiftSelector useEffect called')
        if (!selectedValue && shiftOptions?.[0]) {
            onChange(shiftOptions[0])
        }
    }, [selectedValue, shiftOptions])

    return (
        <div className="flex">
            <label htmlFor="shift-select">{label}</label>

            <select
                id="shift-select"
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

export default ShiftSelector
