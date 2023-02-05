import { useCallback, useContext, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate, Route, RouteProps, useLocation, useNavigate } from 'react-router-dom'

import { AuthContext } from '@/contexts/AuthProvider'
import { auth } from '@/services/firebase'

interface Props {
  component: JSX.Element
}

export function PrivateRoute({ component }: Props) {
  const navigate = useNavigate()
  const { authState } = useContext(AuthContext)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!!authState?.isLoadedFromFirebase && !authState.user) {
        return navigate('/')
      }
    })

    return () => clearTimeout(timer)
  }, [authState])

  return authState?.isLoadedFromFirebase && authState.user ? component : <></>
}
