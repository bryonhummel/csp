import {
    DAY_STRING_2CH_MAP,
    MONTH_STRING_MAP,
    isDateToday,
} from '../utils/schedUtils'
import TwoToneCard from './TwoToneCard'

function getLastSunday(d, offset = 0) {
    var t = new Date(d)
    t.setDate(t.getDate() - t.getDay() + offset)
    return t
}

function ScheduleDayPicker({ onDateChange, selectedDate }) {
    // index from 0 for the day of the week (starting with sunday==0)
    const selected = selectedDate.getDay()
    const sundayDate = getLastSunday(selectedDate)

    function DayButton({ month, day, active, scheduled, onClick, isToday }) {
        const activeStyle = active ? 'bg-red-600 text-white ' : ' '
        const scheduledStyle =
            scheduled && !active
                ? 'border border-gray-400 rounded-md '
                : 'border border-transparent '
        const isTodayStyle = isToday ? 'font-bold ' : ''
        return (
            <div className="flex-1 cursor-pointer" onClick={onClick}>
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
        )
    }

    // weird hack cuz i can't think of abetter way to do this...
    // get last sunday... offset by 1 (last saturday)
    // we will iterate below with a pre-incrememnt so we start the week on sunday
    var d = getLastSunday(selectedDate, -1)

    const fillButtons = () => {
        return DAY_STRING_2CH_MAP.map((_, idx) => {
            // loop through the week starting at sunday
            d.setDate(d.getDate() + 1)
            return (
                <DayButton
                    onClick={() => {
                        const selected = new Date(sundayDate)
                        selected.setDate(sundayDate.getDate() + idx)
                        onDateChange(selected)
                    }}
                    key={idx}
                    month={MONTH_STRING_MAP[d.getMonth()]}
                    day={d.getDate()}
                    active={idx == selected}
                    scheduled={idx == 4} // Bryon TODO: need to create helper to know what MY schedule is
                    isToday={isDateToday(d)}
                />
            )
        })
    }

    return (
        <TwoToneCard
            headerContent={DAY_STRING_2CH_MAP.map((day) => {
                return (
                    <span
                        key={day}
                        className="flex-1 justify-between text-gray-400"
                    >
                        {day}
                    </span>
                )
            })}
            bodyContent={<div className="flex">{fillButtons()}</div>}
        />
    )
}

export default ScheduleDayPicker
