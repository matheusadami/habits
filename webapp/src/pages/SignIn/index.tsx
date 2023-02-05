import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/services/firebase'

import logoImage from '../../assets/logo.svg'

interface FormState {
  email?: string
  password?: string
}

const initialFormState = {
  email: '',
  password: ''
}

export function SignInPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>({ ...initialFormState })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function signIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setIsLoading(true)

      if (form.email && form.password) {
        await signInWithEmailAndPassword(auth, form.email, form.password)

        navigate('/home', { replace: true })
      }
    } catch (error) {
      alert('E-mail ou senha inválidos.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="flex justify-center my-12">
              <img src={logoImage} alt="Habits" />
            </div>
            <form onSubmit={(e) => signIn(e)} className="mt-8 space-y-6">
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    autoFocus
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full p-4 rounded-lg my-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                    placeholder="E-mail"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                    className="w-full p-4 rounded-lg my-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                    placeholder="Senha"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between !mt-4">
                <div className="flex items-center">
                  {/*
                  <Checkbox.Root className="flex items-center gap-3 group focus:outline-none">
                    <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-violet-500 group-data-[state=checked]:border-violet-500 transition-colors group-focus:ring-2 group-focus:ring-violet-500 group-focus:ring-offset-2 group-focus:ring-offset-background">
                      <Checkbox.Indicator>
                        <Check size={20} className="text-white" />
                      </Checkbox.Indicator>
                    </div>

                    <span className=" text-white leading-tight">Lembrar de mim</span>
                  </Checkbox.Root>
                  */}
                </div>

                <div className="text-sm">
                  <Link to={'/recover-password'} className="font-medium text-violet-600 hover:text-violet-500">
                    Esqueceu senha senha?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex justify-center items-center w-full mt-6 rounded-lg p-4 gap-3 font-semibold bg-violet-600 hover:bg-violet-500 transition-colors disabled:opacity-80">
                  {isLoading ? 'Carregando...' : 'Entrar'}
                </button>
              </div>

              <div className="text-center">
                <span className=" text-white leading-tight">
                  Ainda não possui uma conta?
                  <Link to={'/sign-up'}>
                    <span className="pl-2 font-medium text-violet-600 hover:text-violet-500">Cadastre-se</span>
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
