import {
    DAY_STRING_2CH_MAP,
    MONTH_STRING_FULL_MAP,
    MONTH_STRING_MAP,
    isDateToday,
} from '../utils/schedUtils'
import TwoToneCard from './TwoToneCard'

function ScheduleMonthPicker({ startDate }) {
    return (
        <div className="m-2 mt-6 text-center">
            <h1 className="m-2 text-lg font-bold">
                {MONTH_STRING_FULL_MAP[startDate.getMonth()]}{' '}
                {startDate.getFullYear()}
            </h1>
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
                bodyContent={'blah2'}
            />
        </div>
    )
}

export default ScheduleMonthPicker
