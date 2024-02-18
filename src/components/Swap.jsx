import React, { useState, useEffect } from 'react'
import TwoToneCard from './TwoToneCard'
import {
    MONTH_STRING_MAP,
    DAY_STRING_MAP,
    SHIFT_STRING_MAP,
    getISOStringLocalTZ,
} from '../utils/schedUtils'
import { Link } from 'react-router-dom'

function PatrollerNameBadge({ patroller, isFrom }) {
    const fromToStr = isFrom ? 'From' : 'To'

    return (
        <div className="flex-1 ">
            <TwoToneCard
                headerContent={
                    <div className="flex-1 rounded-t-lg capitalize text-gray-400">
                        {fromToStr}
                    </div>
                }
                bodyContent={
                    <div className="flex flex-row items-center rounded-lg border-2 border-gray-200">
                        <div className="flex flex-1 items-center justify-center">
                            <div className="border-r px-2 py-1 uppercase text-gray-500">
                                {patroller.team}
                                {patroller.letter}
                            </div>
                            <div className="px-2 py-1 text-left font-bold">
                                <span>
                                    {patroller.firstName}
                                    <br />
                                    {patroller.lastName}
                                </span>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    )
}

function PatrollerSwap() {
    return (
        <div className="rounded-lg border-2 border-red-600 bg-red-600 shadow">
            <div className="">
                <div className="capitalize text-white">to</div>
            </div>
            <div className="flex flex-row items-center rounded-lg border-red-600">
                <div className="flex flex-1 items-center rounded-md bg-white">
                    <div className="flex-1 px-4 py-1 font-bold">
                        <span className="">
                            Need
                            <br />
                            Swap
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function isDateToday(date) {
    const today = new Date()
    return (
        date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()
    )
}

function SwapView({ info }) {
    const dayOfWeek = DAY_STRING_MAP[info.shiftInfo.date.getDay()]
    const month = MONTH_STRING_MAP[info.shiftInfo.date.getMonth()]
    const date = info.shiftInfo.date.getDate()

    const isToday = isDateToday(info.shiftInfo.date)

    function dateDisplay() {
        if (isToday) {
            return (
                <Link
                    className="cursor-pointer"
                    to={'/members/schedule'}
                    state={{ selectedDate: info.shiftInfo.date }}
                >
                    <div className="rounded border border-green-700 bg-green-700  px-4 text-sm font-bold uppercase text-white">
                        Today
                    </div>
                </Link>
            )
        } else {
            return (
                <Link
                    className="cursor-pointer"
                    to={'/members/schedule'}
                    state={{ selectedDate: info.shiftInfo.date }}
                >
                    <div className="uppercase">
                        <span className="font-bold">{dayOfWeek}</span>
                        <span className="px-2 text-gray-300 ">|</span>
                        <span>
                            {month} {date}
                        </span>
                    </div>
                </Link>
            )
        }
    }

    return (
        <div>
            <div className="m-4 flex flex-row items-center">
                {dateDisplay()}
                <div className="flex-1" />
                <div className="font-bold uppercase ">
                    <Link
                        to={'/members/roster'}
                        state={{ expandTeam: info.shiftInfo.team }}
                    >
                        Team {info.shiftInfo.team}
                    </Link>
                </div>
            </div>
            <div>{SHIFT_STRING_MAP[info.shiftInfo.shift]}</div>
            <div className="m-4 flex flex-wrap items-center justify-center gap-4">
                <PatrollerNameBadge
                    patroller={info.fromPatroller}
                    isFrom={true}
                />
                {info.toPatroller && (
                    <Link
                        className="flex-1 border-gray-200" // something weird with CSS here - shouldn't need to set this but i do??
                        to={'/members/swap'}
                        state={{
                            selectedDate: getISOStringLocalTZ(
                                info.shiftInfo.date
                            ),
                            selectedShift: info.shiftInfo.shift,
                            selectedTeamAndLetter: `${info.fromPatroller.team}${info.fromPatroller.letter}`,
                        }}
                    >
                        <PatrollerNameBadge
                            patroller={info.toPatroller}
                            isFrom={false}
                        />
                    </Link>
                )}
                {!info.toPatroller && (
                    <Link
                        className="flex-1 "
                        to={'/members/swap'}
                        state={{
                            selectedDate: getISOStringLocalTZ(
                                info.shiftInfo.date
                            ),
                            selectedShift: info.shiftInfo.shift,
                            selectedTeamAndLetter: `${info.fromPatroller.team}${info.fromPatroller.letter}`,
                        }}
                    >
                        <PatrollerSwap />
                    </Link>
                )}
            </div>
        </div>
    )
}

function Swap({ swapInfo }) {
    return (
        <div className="rounded-2xl border bg-white shadow">
            <SwapView info={swapInfo} />
        </div>
    )
}

export default Swap
