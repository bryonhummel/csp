import { createClient } from '@supabase/supabase-js'

const projectURL = import.meta.env.VITE_SUPABASE_PROJECT_URL
const projectKey = import.meta.env.VITE_SUPABASE_PROJECT_ANON_KEY

export const supabase = createClient(projectURL, projectKey)

const tableName_teams = 'teams'

// returns a list of team IDs to prove we can access the db
export async function fetchTeams() {
    const { data, error } = await supabase
        .from(tableName_teams)
        .select('team_id')

    if (error) {
        console.error('Error fetching data:', error)
        return []
    }

    return data.map((item) => item.team_id)
}

// return a data structure containing all the 'static' information (roster/team structure)
export async function getRosterInformation() {}
