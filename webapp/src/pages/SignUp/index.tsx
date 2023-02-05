import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/services/firebase'

import logoImage from '../../assets/logo.svg'
import axios from '@/lib/axios'

interface FormState {
  username?: string
  email?: string
  password?: string
}

const initialFormState = {
  username: '',
  email: '',
  password: ''
}

export function SignUpPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>({ ...initialFormState })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function signUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setIsLoading(true)

      if (form.email && form.password) {
        const user = await createUserWithEmailAndPassword(auth, form.email, form.password)
        await axios.post('/sign-up', { userUid: user.user.uid })
        await updateProfile(user.user, { displayName: form.username })
        await signInWithEmailAndPassword(auth, form.email, form.password)

        navigate('/home', { replace: true })
      }
    } catch (error) {
      alert('Não foi possível concluir o cadastro, tente outro endereço de e-mail.')
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
            <form onSubmit={(e) => signUp(e)} className="mt-8 space-y-6">
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Nome
                  </label>
                  <input
                    autoFocus
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
                    className="w-full p-4 rounded-lg my-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                    placeholder="Username"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
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

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex justify-center items-center w-full mt-6 rounded-lg p-4 gap-3 font-semibold bg-violet-600 hover:bg-violet-500 transition-colors disabled:opacity-80">
                  {isLoading ? 'Carregando...' : 'Cadastrar-se'}
                </button>
              </div>

              <div className="text-center">
                <span className=" text-white leading-tight">
                  Já possui uma conta?
                  <Link to={'/sign-in'}>
                    <span className="pl-2 font-medium text-violet-600 hover:text-violet-500">Acessar</span>
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
