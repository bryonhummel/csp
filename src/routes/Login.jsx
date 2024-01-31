import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Login() {
    const { login } = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        try {
            // Development HACK - lets let anything through :)
            if (password == '') {
                throw new Error('Invalid value')
            }
            login({ username: username })
            //await authenticate(username, password); // Assuming you have the authenticate function
            navigate('/profile')
        } catch {
            setError('Invalid username or password')
        }
    }

    return (
        <div className="m-auto mt-16 w-fit text-center">
            <h1 className="my-4 text-2xl font-bold">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="ml-auto">
                    Email:
                    <input
                        className="ml-2 h-8 rounded p-2"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label className="ml-auto">
                    Password:
                    <input
                        className="ml-2 h-8 rounded p-2"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <input
                    className="rounded bg-red-600 py-1 text-white hover:cursor-pointer active:bg-red-400"
                    type="submit"
                    value="Submit"
                />
                <span className="text-red-600">{error}</span>
            </form>
        </div>
    )
}

export default Login
