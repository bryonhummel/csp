import { Link } from 'react-router-dom'

function TopNav() {
    return (
    <div>
        <Link to={`/`}>Home</Link>
        <Link to={`./swaps`}>Swaps</Link>
    </div> );
}

export default TopNav;