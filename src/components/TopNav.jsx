import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Logo from './logo'

function TopNav() {
    const { user, logout } = useAuth()

    return (
        <div className="bg-red-600 h-12 shadow-md text-white flex flex-grow justify-evenly items-center fixed w-full top-0">
            <Link to={'/profile'}>
                <Logo />
            </Link>
        </div>
    )
}

export default TopNav
