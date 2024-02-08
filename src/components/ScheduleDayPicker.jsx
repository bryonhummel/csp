import {
    DAY_STRING_2CH_MAP,
    MONTH_STRING_MAP,
    isDateToday,
    getISOStringLocalTZ,
} from '../utils/schedUtils'
import TwoToneCard from './TwoToneCard'
import { useSchedule } from '../hooks/useSchedule'

function getLastSunday(d, offset = 0) {
    var t = new Date(d)
    t.setDate(t.getDate() - t.getDay() + offset)
    return t
}

function DayButton({ month, day, active, scheduled, onClick, isToday }) {
    // TODO: i'm sure there is a better way to manage these styles :(
    let borderColour = ''
    let textColour = ''
    let textWeight = ''
    let bgColour = ''
    let borderStyle = 'border-b-2 border-transparent'

    if (isToday) {
        textColour = 'text-red-600'
    }
    if (scheduled) {
        borderStyle = 'border-b-2 border-gray-500'
    }

    if (active) {
        bgColour = 'bg-red-600'
        textColour = 'text-white'
    }
    if (active && scheduled) {
        borderColour = 'border-white'
    }

    if (isToday || scheduled) {
        textWeight = 'font-bold'
    }

    const boxStyle = `${bgColour}`
    const textStyle = `${textColour} ${textWeight} ${borderColour} ${borderStyle}`
    return (
        <div className="block flex-1 cursor-pointer" onClick={onClick}>
            <div className={`mx-1 my-1 rounded ${boxStyle}`}>
                <div className="m-auto w-fit py-2 leading-5">
                    <div className={`${textStyle} mx-auto`}>
                        {month} <br /> {day}
                    </div>
                </div>
            </div>
        </div>
    )
}

function ScheduleDayPicker({ onDateChange, selectedDate }) {
    const { myEvents } = useSchedule()
    // index from 0 for the day of the week (starting with sunday==0)
    const selected = selectedDate.getDay()
    const sundayDate = getLastSunday(selectedDate)

    // weird hack cuz i can't think of abetter way to do this...
    // get last sunday... offset by 1 (last saturday)
    // we will iterate below with a pre-incrememnt so we start the week on sunday
    var d = getLastSunday(selectedDate, -1)

    const fillButtons = () => {
        return DAY_STRING_2CH_MAP.map((_, idx) => {
            // loop through the week starting at sunday
            d.setDate(d.getDate() + 1)
            const scheduled = getISOStringLocalTZ(d) in myEvents
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
                    scheduled={scheduled} // Bryon TODO: need to create helper to know what MY schedule is
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
