import React from "react"
import Swap from "../components/Swap"


var swapList = [
{
    fromPatroller: {
        firstName: "Jane",
        lastName: "Doe",
        team: "4",
        letter: "a"
    },
    toPatroller: {
        firstName: "Brandon",
        lastName: "Flowers",
        team: "4",
        letter: "b"
    },
    shiftInfo: {
        date: new Date,
        team: 4,
        hours: "18:30 - Close",
    }
},
{
    fromPatroller: {
        firstName: "John",
        lastName: "Smith",
        team: "4",
        letter: "h"
    },
    toPatroller: {
        firstName: "Brandon",
        lastName: "Flowers",
        team: "4",
        letter: "b"
    },
    shiftInfo: {
        date: new Date(Date.parse("2024-01-28T00:00:00")),
        team: 4,
        hours: "18:30 - Close",
    }
},
{
    fromPatroller: {
        firstName: "John",
        lastName: "Smith",
        team: "4",
        letter: "h"
    },
    shiftInfo: {
        date: new Date(Date.parse("2024-02-04T00:00:00")),
        team: 4,
        hours: "18:30 - Close",
    }
}
]

function Swaps() {
    return (
        <div className="m-2 text-center">
        <div className="grid gap-2 md:grid-cols-2">
            <Swap swapInfo={swapList[0]} />
            <Swap swapInfo={swapList[1]} />
            <Swap swapInfo={swapList[2]} />
        </div>
        </div>
    )
}

export default Swaps;