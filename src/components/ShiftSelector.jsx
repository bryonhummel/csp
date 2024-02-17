import { useState, useEffect } from 'react'
import { SHIFT_STRING_MAP } from '../utils/schedUtils'
import { useSchedule } from '../hooks/useSchedule'

function ShiftSelector({ onChange, label, date }) {
    const { schedule } = useSchedule()

    const scheduledShifts = schedule?.[date] || {}
    const shiftList = Object.keys(scheduledShifts)

    const [selected, setSelected] = useState(() => {
        const scheduledShifts = schedule?.[date] || {}
        const shiftList = Object.keys(scheduledShifts)
        return shiftList[0]
    })

    useEffect(() => {
        if (!selected) {
            setSelected(shiftList[0])
        }
        onChange(shiftList[0])
    }, [date, schedule])

    var options = []

    shiftList.map((shift) => {
        options.push(
            <option key={shift} value={shift}>
                {SHIFT_STRING_MAP[shift]}
            </option>
        )
    })

    return (
        <div className="flex">
            <label htmlFor="shift-select">{label}</label>

            <select
                id="shift-select"
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

    // return (
    //     <div className="flex">
    //         <label htmlFor="shift-select">Shift:</label>

    //         <select
    //             id="shift-select"
    //             className="flex-1"
    //             onChange={(e) => {
    //                 setShiftPickerValue(e.target.value)
    //             }}
    //         >
    //             {shiftPickerOptions.map((shift) => {
    //                 return (
    //                     <option key={shift} value={shift}>
    //                         {SHIFT_STRING_MAP[shift]}
    //                     </option>
    //                 )
    //             })}
    //         </select>
    //     </div>
    // )
}

export default ShiftSelector
