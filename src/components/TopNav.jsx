import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Logo from './logo'
import Sidebar from './Sidebar'
import { useState } from 'react'

function HambergerMenuButton({ onClick }) {
    return (
        <div
            className="cursor-pointer rounded stroke-white active:bg-red-700"
            onClick={onClick}
        >
            <svg
                width="32px"
                height="32px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                    {' '}
                    <path
                        d="M4 18L20 18"
                        strokeWidth="2"
                        strokeLinecap="round"
                    ></path>{' '}
                    <path
                        d="M4 12L20 12"
                        strokeWidth="2"
                        strokeLinecap="round"
                    ></path>{' '}
                    <path
                        d="M4 6L20 6"
                        strokeWidth="2"
                        strokeLinecap="round"
                    ></path>{' '}
                </g>
            </svg>
        </div>
    )
}

function TopNav() {
    const { user, logout } = useAuth()
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <div>
            <div className="fixed top-0 z-50 grid h-14 w-full grid-cols-3 items-center bg-red-600 text-white shadow-lg">
                <div className="mx-4 flex">
                    <HambergerMenuButton
                        onClick={() => setShowSidebar(!showSidebar)}
                    />
                    <div className="flex-1"></div>
                </div>
                <Link to={'/members/schedule'}>
                    <Logo />
                </Link>
            </div>
            {showSidebar && (
                <Sidebar hideSidebar={() => setShowSidebar(false)} />
            )}
        </div>
    )
}

export default TopNav
