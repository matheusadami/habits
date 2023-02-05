import { createContext, ReactNode, useEffect, useState, useCallback } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/services/firebase'

interface Props {
  children: ReactNode
}

interface AuthState {
  user?: User | null
  isLoadedFromFirebase: boolean
}

interface AuthContextType {
  authState?: AuthState
  changeAuthUser: (user: User) => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: Props) {
  const [authState, setAuthState] = useState<AuthState>({ isLoadedFromFirebase: false })

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      changeAuthUser(user)
    })
  }, [])

  const changeAuthUser = useCallback((user: User | null) => {
    setAuthState((prev) => ({ ...prev, user, isLoadedFromFirebase: true }))
  }, [])

  return authState.isLoadedFromFirebase ? (
    <AuthContext.Provider value={{ authState, changeAuthUser }}>{children}</AuthContext.Provider>
  ) : (
    <></>
  )
}
