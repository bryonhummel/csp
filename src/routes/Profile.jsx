import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function PlaceholderNavLink({ path, text, logout }) {
    if (path === '/logout') {
        return (
            <Link onClick={logout}>
                <div className="m-2 cursor-pointer rounded-lg bg-red-600 p-2 text-white active:bg-red-400">
                    Logout
                </div>
            </Link>
        )
    } else {
        return (
            <Link className="capitalize" to={path}>
                <div className="m-2 cursor-pointer rounded-lg bg-red-600 p-2 text-white  active:bg-red-400">
                    {text}
                </div>
            </Link>
        )
    }
}

function Profile() {
    const { cspUser, user, logout } = useAuth()

    return (
        <div className="mx-auto max-w-4xl">
            <h1>Hello {user.email}</h1>
            <div>team: {cspUser.team_number}</div>
            <div>letter: {cspUser.team_letter}</div>
            <PlaceholderNavLink text="roster" path="/members/roster" />
            <PlaceholderNavLink text="calendar" path="/members/calendar" />
            <PlaceholderNavLink
                text="shift schedule"
                path="/members/schedule"
            />
            <PlaceholderNavLink text="shift swaps" path="/members/swaps" />
            <PlaceholderNavLink text="logout" path="/logout" logout={logout} />
        </div>
    )
}

export default Profile
