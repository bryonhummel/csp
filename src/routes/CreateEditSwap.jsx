import React, { useEffect } from 'react'
import { useRoster } from '../hooks/useRoster'
import { useSchedule, getSwapIfExist } from '../hooks/useSchedule'
import { useState } from 'react'
import RosterPatrollerSelector from '../components/RosterPatrollerSelector'
import ShiftPatrollerSelector from '../components/ShiftPatrollerSelector'
import ShiftSelector from '../components/ShiftSelector'
import { upsertSwap, deleteSwap } from '../supabase/client'
import { useNavigate, useLocation } from 'react-router-dom'

function getShiftOptions(schedule, date) {
    const scheduledShifts = schedule?.[date] || {}
    return Object.keys(scheduledShifts)
}

// From:
function getFromPatrollerOptions(schedule, date, shift) {
    // TODO ... should prune out invalid options from the from list
    let scheduledShifts = schedule?.[date] || {}
    return scheduledShifts?.[shift] || {}
}

// To:
function getToPatrollerOptions(roster) {
    // TODO ... should prune out invalid options from the to list
    return roster
}

function SwapForm({
    defaultDate = '',
    defaultShift = null,
    defaultFromTeamAndLetter = null,
}) {
    const { schedule, swaps } = useSchedule()
    const { roster } = useRoster()
    const [datePickerValue, setDatePickerValue] = useState(defaultDate)
    const [shiftPickerValue, setShiftPickerValue] = useState(defaultShift)
    const [fromLetterPickerValue, setFromLetterPickerValue] = useState(
        defaultFromTeamAndLetter
    )
    const [toLetterPickerValue, setToLetterPickerValue] = useState(null)

    const [shiftPickerOptions, setShiftPickerOptions] = useState([])

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const { setRefreshSwapData } = useSchedule()

    useEffect(() => {
        const options = getShiftOptions(schedule, datePickerValue)
        setShiftPickerValue(defaultShift)
        setShiftPickerOptions(options)
    }, [datePickerValue, schedule])

    useEffect(() => {
        if (datePickerValue && shiftPickerValue && fromLetterPickerValue) {
            const [team, letter] = fromLetterPickerValue.split('')
            const swap = getSwapIfExist(
                swaps,
                datePickerValue,
                shiftPickerValue,
                team,
                letter
            )

            if (swap?.to_letter && swap?.to_team_number) {
                setToLetterPickerValue(
                    `${swap.to_team_number}${swap.to_letter}`
                )
            } else {
                setToLetterPickerValue(null)
            }
        }
    }, [datePickerValue, shiftPickerValue, fromLetterPickerValue, swaps])

    console.log(
        `Swap Form State: ${datePickerValue} ${shiftPickerValue} ${fromLetterPickerValue} ${toLetterPickerValue}`
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('handleSubmit: ', e)
        try {
            setErrorMsg('')
            setLoading(true)

            // TODO form value validation with error messages
            if (
                !datePickerValue ||
                !shiftPickerValue ||
                !fromLetterPickerValue
            ) {
                setErrorMsg('Please fill in all required fields')
                return
            }

            const [from_number, from_letter] = fromLetterPickerValue.split('')
            const [to_number, to_letter] = toLetterPickerValue
                ? toLetterPickerValue.split('')
                : [null, null]

            await upsertSwap(
                datePickerValue,
                shiftPickerValue,
                from_number,
                from_letter,
                to_number,
                to_letter
            )
                .then(() => {
                    // force a refresh of swap data so we recompute everything
                    setRefreshSwapData(new Date())

                    navigate(-1)
                })
                .catch((e) => {
                    console.log('Swap Submit Error', e)
                    setErrorMsg(e.message)
                })
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        console.log('handleDelete: ', e)
        try {
            setErrorMsg('')
            setLoading(true)

            // TODO form value validation with error messages
            if (
                !datePickerValue ||
                !shiftPickerValue ||
                !fromLetterPickerValue
            ) {
                setErrorMsg('Please fill in all required fields')
                return
            }

            const [from_number, from_letter] = fromLetterPickerValue.split('')
            const [to_number, to_letter] = toLetterPickerValue
                ? toLetterPickerValue.split('')
                : [null, null]

            await deleteSwap(
                datePickerValue,
                shiftPickerValue,
                from_number,
                from_letter
            )
                .then(() => {
                    // force a refresh of swap data so we recompute everything
                    setRefreshSwapData(new Date())

                    navigate(-1)
                })
                .catch((e) => {
                    console.log('Swap Delete Error', e)
                    setErrorMsg(e.message)
                })
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <div className="rounded-lg border bg-white p-4 shadow">
            <form className="" onSubmit={handleSubmit}>
                <table className="mx-auto mb-8 border-separate border-spacing-4 text-left">
                    <tbody>
                        <tr className="">
                            <td className="text-right">
                                <label>Date:</label>
                            </td>
                            <td className="block ">
                                <input
                                    disabled={defaultDate}
                                    type="date"
                                    value={datePickerValue}
                                    onChange={(e) => {
                                        setShiftPickerValue(null)
                                        setFromLetterPickerValue(null)
                                        setDatePickerValue(e.target.value)
                                    }}
                                />
                            </td>
                        </tr>
                        {datePickerValue && (
                            <tr>
                                <td className="text-right">
                                    <label>Shift:</label>
                                </td>

                                <td>
                                    <ShiftSelector
                                        onChange={(e) => {
                                            setFromLetterPickerValue(null)
                                            setShiftPickerValue(e)
                                        }}
                                        disabled={defaultShift}
                                        selectedValue={shiftPickerValue}
                                        shiftOptions={shiftPickerOptions}
                                    />
                                </td>
                            </tr>
                        )}
                        {datePickerValue && shiftPickerValue && (
                            <tr>
                                <td className="text-right">
                                    <label>From:</label>
                                </td>
                                <td>
                                    <ShiftPatrollerSelector
                                        onChange={setFromLetterPickerValue}
                                        date={datePickerValue}
                                        selectedValue={fromLetterPickerValue}
                                        patrollerOptions={getFromPatrollerOptions(
                                            schedule,
                                            datePickerValue,
                                            shiftPickerValue
                                        )}
                                        disabled={defaultFromTeamAndLetter}
                                    />
                                </td>
                            </tr>
                        )}
                        {datePickerValue && shiftPickerValue && (
                            <tr>
                                <td className="text-right">
                                    <label>To:</label>
                                </td>
                                <td>
                                    <RosterPatrollerSelector
                                        onChange={setToLetterPickerValue}
                                        patrollerOptions={getToPatrollerOptions(
                                            roster
                                        )}
                                        selectedValue={toLetterPickerValue}
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <span className="validity"></span>
                <div className="flex gap-2">
                    <button
                        value="Cancel"
                        onClick={(e) => {
                            e.preventDefault()
                            navigate(-1)
                        }}
                        className="flex-1 rounded border border-red-600 px-2 py-1 text-red-600 hover:cursor-pointer active:bg-red-700 active:text-white"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        value="Submit"
                        className="flex-1 rounded border-red-600 bg-red-600 px-2 py-1 text-white hover:cursor-pointer active:bg-red-700"
                    >
                        Submit
                    </button>
                </div>
                {
                    /* only show this delete button when selected specifically from swaps list (all fields set) */
                    defaultDate != '' &&
                        defaultShift &&
                        defaultFromTeamAndLetter && (
                            <div className="mt-4">
                                <button
                                    onClick={handleDelete}
                                    value="Delete"
                                    className="w-full rounded bg-red-600 px-2 py-1 text-white hover:cursor-pointer active:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        )
                }
            </form>
            {errorMsg}
        </div>
    )
}

function CreateEditSwap() {
    const { state } = useLocation()

    return (
        <div className=" mx-auto my-2 max-w-4xl text-center">
            <div className="mx-2 grid gap-2">
                <h1 className="mb-4 text-lg font-bold">Shift Swap</h1>
                <SwapForm
                    defaultDate={state?.selectedDate || ''}
                    defaultShift={state?.selectedShift || null}
                    defaultFromTeamAndLetter={
                        state?.selectedTeamAndLetter || null
                    }
                />
            </div>
        </div>
    )
}

export default CreateEditSwap
