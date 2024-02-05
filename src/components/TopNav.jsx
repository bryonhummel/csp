import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Logo from './logo'

function TopNav() {
    const { user, logout } = useAuth()

    return (
        <div className="fixed top-0 flex h-14 w-full flex-grow items-center justify-evenly bg-red-600 text-white shadow-md">
            <Link to={'/members/profile'}>
                <Logo />
            </Link>
        </div>
    )
}

export default TopNav
