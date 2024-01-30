import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';

function TopNav() {
    const {user, logout} = useAuth()

    return (
    <div>
        <Link to={`/`}>Home</Link>
        { !user && <Link to={`./login`}>Login</Link>}
        { user && <Link onClick={logout}>Logout</Link>}
        <Link to={`./swaps`}>Swaps</Link>
        { user && <span>{user.username}</span>}
    </div> );
}

export default TopNav;