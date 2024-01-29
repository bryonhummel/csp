import { useState } from 'react'
import './App.css'
import React from 'react'
import Swaps from './routes/Swaps'
import Root from './routes/Root'
import ErrorPage from './routes/Error'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    path: "/swaps",
    element: <Swaps />,
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
