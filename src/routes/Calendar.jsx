import ScheduleMonthPicker from '../components/ScheduleMonthPicker'

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
    const activeSeasonYear = computeActiveSeasonYear()

    const MONTHS_TO_DISPLAY = [
        new Date(Date.parse(`${activeSeasonYear}-12-01T00:00:00`)),
        new Date(Date.parse(`${activeSeasonYear + 1}-01-01T00:00:00`)),
        new Date(Date.parse(`${activeSeasonYear + 1}-02-01T00:00:00`)),
        new Date(Date.parse(`${activeSeasonYear + 1}-03-01T00:00:00`)),
    ]

    return (
        <div>
            {MONTHS_TO_DISPLAY.map((date) => {
                return (
                    <ScheduleMonthPicker
                        key={date.getMonth()}
                        startDate={date}
                    />
                )
            })}
        </div>
    )
}

export default Calendar
