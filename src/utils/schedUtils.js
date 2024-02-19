export const DAY_STRING_MAP = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const DAY_STRING_2CH_MAP = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export const MONTH_STRING_MAP = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

export const MONTH_STRING_FULL_MAP = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

// TODO these should be configurations/tables in the database

// priority order of displaying shifts left to right
export const SHIFT_ORDER_MAP = [
    '8-1',
    '8-2',
    '8-3',
    '10-5',
    '10-6',
    '12-6',
    '1-9',
    '2-9',
    '630-9',
]

// use a different string presentation for shift
export const SHIFT_STRING_MAP = {
    '8-1': '08:00 - 13:00',
    '8-2': '08:00 - 14:00',
    '8-3': '08:00 - 15:00',
    '10-5': '10:00 - 17:00',
    '10-6': '10:00 - 18:00',
    '12-6': '12:00 - 18:00',
    '1-9': '13:00 - 21:00',
    '2-9': '14:00 - 21:00',
    '630-9': '18:30 - 21:00',
}

export const TEAM_PRINT_ORDER = ['1', '2', '3', '4', '5', '6', 'exec', '7']
// hack - don't show pseudo-exec team in swap list - they appear in other real teams (7 if unassigned)
export const SWAPABLE_TEAM_PRINT_ORDER = ['1', '2', '3', '4', '5', '6', '7']

export const MEMBER_PRINT_ORDER = [
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

export function isDateToday(date) {
    const today = new Date()
    return (
        date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()
    )
}

// toISOString() on date doesn't take into account timezone offset... so after a certain time the date jumps
// ahead of what it is in local timezone.
export function getISOStringLocalTZ(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
