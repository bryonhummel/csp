import React, { useEffect } from 'react'
import { useRoster } from '../hooks/useRoster'
import { useSchedule } from '../hooks/useSchedule'
import { useState } from 'react'
import RosterPatrollerSelector from '../components/RosterPatrollerSelector'
import ShiftPatrollerSelector from '../components/ShiftPatrollerSelector'
import ShiftSelector from '../components/ShiftSelector'
import { upsertSwap, deleteSwap } from '../supabase/client'
import { useNavigate } from 'react-router-dom'

function SwapForm({
    defaultDate = '',
    defaultShift = null,
    from_team,
    from_letter,
}) {
    //const { schedule, swaps } = useSchedule()
    const [datePickerValue, setDatePickerValue] = useState(defaultDate)
    const [shiftPickerValue, setShiftPickerValue] = useState(defaultShift)
    const [fromLetterPickerValue, setFromLetterPickerValue] = useState(null)
    const [toLetterPickerValue, setToLetterPickerValue] = useState(null)

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const { setRefreshSwapData } = useSchedule()

    console.log(
        `${datePickerValue} ${shiftPickerValue} ${fromLetterPickerValue} ${toLetterPickerValue}`
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

                    navigate('/members/swaps')
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

                    navigate('/members/swaps')
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
                        onChange={(e) => setDatePickerValue(e.target.value)}
                    />
                </label>
                {datePickerValue && (
                    <ShiftSelector
                        label="Shift:"
                        date={datePickerValue}
                        onChange={setShiftPickerValue}
                    />
                )}
                {datePickerValue && shiftPickerValue && (
                    <ShiftPatrollerSelector
                        label="From:"
                        onChange={setFromLetterPickerValue}
                        date={datePickerValue}
                        shift={shiftPickerValue}
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
                    Delete
                </button>
            </form>
            {errorMsg}
        </div>
    )
}

function CreateEditSwap() {
    const { roster } = useRoster()

    return (
        <div className=" mx-auto my-2 max-w-4xl text-center">
            <div className="mx-2 grid gap-2">
                <h1 className="mb-4 text-lg font-bold">Shift Swap</h1>
                {/* <SwapForm defaultDate={'2024-02-11'} /> */}
                <SwapForm />
            </div>
        </div>
    )
}

export default CreateEditSwap
