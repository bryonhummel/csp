import React from 'react'
import TeamCard from '../components/TeamCard'
import { useRoster } from '../hooks/useRoster'
import { useLocation } from 'react-router-dom'

const teamPrintOrder = ['exec', '1', '2', '3', '4', '5', '6', '7']
const teamToDayMap = {
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'weekday',
    exec: '-',
    7: 'unassigned',
}

function Roster() {
    const { roster } = useRoster()
    let { state } = useLocation()
    return (
        <div className=" mx-auto my-2 max-w-4xl text-center">
            <div className="mx-2 grid gap-2">
                <h1 className="text-lg font-bold">Roster</h1>

                {teamPrintOrder.map((i) => {
                    if (!roster[i]) return null
                    return (
                        <TeamCard
                            key={i}
                            teamNumber={i}
                            teamDay={teamToDayMap[i]}
                            memberInfo={roster[i]}
                            expand={state && state.expandTeam == i}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Roster
