import { createContext, useContext, useMemo, useEffect, useState } from 'react'
import { supabase } from '../supabase/client'
import { useLocalStorage } from './useLocalStorage'
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('user', null)
    const [auth, setAuth] = useState(false)
    const [cspUser, setCspUser] = useState({
        team_number: 0,
        team_letter: '',
        cspid: '',
    })

    // call this function when you want to authenticate the user
    const login = async (email, password) =>
        supabase.auth.signInWithPassword({ email, password })

    // call this function to sign out logged in user
    const logout = () => supabase.auth.signOut()

    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                setUser(session.user)
                setAuth(true)
            } else if (event === 'SIGNED_OUT') {
                setUser(null)
                setAuth(false)
                setCspUser(null)
            }
        })
        return () => {
            data.subscription.unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (user) {
            setCspUser({
                team_number: 4,
                team_letter: 'b',
                cspid: '12345678901',
            })
        } else {
            setCspUser({
                team_number: 0,
                team_letter: '',
                cspid: '',
            })
        }
    }, [user])

    const value = useMemo(
        () => ({
            cspUser,
            user,
            login,
            logout,
        }),
        [user, cspUser]
    )
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}
