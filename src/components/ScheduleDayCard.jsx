import {
    DAY_STRING_MAP,
    MONTH_STRING_MAP,
    SHIFT_ORDER_MAP,
    SHIFT_STRING_MAP,
    isDateToday,
} from '../utils/schedUtils'
import { getRosterEntry, useRoster } from '../hooks/useRoster'
import { Link } from 'react-router-dom'

function LetterBlock({ team_number, team_letter, first_name, last_name }) {
    return (
        <div className="mx-2">
            <span className="text-right uppercase text-gray-400">
                {team_number || '\u00A0'}
                {team_letter} |
            </span>
            <span className="mx-2">
                <span className="font-semibold">{first_name}</span> {last_name}
            </span>
        </div>
    )
}

function ShiftBlock({ shift, shiftInfo, mainTeam }) {
    const { roster } = useRoster()
    return (
        <div className="m-4">
            {/* <div className="mx-2 my-1 rounded-md border bg-gray-200 px-2 py-0.5"> */}
            <div className="mx-2 my-1 border-b px-2 py-0.5">
                <span>{SHIFT_STRING_MAP[shift]}</span>
            </div>
            {Object.entries(shiftInfo).map(([team_number, teamInfo]) => {
                return (
                    <div key={team_number}>
                        {teamInfo.letter_list.split('').map((letter) => {
                            const rosterEntry = getRosterEntry(
                                roster,
                                team_number,
                                letter
                            )
                            return (
                                <LetterBlock
                                    key={letter}
                                    team_number={
                                        mainTeam !== team_number
                                            ? team_number
                                            : ''
                                    }
                                    team_letter={letter}
                                    first_name={rosterEntry.first_name}
                                    last_name={rosterEntry.last_name}
                                />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

function ScheduleDayCard({ date, dayInfo }) {
    // determine the 'main' team for this scheduled day by using the first shift
    let mainShift = 'unknown'
    for (let i of SHIFT_ORDER_MAP) {
        if (dayInfo[i]) {
            mainShift = dayInfo[i]
            break
        }
    }

    // bit of a hack; this assumes only one team (main team) will be scheduled for first shift normally
    const mainTeam = Object.keys(mainShift)[0]

    function dateDisplay() {
        const dayStr = DAY_STRING_MAP[date.getDay()]
        const monthStr = MONTH_STRING_MAP[date.getMonth()]
        const dayNum = date.getDate()
        const isToday = isDateToday(date)
        if (isToday) {
            return (
                <div className="rounded border border-green-700 bg-green-700  px-4 text-sm font-bold uppercase text-white">
                    Today
                </div>
            )
        } else {
            return (
                <div className="uppercase">
                    <span className="font-bold">{dayStr}</span>
                    <span className="px-2 text-gray-300 ">|</span>
                    <span>
                        {monthStr} {dayNum}
                    </span>
                </div>
            )
        }
    }

    return (
        <div className="rounded-lg border bg-white px-4 py-2 text-left shadow">
            <div className="flex flex-row items-center ">
                {dateDisplay()}
                <div className="flex-1" />
                <Link to={'/members/roster'} state={{ expandTeam: mainTeam }}>
                    <div className="font-bold uppercase ">Team {mainTeam}</div>
                </Link>
            </div>
            <div>
                {SHIFT_ORDER_MAP.map((shift) => {
                    if (dayInfo[shift] || false) {
                        return (
                            <ShiftBlock
                                key={shift}
                                shift={shift}
                                shiftInfo={dayInfo[shift]}
                                mainTeam={mainTeam}
                            />
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default ScheduleDayCard
