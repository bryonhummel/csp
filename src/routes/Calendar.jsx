import ScheduleMonthPicker from '../components/ScheduleMonthPicker'
import { useSchedule } from '../hooks/useSchedule'

// Dec, Jan, Feb, Mar

// get our starting month (dec) year for this season
function computeActiveSeasonYear() {
    const today = new Date()
    const todayMonth = today.getMonth()
    // use june as our next season rollver
    if (todayMonth > 5 && todayMonth <= 11) {
        return today.getFullYear()
    } else {
        return today.getFullYear() - 1
    }
}

function Calendar() {
    const { myEvents } = useSchedule()
    const activeSeasonYear = computeActiveSeasonYear()

    const MONTHS_TO_DISPLAY = [
        new Date(Date.parse(`${activeSeasonYear}-12-01T00:00:00`)),
        new Date(Date.parse(`${activeSeasonYear + 1}-01-01T00:00:00`)),
        new Date(Date.parse(`${activeSeasonYear + 1}-02-01T00:00:00`)),
        new Date(Date.parse(`${activeSeasonYear + 1}-03-01T00:00:00`)),
    ]
    const today = new Date()
    const todayMonth = today.getMonth()

    return (
        <div className="mx-auto grid max-w-4xl gap-2 md:grid-cols-2">
            {MONTHS_TO_DISPLAY.map((date, idx) => {
                return (
                    <ScheduleMonthPicker
                        key={date.getMonth()}
                        startDate={date}
                        myEvents={myEvents}
                        autoFocus={todayMonth == date.getMonth()}
                    />
                )
            })}
        </div>
    )
}

export default Calendar
