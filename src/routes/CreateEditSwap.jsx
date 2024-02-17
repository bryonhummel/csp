import React, { useEffect } from 'react'
import { useRoster } from '../hooks/useRoster'
import { useSchedule } from '../hooks/useSchedule'
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
    let scheduledShifts = schedule?.[date] || {}
    return scheduledShifts?.[shift] || {}
}

function SwapForm({
    defaultDate = '',
    defaultShift = null,
    from_team,
    from_letter,
}) {
    const { schedule } = useSchedule()
    const [datePickerValue, setDatePickerValue] = useState(defaultDate)
    const [shiftPickerValue, setShiftPickerValue] = useState(defaultShift)
    const [fromLetterPickerValue, setFromLetterPickerValue] = useState(null)
    const [toLetterPickerValue, setToLetterPickerValue] = useState(null)

    const [shiftPickerOptions, setShiftPickerOptions] = useState([])

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const { setRefreshSwapData } = useSchedule()

    useEffect(() => {
        const options = getShiftOptions(schedule, datePickerValue)
        setShiftPickerValue(null)
        setShiftPickerOptions(options)
    }, [datePickerValue, schedule])

    console.log(
        `Swap Form State: ${datePickerValue} ${shiftPickerValue} ${fromLetterPickerValue} ${toLetterPickerValue}`
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
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
        <div>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <label>
                    Date:
                    <input
                        className="ml-2"
                        type="date"
                        value={datePickerValue}
                        onChange={(e) => {
                            setShiftPickerValue(null)
                            setFromLetterPickerValue(null)
                            setDatePickerValue(e.target.value)
                        }}
                    />
                </label>
                {datePickerValue && (
                    <ShiftSelector
                        label="Shift:"
                        onChange={(e) => {
                            setFromLetterPickerValue(null)
                            setShiftPickerValue(e)
                        }}
                        selectedValue={shiftPickerValue}
                        shiftOptions={shiftPickerOptions}
                    />
                )}
                {datePickerValue && shiftPickerValue && (
                    <ShiftPatrollerSelector
                        label="From:"
                        onChange={setFromLetterPickerValue}
                        date={datePickerValue}
                        selectedValue={fromLetterPickerValue}
                        patrollerOptions={getFromPatrollerOptions(
                            schedule,
                            datePickerValue,
                            shiftPickerValue
                        )}
                    />
                )}
                {datePickerValue && shiftPickerValue && (
                    <RosterPatrollerSelector
                        label="To:"
                        onChange={setToLetterPickerValue}
                    />
                )}
                <span className="validity"></span>
                <button
                    type="submit"
                    value="Submit"
                    className="rounded bg-red-600 px-2 py-1 text-white hover:cursor-pointer active:bg-red-700"
                >
                    Submit
                </button>
                <button
                    onClick={handleDelete}
                    value="Delete"
                    className="rounded bg-red-600 px-2 py-1 text-white hover:cursor-pointer active:bg-red-700"
                >
                    Delete [TODO:Placeholder]
                </button>
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
                />
            </div>
        </div>
    )
}

export default CreateEditSwap
