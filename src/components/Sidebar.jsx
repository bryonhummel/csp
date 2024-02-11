import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function SidebarLink({ text, path, onClick }) {
    return (
        <Link className="border-red-700 capitalize" to={path} onClick={onClick}>
            <div className="cursor-pointer px-4 py-2 text-white  active:bg-red-700">
                {text}
            </div>
        </Link>
    )
}

function Sidebar({ hideSidebar }) {
    const { user, logout } = useAuth()

    return (
        <div className="fixed top-14 z-30 flex h-screen w-full ">
            <div className="flex min-w-40 flex-col divide-y bg-red-600 pt-4">
                {user && (
                    <SidebarLink
                        text="roster"
                        path="/members/roster"
                        onClick={hideSidebar}
                    />
                )}
                {user && (
                    <SidebarLink
                        text="calendar"
                        path="/members/calendar"
                        onClick={hideSidebar}
                    />
                )}
                {user && (
                    <SidebarLink
                        text="shift schedule"
                        path="/members/schedule"
                        onClick={hideSidebar}
                    />
                )}
                {user && (
                    <SidebarLink
                        text="shift swaps"
                        path="/members/swaps"
                        onClick={hideSidebar}
                    />
                )}
                {user && (
                    <SidebarLink
                        text="My Profile"
                        path="/members/profile"
                        onClick={hideSidebar}
                    />
                )}
                {user && (
                    <SidebarLink
                        text="logout"
                        path="/login"
                        logout={logout}
                        onClick={() => {
                            hideSidebar()
                            logout()
                        }}
                    />
                )}
                {!user && (
                    <SidebarLink
                        text="Login"
                        path="/login"
                        onClick={hideSidebar}
                    />
                )}
            </div>
            {/* empty div to click to close sidebar */}
            <div
                className="flex-auto bg-black opacity-20"
                onClick={hideSidebar}
            ></div>
        </div>
    )
}

export default Sidebar
