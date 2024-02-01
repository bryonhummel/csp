import { createContext, useContext, useMemo, useEffect, useState } from 'react'
import { supabase } from '../supabase/client'
import { useLocalStorage } from './useLocalStorage'
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('user', null)
    const [auth, setAuth] = useState(false)

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
            }
        })
        return () => {
            data.subscription.unsubscribe()
        }
    }, [])

    const value = useMemo(
        () => ({
            user,
            login,
            logout,
        }),
        [user]
    )
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}
