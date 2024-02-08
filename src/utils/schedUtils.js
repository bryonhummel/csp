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
    '8-3',
    '10-5',
    '12-6',
    '1-9',
    '2-9',
    '630-9',
]

// use a different string presentation for shift
export const SHIFT_STRING_MAP = {
    '8-1': '08:00 - 13:00',
    '8-3': '08:00 - 15:00',
    '10-5': '10:00 - 17:00',
    '12-6': '12:00 - 18:00',
    '1-9': '13:00 - 21:00',
    '2-9': '14:00 - 21:00',
    '630-9': '18:30 - 21:00',
}

export function isDateToday(date) {
    const today = new Date()
    return (
        date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()
    )
}
