import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useLocalStorage } from '../hooks/useLocalStorage'

function Login() {
    const { login } = useAuth()
    const [storedRememberMe, setStoredRememberMe] = useLocalStorage(
        'csp-rememberMe',
        ''
    )
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState(storedRememberMe)
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)
    const navigate = useNavigate()
    const [rememberMe, setRememberMe] = useState(storedRememberMe !== '')

    useEffect(() => {
        // clear any stored login info as soon as they uncheck
        if (!rememberMe && storedRememberMe != '') {
            setStoredRememberMe('')
        }
    }, [rememberMe])

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
            if (rememberMe) {
                setStoredRememberMe(email)
            }
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
                        autoCapitalize="none"
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
                <div className="m-auto flex pl-5">
                    <input
                        className=" disabled:border-steel-400
                        disabled:bg-steel-400 peer relative
                        mt-1 h-4 w-4 shrink-0 appearance-none rounded-sm border-2
                        border-white
                        bg-white
                        checked:border-0 checked:bg-red-600 focus:outline-none focus:ring-2
                        focus:ring-red-100 focus:ring-offset-0
                      "
                        type="checkbox"
                        value={rememberMe}
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(!rememberMe)}
                    />
                    <label className="mx-2">Remember Me</label>
                    <svg
                        className="
                        pointer-events-none
                        absolute
                            mt-1 
                            hidden
                            h-4 w-4
                            stroke-white
                            peer-checked:block"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <polyline points="18 6 9 17 4 12"></polyline>
                    </svg>
                </div>
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
