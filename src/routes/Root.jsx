import { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import TopNav from '../components/TopNav'
import { useAuth } from '../hooks/useAuth'
import { fetchTeams } from '../supabase/client'

function Root() {
    const { user } = useAuth()
    const [teamList, setTeamList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTeams()
            setTeamList(data)
        }
        fetchData()
    }, [user])

    return (
        <div>
            <TopNav />
            <div className="mt-12 min-h-dvh pt-2">
                <Outlet />
                {!user && <Navigate to="/login" />}
            </div>
        </div>
    )
}

export default Root
