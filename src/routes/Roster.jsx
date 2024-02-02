import React from 'react'
import TeamCard from '../components/TeamCard'

var mockMemerList = [
    {
        firstName: 'Brian',
        lastName: 'Smith',
        cspid: '12345678901',
        letter: 'a',
        email: 'something@gmail.com',
        cell: '555-555-5555',
    },
    {
        firstName: 'Alexi',
        lastName: 'Murdoch',
        cspid: '12345678901',
        letter: 'b',
        email: 'something@gmail.com',
        cell: '555-555-5555',
    },
    {
        firstName: 'Brandon',
        lastName: 'Flowers',
        cspid: '12345678901',
        letter: 'c',
        email: 'something@gmail.com',
    },
    {
        firstName: 'Tim',
        lastName: 'Chalamet',
        cspid: '12345678901',
        letter: 'd',
        cell: '555-555-5555',
    },
    {
        firstName: 'Andy',
        lastName: 'Black',
        cspid: '12345678901',
        letter: 'e',
        email: 'something@gmail.com',
    },
    {
        firstName: 'Bon',
        lastName: 'Iver',
        cspid: '12345678901',
        letter: 'f',
        email: 'something@gmail.com',
        cell: '555-555-5555',
    },
    {
        firstName: 'Dave',
        lastName: 'Matthews',
        cspid: '12345678901',
        letter: 'g',
        email: 'something@gmail.com',
        cell: '555-555-5555',
    },
    {
        firstName: 'Sam',
        lastName: 'Feldt',
        cspid: '12345678901',
        letter: 'h',
        email: 'something@gmail.com',
        cell: '555-555-5555',
    },
    {
        firstName: 'Vance',
        lastName: 'Joy',
        cspid: '12345678901',
        letter: 'i',
        email: 'something@gmail.com',
        cell: '555-555-5555',
    },
]

var teamList = [
    {
        teamNumber: '1',
        teamDay: 'monday',
        memberInfo: mockMemerList,
    },
    {
        teamNumber: '2',
        teamDay: 'tuesday',
        memberInfo: mockMemerList,
    },
    {
        teamNumber: '3',
        teamDay: 'wednesday',
        memberInfo: mockMemerList,
    },
    {
        teamNumber: '4',
        teamDay: 'thursday',
        memberInfo: mockMemerList,
    },
    {
        teamNumber: '5',
        teamDay: 'friday',
        memberInfo: mockMemerList,
    },
    {
        teamNumber: '6',
        teamDay: 'weekday',
        memberInfo: mockMemerList,
    },
    {
        teamNumber: '-',
        teamDay: 'Executive',
        memberInfo: [
            {
                firstName: 'Brian',
                lastName: 'Smith',
                cspid: '12345678901',
                letter: 'PL',
                email: 'something@gmail.com',
                cell: '555-555-5555',
            },
            {
                firstName: 'Alexi',
                lastName: 'Murdoch',
                cspid: '12345678901',
                letter: 'APL',
            },
        ],
    },
]

function Roster() {
    return (
        <div className=" mx-auto my-2 max-w-4xl text-center">
            <div className="mx-2 grid gap-2">
                <h1 className="text-lg font-bold">Roster</h1>
                {teamList.map((i) => {
                    return (
                        <TeamCard
                            key={i.teamNumber}
                            teamNumber={i.teamNumber}
                            teamDay={i.teamDay}
                            memberInfo={i.memberInfo}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Roster
