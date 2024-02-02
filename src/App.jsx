import { useState } from 'react'
import './App.css'
import React from 'react'
import Swaps from './routes/Swaps'
import Roster from './routes/Roster'
import Root from './routes/Root'
import Login from './routes/Login'
import Profile from './routes/Profile'
import ErrorPage from './routes/Error'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { createHashRouter, RouterProvider } from 'react-router-dom'

const router = createHashRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/swaps',
                element: (
                    <ProtectedRoute>
                        <Swaps />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/profile',
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/roster',
                element: (
                    <ProtectedRoute>
                        <Roster />
                    </ProtectedRoute>
                ),
            },
        ],
    },
])

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
