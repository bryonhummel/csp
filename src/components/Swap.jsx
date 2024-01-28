import React, { useState, useEffect } from 'react';

function SwapEdit({toggleEditMode}) {
    return(
        <div onClick={toggleEditMode}>swap edit</div>
    )
}

function PatrollerName({teamNumber, teamLetter, firstName, lastName, isFrom}) {
    const fromToStr = isFrom ? 'From' : 'To'
    return(
        <div className=''>
            <div className='border rounded-lg flex flex-row items-center'>
                <div className='min-w-12 bg-gray-200 rotate-90'>
                    <div className=''>{fromToStr}</div>
                </div>
                <div className='flex-1 flex items-center'>
                    <div className='border-r p-1'>{teamNumber}{teamLetter}</div>
                    <div className='flex-1 px-4'>
                        <span>{firstName}<br/>{lastName}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SwapView({toggleEditMode}) {
    return(
        <div onClick={toggleEditMode}>
            <div className='flex flex-row items-center m-4'>
                <div>
                    <span>Fri</span>
                    <span className='px-2 text-gray-300 '>|</span>
                    <span>Feb 10</span>
                </div>
                <div className='flex-1' />
                <div className='rounded-lg bg-gray-50 border font-bold px-4 py-1 shadow-sm'>Team 2</div>
            </div>
            <div>18:30 - Close</div>
            <div className='flex flex-wrap items-center m-4 justify-center gap-4'>
                <PatrollerName teamNumber="2" teamLetter="F" firstName="Bryon" lastName="Hummel" isFrom={true} />
                <PatrollerName teamNumber="2" teamLetter="F" firstName="Some" lastName="other" />
            </div>
        </div>
    )
}


function Swap() {
    const [isEditMode, setIsEditMode] = useState(false)

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode === true)
    }
    return(
        <div className='border bg-white rounded-2xl'>
            { isEditMode && <SwapEdit toggleEditMode={toggleEditMode} /> }
            { !isEditMode && <SwapView toggleEditMode={toggleEditMode} /> }
        </div>
    )
}

export default Swap;