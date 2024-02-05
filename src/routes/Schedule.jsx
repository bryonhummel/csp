import React from 'react'
import { useState } from 'react'
import ScheduleDayCard from '../components/ScheduleDayCard'
import ScheduleDayPicker from '../components/ScheduleDayPicker'
import { useSchedule } from '../hooks/useSchedule'

function getTodayFormattedDate(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function Schedule() {
    const { schedule } = useSchedule()
    const [selectedDate, setSelectedDate] = useState(new Date())

    const dayInfo = schedule[getTodayFormattedDate(selectedDate)] || null

    return (
        <div className=" mx-auto my-2 max-w-4xl text-center">
            <div className="mx-2 grid gap-2">
                <h1 className="text-lg font-bold">Schedule</h1>
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
