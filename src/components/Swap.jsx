import React, { useState, useEffect } from 'react'

function PatrollerNameBadge({ patroller, isFrom }) {
    const fromToStr = isFrom ? 'From' : 'To'
    return (
        <div className="flex-1 rounded-lg shadow">
            <div className="rounded-t-lg bg-gray-200">
                <div className="uppercase text-gray-500">{fromToStr}</div>
            </div>
            <div className="flex flex-row items-center rounded-b-lg border">
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
        </div>
    )
}

function PatrollerSwap() {
    return (
        <div className="flex-1 rounded-lg shadow">
            <div className="rounded-t-lg bg-yellow-400">
                <div className="uppercase text-yellow-600">to</div>
            </div>
            <div className="flex flex-row items-center rounded-b-lg border border-yellow-300">
                <div className="flex flex-1 items-center bg-yellow-300">
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

const dayString = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthString = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

function isDateToday(date) {
    const today = new Date()
    return (
        date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()
    )
}

function SwapView({ info }) {
    const dayOfWeek = dayString[info.shiftInfo.date.getDay()]
    const month = monthString[info.shiftInfo.date.getMonth()]
    const date = info.shiftInfo.date.getDate()

    const isToday = isDateToday(info.shiftInfo.date)

    function dateDisplay() {
        if (isToday) {
            return (
                <div className="rounded border border-green-700 bg-green-700  px-4 text-sm font-bold uppercase text-white">
                    Today
                </div>
            )
        } else {
            return (
                <div className="uppercase">
                    <span className="font-bold">{dayOfWeek}</span>
                    <span className="px-2 text-gray-300 ">|</span>
                    <span>
                        {month} {date}
                    </span>
                </div>
            )
        }
    }

    return (
        <div>
            <div className="m-4 flex flex-row items-center">
                {dateDisplay()}
                <div className="flex-1" />
                <div className="font-bold uppercase ">
                    Team {info.shiftInfo.team}
                </div>
            </div>
            <div>{info.shiftInfo.hours}</div>
            <div className="m-4 flex flex-wrap items-center justify-center gap-4">
                <PatrollerNameBadge
                    patroller={info.fromPatroller}
                    isFrom={true}
                />
                {info.toPatroller && (
                    <PatrollerNameBadge
                        patroller={info.toPatroller}
                        isFrom={false}
                    />
                )}
                {!info.toPatroller && <PatrollerSwap />}
            </div>
        </div>
    )
}

function Swap({ swapInfo }) {
    return (
        <div className="rounded-2xl border bg-white">
            <SwapView info={swapInfo} />
        </div>
    )
}

export default Swap