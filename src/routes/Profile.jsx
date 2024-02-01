import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Profile() {
    const { user, logout } = useAuth()

    return (
        <div>
            <h1>Hello {user.email}</h1>

            <Link to={'/swaps'}>Swaps</Link>
            <Link onClick={logout}>Logout</Link>
        </div>
    )
}

export default Profile
