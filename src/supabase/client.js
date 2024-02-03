import { createClient } from '@supabase/supabase-js'

const projectURL = import.meta.env.VITE_SUPABASE_PROJECT_URL
const projectKey = import.meta.env.VITE_SUPABASE_PROJECT_ANON_KEY

export const supabase = createClient(projectURL, projectKey)

export async function fetchRoster() {
    console.log('supabase.client fetchRoster')
    const { data, error } = await supabase.from('roster').select('*')

    if (error) {
        console.error('Error fetching roster: ', error)
        return []
    }

    return data
}
