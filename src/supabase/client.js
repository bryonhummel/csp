import { createClient } from '@supabase/supabase-js'
import { SHIFT_ORDER_MAP } from '../utils/schedUtils'

const projectURL = import.meta.env.VITE_SUPABASE_PROJECT_URL
const projectKey = import.meta.env.VITE_SUPABASE_PROJECT_ANON_KEY

export const supabase = createClient(projectURL, projectKey)

export async function fetchFullSchedule() {
    console.log('supabase.client fetchFullSchedule')
    const { data, error } = await supabase.from('schedule').select('*')

    if (error) {
        console.error('Error fetching schedule: ', error)
        return []
    }

    return data
}

export async function fetchSwaps() {
    console.log('supabase.client fetchSwaps')
    const { data, error } = await supabase
        .from('swaps')
        .select('*')
        .order('date', { ascending: true })

    if (error) {
        console.error('Error fetching swaps: ', error)
        return []
    }

    return data
}

export async function upsertSwap(
    date,
    shift,
    team_number,
    letter,
    to_team_number,
    to_letter
) {
    console.log('supabase.client upsertSwap')

    if (!SHIFT_ORDER_MAP.includes(shift)) {
        throw new Error('invalid upsertSwap shift value')
    }

    // TODO more input validation

    const upsertData = {
        date: date,
        shift: shift,
        from_team: team_number,
        from_letter: letter,
        to_team: to_team_number,
        to_letter: to_letter,
    }
    console.log('upsertSwap:', upsertData)
    const { error } = await supabase.from('swaps').upsert(upsertData)
    if (error) {
        throw error
    }
}

export async function deleteSwap(date, shift, team_number, letter) {
    console.log('supabase.client deleteSwap')

    if (!SHIFT_ORDER_MAP.includes(shift)) {
        throw new Error('invalid deleteSwap shift value')
    }

    // TODO more input validation

    const deleteData = {
        date: date,
        shift: shift,
        from_team: team_number,
        from_letter: letter,
    }
    console.log('deleteSwap:', deleteData)
    const { error } = await supabase
        .from('swaps')
        .delete()
        .eq('date', date)
        .eq('shift', shift)
        .eq('from_team', team_number)
        .eq('from_letter', letter)
    if (error) {
        throw error
    }
}

export async function fetchRoster() {
    console.log('supabase.client fetchRoster')
    const { data, error } = await supabase.from('roster').select('*')

    if (error) {
        console.error('Error fetching roster: ', error)
        return []
    }

    return data
}
