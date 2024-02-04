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

// priority order of displaying shifts left to right
export const SHIFT_ORDER_MAP = ['8-1', '10-5', '1-9', '630-9']

// use a different string presentation for shift
export const SHIFT_STRING_MAP = {
    //'8-1': '\u00A08:00 - 13:00',
    //'8-1': '8:00 - 13:00',
    '8-1': '08:00 - 13:00',
    '10-5': '10:00 - 17:00',
    '1-9': '13:00 - 21:00',
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
