import { useState } from 'react'
import './App.css'
import React from 'react'
import Swaps from './routes/Swaps'
import Root from './routes/Root'
import Login from './routes/Login'
import Profile from './routes/Profile'
import ErrorPage from './routes/Error'
import { ProtectedRoute } from './routes/ProtectedRoute'
import {AuthProvider} from './hooks/useAuth';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/swaps",
        element:
          <ProtectedRoute>
            <Swaps />
          </ProtectedRoute>,
      },
      {
        path: "/profile",
        element:
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>,
      },
    ],
  },
]);

function App() {

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
