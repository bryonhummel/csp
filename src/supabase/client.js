import { createClient } from '@supabase/supabase-js'

const projectURL = import.meta.env.VITE_SUPABASE_PROJECT_URL
const projectKey = import.meta.env.VITE_SUPABASE_PROJECT_ANON_KEY

export const supabase = createClient(projectURL, projectKey)

// returns a list of team IDs to prove we can access the db
export async function fetchTeams() {
    const { data, error } = await supabase.from('teams').select('team_id')

    if (error) {
        console.error('Error fetching data:', error)
        return []
    }

    return data.map((item) => item.team_id)
}

// return a data structure containing all the 'static' information (roster/team structure)
export async function getRosterInformation() {}

export async function fetchRoster() {
    console.log('supabase.client fetchRoster')
    const { data, error } = await supabase.from('roster').select('*')

    if (error) {
        console.error('Error fetching roster: ', error)
        return []
    }

    console.log('roster data:')
    console.log(data)

    return data
}
