import { useState } from 'react'
import './App.css'
import React from 'react'
import Swaps from './routes/Swaps'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Swaps />
    </>
  )
}

export default App
