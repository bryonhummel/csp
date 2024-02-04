import React from 'react'
import { useState } from 'react'
import ScheduleDayCard from '../components/ScheduleDayCard'
import { useSchedule } from '../hooks/useSchedule'

function Schedule() {
    const { schedule } = useSchedule()
    const [displayDate, setDisplayDate] = useState('2024-02-04')

    const dayInfo = schedule[displayDate] || null

    return (
        <div className=" mx-auto my-2 max-w-4xl text-center">
            <div className="mx-2 grid gap-2">
                <h1 className="text-lg font-bold">Schedule</h1>
                {dayInfo && (
                    <ScheduleDayCard date={displayDate} dayInfo={dayInfo} />
                )}
            </div>
        </div>
    )
}

export default Schedule
