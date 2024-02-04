import { useState } from 'react'
import { DAY_STRING_2CH_MAP } from '../utils/schedUtils'

function ScheduleDayPicker({ onDateChange }) {
    const [selected, setSelected] = useState(0)

    function DayButton({
        dayStr,
        month,
        day,
        first,
        last,
        active,
        scheduled,
        onClick,
    }) {
        const fStyle = first
            ? 'rounded-tl-lg rounded-bl-lg border-l border-b border-t '
            : ''
        const lStyle = last
            ? 'rounded-tr-lg rounded-br-lg border-t border-r border-b '
            : ''
        const mStyle = !first && !last ? 'border-t border-b ' : ''

        const activeStyle = active
            ? 'bg-red-600 text-white '
            : ' border border-transparent'
        const scheduledStyle =
            scheduled && !active
                ? 'border border-gray-400 rounded-md '
                : 'border border-transparent '
        return (
            <div className="flex-1 cursor-pointer" onClick={onClick}>
                <span className="text-gray-400">{dayStr}</span>
                <div className={'bg-white ' + fStyle + lStyle + mStyle}>
                    <div
                        className={
                            'm-1 rounded-md ' + activeStyle + scheduledStyle
                        }
                    >
                        {month} <br /> {day}
                    </div>
                </div>
            </div>
        )
    }

    // hack... need to figure out how i'm doing this for real
    const months = ['Feb', 'Feb', 'Feb', 'Feb', 'Feb', 'Feb', 'Feb']
    // hack... need to figure out how i'm doing this for real
    const dates = [4, 5, 6, 7, 8, 9, 10]
    const hasEvent = [4, 8, 9]

    return (
        <div className="flex rounded-lg bg-gray-200 shadow">
            {DAY_STRING_2CH_MAP.map((day, idx) => {
                return (
                    <DayButton
                        onClick={() => {
                            setSelected(idx)
                            // hack for date change
                            onDateChange(
                                '2024-02-' + String(dates[idx]).padStart(2, '0')
                            )
                        }}
                        key={idx}
                        dayStr={day}
                        month={months[idx]}
                        day={dates[idx]}
                        first={idx == 0}
                        last={idx == 6}
                        active={idx == selected}
                        scheduled={hasEvent.includes(dates[idx])}
                    />
                )
            })}
        </div>
    )
}

export default ScheduleDayPicker
