import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ScheduleDayCard from '../components/ScheduleDayCard'
import ScheduleDayPicker from '../components/ScheduleDayPicker'
import { useSchedule } from '../hooks/useSchedule'
import { getISOStringLocalTZ } from '../utils/schedUtils'

function Schedule() {
    const { schedule } = useSchedule()
    let { state } = useLocation()
    // if we were linked a specific date (from calendar picker) start there...
    // otherwise load the current date/week
    const [selectedDate, setSelectedDate] = useState(
        state ? new Date(Date.parse(state.selectedDate)) : new Date()
    )

    const dayInfo = schedule[getISOStringLocalTZ(selectedDate)] || null

    return (
        <div className=" mx-auto my-2 max-w-4xl text-center">
            <div className="mx-2 grid gap-2">
                <div className="flex justify-around pb-1 text-lg">
                    <span
                        className="cursor-pointer"
                        onClick={() => {
                            var d = new Date(selectedDate)
                            d.setDate(d.getDate() - 7)
                            setSelectedDate(d)
                        }}
                    >
                        &#60;&#60;
                    </span>
                    <span onClick={() => setSelectedDate(new Date())}>
                        <h1 className="cursor-pointer font-bold">Schedule</h1>
                    </span>
                    <span
                        className="cursor-pointer"
                        onClick={() => {
                            var d = new Date(selectedDate)
                            d.setDate(d.getDate() + 7)
                            setSelectedDate(d)
                        }}
                    >
                        &#62;&#62;
                    </span>
                </div>
                <ScheduleDayPicker
                    onDateChange={setSelectedDate}
                    selectedDate={selectedDate}
                />
                {dayInfo && (
                    <ScheduleDayCard date={selectedDate} dayInfo={dayInfo} />
                )}
            </div>
        </div>
    )
}

export default Schedule
