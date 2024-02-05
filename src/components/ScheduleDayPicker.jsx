import { useState } from 'react'
import {
    DAY_STRING_2CH_MAP,
    MONTH_STRING_MAP,
    isDateToday,
} from '../utils/schedUtils'

function getLastSunday(d, offset = 0) {
    var t = new Date(d)
    t.setDate(t.getDate() - t.getDay() + offset)
    return t
}

function ScheduleDayPicker({ onDateChange, selectedDate }) {
    // index from 0 for the day of the week (starting with sunday==0)
    const selected = selectedDate.getDay()

    function DayButton({
        dayStr,
        month,
        day,
        first,
        last,
        active,
        scheduled,
        onClick,
        isToday,
    }) {
        const fStyle = first
            ? 'rounded-tl-lg rounded-bl-lg border-l border-b border-t '
            : ''
        const lStyle = last
            ? 'rounded-tr-lg rounded-br-lg border-t border-r border-b '
            : ''
        const mStyle = !first && !last ? 'border-t border-b ' : ''

        const activeStyle = active ? 'bg-red-600 text-white ' : ' '
        const scheduledStyle =
            scheduled && !active
                ? 'border border-gray-400 rounded-md '
                : 'border border-transparent '
        const isTodayStyle = isToday ? 'font-bold ' : ''
        return (
            <div className="flex-1 cursor-pointer" onClick={onClick}>
                <span className="text-gray-400">{dayStr}</span>
                <div className={'bg-white ' + fStyle + lStyle + mStyle}>
                    <div
                        className={
                            'm-1 rounded-md ' +
                            activeStyle +
                            scheduledStyle +
                            isTodayStyle
                        }
                    >
                        {month} <br /> {day}
                    </div>
                </div>
            </div>
        )
    }

    // weird hack cuz i can't think of abetter way to do this...
    // get last sunday... offset by 1 (last saturday)
    // we will iterate below with a pre-incrememnt so we start the week on sunday
    const sundayDate = getLastSunday(selectedDate)
    var d = getLastSunday(selectedDate, -1)
    var prevMon = null
    return (
        <div className="flex rounded-lg bg-gray-200 shadow">
            {DAY_STRING_2CH_MAP.map((day, idx) => {
                // loop through the week starting at sunday
                d.setDate(d.getDate() + 1)
                var displayMonth = ''
                if (prevMon != d.getMonth() || true) {
                    prevMon = d.getMonth()
                    displayMonth = MONTH_STRING_MAP[d.getMonth()]
                }
                return (
                    <DayButton
                        onClick={() => {
                            const selected = new Date(sundayDate)
                            selected.setDate(sundayDate.getDate() + idx)
                            onDateChange(selected)
                        }}
                        key={idx}
                        dayStr={day}
                        month={displayMonth}
                        day={d.getDate()}
                        first={idx == 0}
                        last={idx == 6}
                        active={idx == selected}
                        scheduled={idx == 4} // Bryon TODO: need to create helper to know what MY schedule is
                        isToday={isDateToday(d)}
                    />
                )
            })}
        </div>
    )
}

export default ScheduleDayPicker
