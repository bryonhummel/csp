import React from 'react'
import TeamCard from '../components/TeamCard'
import { useRoster } from '../hooks/useRoster'

const teamPrintOrder = ['1', '2', '3', '4', '5', '6', 'exec', '0']
const teamToDayMap = {
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'weekday',
    exec: '-',
    0: 'unassigned',
}

function Roster() {
    const { roster } = useRoster()
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
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Roster
