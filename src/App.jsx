import { useState } from 'react'
import './App.css'
import React from 'react'
import Swaps from './routes/Swaps'
import Roster from './routes/Roster'
import Root from './routes/Root'
import Login from './routes/Login'
import Schedule from './routes/Schedule'
import Profile from './routes/Profile'
import ErrorPage from './routes/Error'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { RosterProvider } from './hooks/useRoster'
import { ScheduleProvider } from './hooks/useSchedule'

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
        ],
    },
    {
        path: '/members',
        element: (
            <ProtectedRoute>
                <RosterProvider>
                    <ScheduleProvider>
                        <Root />
                    </ScheduleProvider>
                </RosterProvider>
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'swaps',
                element: <Swaps />,
            },
            {
                path: 'schedule',
                element: <Schedule />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'roster',
                element: <Roster />,
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
