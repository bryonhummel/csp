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
        <div className="text-center mt-16 w-fit m-auto">
            <h1 className="font-bold text-2xl my-4">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="ml-auto">
                    Email:
                    <input
                        className="ml-2 h-8 p-2 rounded"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label className="ml-auto">
                    Password:
                    <input
                        className="ml-2 h-8 p-2 rounded"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <input
                    className="bg-red-600 text-white py-1 rounded hover:cursor-pointer active:bg-red-400"
                    type="submit"
                    value="Submit"
                />
                <span className="text-red-600">{error}</span>
            </form>
        </div>
    )
}

export default Login
