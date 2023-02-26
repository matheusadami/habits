import { createHashRouter, createRoutesFromElements, redirect, Route } from 'react-router-dom'
import { SignInPage } from '@/pages/SignIn/index'
import { HomePage } from '@/pages/Home'
import { PrivateRoute } from '@/components/PrivateRoute/index'
import { ErrorPage } from '@/pages/Error'
import { SignUpPage } from '@/pages/SignUp'
import { RecoverPasswordPage } from '@/pages/RecoverPassword'

const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<></>} loader={() => redirect('/sign-in')} />
    <Route path="/sign-in" element={<SignInPage />} />
    <Route path="/sign-up" element={<SignUpPage />} />
    <Route path="/recover-password" element={<RecoverPasswordPage />} />

    <Route path="/home" element={<PrivateRoute component={<HomePage />} />} />

    <Route path="*" element={<ErrorPage />} />
  </>
)

export const router = createHashRouter(routes)
