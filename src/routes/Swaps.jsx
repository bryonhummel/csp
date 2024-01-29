import React from "react"
import Swap from "../components/Swap"


var swapList = [
{
    fromPatroller: {
        firstName: "Bryon",
        lastName: "Hummel",
        team: "4",
        letter: "b"
    },
    toPatroller: {
        firstName: "Mike",
        lastName: "Sutherland",
        team: "4",
        letter: "a"
    },
    shiftInfo: {
        date: new Date,
        team: 4,
        hours: "18:30 - Close",
    }
},
{
    fromPatroller: {
        firstName: "Brigitte",
        lastName: "DeJong",
        team: "4",
        letter: "h"
    },
    toPatroller: {
        firstName: "Bryon",
        lastName: "Hummel",
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
        firstName: "Bryon",
        lastName: "Hummel",
        team: "4",
        letter: "b"
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
        <h3>Swap Log</h3>
        <div className="grid gap-2 md:grid-cols-2">
            <Swap swapInfo={swapList[0]} />
            <Swap swapInfo={swapList[1]} />
            <Swap swapInfo={swapList[2]} />
        </div>
        </div>
    )
}

export default Swaps;