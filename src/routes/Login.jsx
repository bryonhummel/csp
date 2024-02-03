import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Login() {
    const { login } = useAuth()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setErrorMsg('')
            setLoading(true)
            if (!password || !email) {
                setErrorMsg('Please fill in the fields')
                return
            }
            const {
                data: { user, session },
                error,
            } = await login(email, password)
            if (error) setErrorMsg(error.message)
            if (user && session) navigate('/members/profile')
        } catch (error) {
            console.log(error)
            setErrorMsg('Email or Password Incorrect')
        }
        setLoading(false)
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <span className="text-red-600">{errorMsg}</span>
            </form>
        </div>
    )
}

export default Login
