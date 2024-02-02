import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function PlaceholderNavLink({ path, logout }) {
    if (path === 'logout') {
        return (
            <Link onClick={logout}>
                <div className="m-2 cursor-pointer rounded-lg bg-red-600 p-2 text-white active:bg-red-400">
                    Logout
                </div>
            </Link>
        )
    } else {
        return (
            <Link className="uppercase" to={'/' + path}>
                <div className="m-2 cursor-pointer rounded-lg bg-red-600 p-2 text-white  active:bg-red-400">
                    {path}
                </div>
            </Link>
        )
    }
}

function Profile() {
    const { user, logout } = useAuth()

    return (
        <div>
            <h1>Hello {user.email}</h1>

            <PlaceholderNavLink path="roster" />
            <PlaceholderNavLink path="swaps" />
            <PlaceholderNavLink path="logout" logout={logout} />
        </div>
    )
}

export default Profile
