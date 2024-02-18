import {
    DAY_STRING_MAP,
    MONTH_STRING_MAP,
    SHIFT_ORDER_MAP,
    SHIFT_STRING_MAP,
    isDateToday,
    getISOStringLocalTZ,
} from '../utils/schedUtils'
import { getRosterEntry, useRoster } from '../hooks/useRoster'
import { Link, useLocation } from 'react-router-dom'
import { getSwapIfExist, useSchedule } from '../hooks/useSchedule'

const SWAP_GLYPH = '⇄'

function LetterBlock({
    team_number,
    team_letter,
    first_name,
    last_name,
    swap,
}) {
    return (
        <div className="mx-2">
            <span className="text-right uppercase text-gray-400">
                {team_number || '\u00A0'}
                {team_letter} |
            </span>
            <span className="ml-2">
                <span className="font-semibold">{first_name}</span> {last_name}{' '}
            </span>
            <span className="">{swap && SWAP_GLYPH}</span>
        </div>
    )
}

function SwapButton({ date, shift }) {
    return (
        <Link
            to={'/members/swap'}
            state={{ selectedDate: date, selectedShift: shift }}
        >
            <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-xl text-red-600 active:bg-gray-100">
                {SWAP_GLYPH}
            </span>
        </Link>
    )
}

function ShiftBlock({ shift, shiftInfo, mainTeam, date }) {
    const { roster } = useRoster()
    const { swaps } = useSchedule()
    return (
        <div className="m-4">
            <div className="my-1 ml-2 flex items-center border-b px-2 pb-2 pt-1.5">
                <span className="flex-1">{SHIFT_STRING_MAP[shift]}</span>
                <SwapButton date={date} shift={shift} />
            </div>
            {Object.entries(shiftInfo).map(([team_number, teamInfo]) => {
                return (
                    <div key={team_number}>
                        {teamInfo.letter_list.split('').map((letter) => {
                            const swapInfo = getSwapIfExist(
                                swaps,
                                date,
                                shift,
                                team_number,
                                letter
                            )
                            const swaped_team_number =
                                swapInfo?.to_team_number || team_number
                            const swaped_letter = swapInfo?.to_letter || letter
                            const rosterEntry = getRosterEntry(
                                roster,
                                swaped_team_number,
                                swaped_letter
                            )
                            return (
                                <LetterBlock
                                    key={letter}
                                    team_number={
                                        mainTeam !== swaped_team_number
                                            ? swaped_team_number
                                            : ''
                                    }
                                    team_letter={swaped_letter}
                                    first_name={rosterEntry.first_name}
                                    last_name={rosterEntry.last_name}
                                    swap={swapInfo?.to_letter != null}
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
                                date={getISOStringLocalTZ(date)}
                            />
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default ScheduleDayCard
