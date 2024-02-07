import { useState } from 'react'

function SmsIcon() {
    return (
        <svg
            width="24px"
            height="24px"
            strokeWidth="1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7 12L17 12"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                d="M7 8L13 8"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                d="M3 20.2895V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15C21 16.1046 20.1046 17 19 17H7.96125C7.35368 17 6.77906 17.2762 6.39951 17.7506L4.06852 20.6643C3.71421 21.1072 3 20.8567 3 20.2895Z"
                strokeWidth="1"
            ></path>
        </svg>
    )
}

function SmsButton({ sms }) {
    if (sms) {
        return (
            <a
                href={'sms: ' + sms}
                className="mr-4 flex items-center rounded-lg border border-red-600 stroke-red-600 text-center font-bold uppercase text-red-600 active:bg-red-600 active:stroke-white active:text-white"
            >
                <span className="flex-1 p-1">
                    <SmsIcon />
                </span>
            </a>
        )
    } else {
        return (
            <span className="mr-4 flex items-center rounded-lg border border-gray-600 stroke-gray-600 text-center font-bold uppercase text-gray-600 ">
                <span className="flex-1 p-1">
                    <SmsIcon />
                </span>
            </span>
        )
    }
}

function MailIcon() {
    return (
        <svg
            width="24px"
            height="24px"
            strokeWidth="1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7 9L12 12.5L17 9"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                d="M2 17V7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z"
                strokeWidth="1"
            ></path>
        </svg>
    )
}

function MailButton({ email }) {
    if (email) {
        return (
            <a
                href={'mailto: ' + email}
                className="mr-4 flex items-center rounded-lg border border-red-600 stroke-red-600 text-center font-bold uppercase text-red-600 active:bg-red-600 active:stroke-white active:text-white"
            >
                <span className="flex-1 p-1">
                    <MailIcon />
                </span>
            </a>
        )
    } else {
        return (
            <span className="mr-4 flex items-center rounded-lg border border-gray-600 stroke-gray-600 text-center font-bold uppercase text-gray-600 ">
                <span className="flex-1 p-1">
                    <MailIcon />
                </span>
            </span>
        )
    }
}

// https://iconoir.com/
function MemberInfo({ info, letter }) {
    return (
        <li className="flex items-center py-3">
            <div className="mr-4 flex h-10 w-10 items-center rounded-lg border bg-gray-200 text-center font-bold uppercase text-gray-800">
                <span className="flex-1">{letter}</span>
            </div>
            <div className="flex-1">
                <div>
                    {info.first_name} {info.last_name}
                </div>
                <div className="text-gray-400">{info.csp_id}</div>
            </div>
            <MailButton email={info.email} />
            <SmsButton sms={info.cell} />
        </li>
    )
}

const memberPrintOrder = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    's', // spare
    'pl', // used in exec printing only - Patrol Leader
    'apl', // used in exec printing only - Assistant Patrol Leader
]

let isObject = function (a) {
    return !!a && a.constructor === Object
}

let isArray = function (a) {
    return !!a && a.constructor === Array
}

function TeamCard({ teamNumber, teamDay, memberInfo, expand = false }) {
    const [expanded, setExpanded] = useState(expand)

    // override the display of some of the special teams
    if (teamNumber == 'exec') {
        teamNumber = '-'
        teamDay = 'Executive'
    } else if (teamNumber == '0') {
        teamNumber = '-'
        teamDay = 'Unassigned'
    }

    const toggle = () => {
        setExpanded(!expanded)
    }

    return (
        <div className="rounded-lg border bg-white px-4 text-left shadow">
            <div
                className="my-4 grid cursor-pointer grid-cols-2"
                onClick={toggle}
            >
                <span className="text-right font-bold">Team {teamNumber}</span>
                <span>
                    <span className="mx-1 text-gray-200">|</span>
                    <span className="capitalize">{teamDay}</span>
                </span>
            </div>
            {expanded && (
                <ul className="divide-y">
                    {isObject(memberInfo) &&
                        memberPrintOrder.map((letter) => {
                            if (!memberInfo[letter]) return null
                            return (
                                <MemberInfo
                                    key={memberInfo[letter].csp_id}
                                    info={memberInfo[letter]}
                                    letter={letter}
                                />
                            )
                        })}

                    {
                        // TODO this would be a lot simpler if we just assigned letters to daytime like the rest
                        isArray(memberInfo) &&
                            memberInfo.map((member, idx) => {
                                return (
                                    <MemberInfo
                                        key={member.csp_id}
                                        info={member}
                                        letter={idx + 1}
                                    />
                                )
                            })
                    }
                </ul>
            )}
        </div>
    )
}

export default TeamCard
