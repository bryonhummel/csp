import { useAuth } from '../hooks/useAuth'

function Profile() {
    const { cspUser, user, logout } = useAuth()

    return (
        <div className="mx-auto max-w-4xl">
            <h1>Hello {user.email}</h1>
            <div>team: {cspUser.team_number}</div>
            <div>letter: {cspUser.team_letter}</div>
        </div>
    )
}

export default Profile
