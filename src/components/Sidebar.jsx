import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function SidebarLink({ text, path, onClick }) {
    return (
        <Link className="capitalize" to={path} onClick={onClick}>
            <div className="cursor-pointer px-4 py-2 text-white  active:bg-red-400">
                {text}
            </div>
        </Link>
    )
}

function Sidebar({ hideSidebar }) {
    const { logout } = useAuth()
    return (
        <div className="fixed top-14 h-screen min-w-40 bg-red-600 drop-shadow-2xl">
            <SidebarLink
                text="roster"
                path="/members/roster"
                onClick={hideSidebar}
            />
            <SidebarLink
                text="calendar"
                path="/members/calendar"
                onClick={hideSidebar}
            />
            <SidebarLink
                text="shift schedule"
                path="/members/schedule"
                onClick={hideSidebar}
            />
            <SidebarLink
                text="shift swaps"
                path="/members/swaps"
                onClick={hideSidebar}
            />
            <SidebarLink
                text="logout"
                path="/logout"
                logout={logout}
                onClick={hideSidebar}
            />
        </div>
    )
}

export default Sidebar
