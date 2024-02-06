import {
    DAY_STRING_2CH_MAP,
    MONTH_STRING_FULL_MAP,
    MONTH_STRING_MAP,
    isDateToday,
} from '../utils/schedUtils'
import TwoToneCard from './TwoToneCard'
import { Link } from 'react-router-dom'

function Cell({ isToday, hasEvent, date }) {
    const todayStyle = isToday ? 'bg-gray-200 font-bold' : ''

    const eventStyle = hasEvent
        ? 'border border-gray-400'
        : 'border border-transparent'
    return (
        <span
            className={`m-1 flex-1 rounded-lg py-2 ${todayStyle} ${eventStyle}`}
        >
            {date && (
                <Link to={'/members/schedule'} state={{ selectedDate: date }}>
                    {date.getDate()}
                </Link>
            )}
        </span>
    )
}

function Calendar({ startDate, eventDaysList = [] }) {
    let dateNum = 1
    let firstDay = new Date(startDate),
        firstWeekDay
    let i
    let lastDate
    let month = []
    let week = []
    firstDay.setDate(1)
    lastDate = new Date(firstDay.getTime())
    lastDate.setMonth(lastDate.getMonth() + 1) // the first day of the next month
    lastDate = new Date(lastDate.getTime() - 86400000) //the first day of the next month minus 1 day
    firstWeekDay = firstDay.getDay()
    const today = new Date()
    const todayDate = today.getDate()
    const todayMonth = today.getMonth()

    const hasEvent = (d) => {
        return eventDaysList.includes(d)
    }

    const isToday = (d) => {
        return todayMonth == startDate.getMonth() && todayDate == d
    }

    for (i = 0; i < firstWeekDay; i++) {
        week.push('')
    }
    for (i = firstWeekDay; i < 7; i++) {
        week.push(dateNum++)
    }
    month.push(week)

    while (dateNum <= lastDate.getDate()) {
        week = []
        for (i = 0; i < 7; i++) {
            if (dateNum <= lastDate.getDate()) {
                week.push(dateNum++)
            } else {
                week.push('')
            }
        }
        month.push(week)
    }
    return (
        <div className="p-1">
            {month.map((week, wkidx) => (
                <div className="flex" key={wkidx}>
                    {week.map((day, dayidx) => {
                        let d = new Date(firstDay)
                        d.setDate(day)
                        return (
                            <Cell
                                key={dayidx}
                                date={day != '' ? d : null}
                                isToday={isToday(day)}
                                hasEvent={hasEvent(day)}
                            />
                        )
                    })}
                </div>
            ))}
        </div>
    )
}

function ScheduleMonthPicker({ startDate, eventDaysList = [] }) {
    return (
        <div className="m-2 mt-6 text-center">
            <h1 className="m-2 text-lg font-bold">
                {MONTH_STRING_FULL_MAP[startDate.getMonth()]}{' '}
                {startDate.getFullYear()}
            </h1>
            <TwoToneCard
                headerContent={
                    <div className="flex w-full px-1">
                        {DAY_STRING_2CH_MAP.map((day) => {
                            return (
                                <span
                                    key={day}
                                    className="flex-1 justify-between text-gray-400"
                                >
                                    {day}
                                </span>
                            )
                        })}
                    </div>
                }
                bodyContent={
                    <Calendar
                        startDate={startDate}
                        eventDaysList={eventDaysList}
                    />
                }
            />
        </div>
    )
}

export default ScheduleMonthPicker
