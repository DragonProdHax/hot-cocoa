import { createContext, createEffect, createSignal, useContext } from 'solid-js'
import { supabase, type Session, type User } from './supabase'

interface AuthContextType {
  session: () => Session
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, username: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>()

export function AuthProvider(props: { children: any }) {
  const [session, setSession] = createSignal<Session>({ user: null, error: null })

  createEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSession({ user: session.user as User, error: null })
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setSession({ user: session.user as User, error: null })
      } else {
        setSession({ user: null, error: null })
      }
    })

    return () => subscription.unsubscribe()
  })

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signUp = async (email: string, password: string, username: string) => {
    const { error: signUpError } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          username
        }
      }
    })
    if (signUpError) throw signUpError
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return (
    <AuthContext.Provider value={{ session, signIn, signUp, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 