import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/services/firebase'

export function RecoverPasswordPage() {
  const [email, setEmail] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function sendPasswordRecoverEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setIsLoading(true)

      if (!email) {
        throw new Error()
      }

      await sendPasswordResetEmail(auth, email, { url: window.location.origin })

      alert('E-mail enviado com sucesso. Por favor verifique sua caixa de entrada ou spam.')
    } catch (error) {
      alert('Não foi possível enviar o e-mail para recuperação de senha. Verifique seu endereço de e-mail.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="flex flex-col justify-center items-center mt-12 gap-6">
              <div className="font-extrabold text-4xl">Recuperar Senha</div>
              <div>Informe seu endereço de e-mail para recuperar sua senha.</div>
            </div>
            <form onSubmit={(e) => sendPasswordRecoverEmail(e)} className="mt-8 space-y-6">
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    autoFocus
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 rounded-lg my-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                    placeholder="E-mail"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex justify-center items-center w-full mt-6 rounded-lg p-4 gap-3 font-semibold bg-violet-600 hover:bg-violet-500 transition-colors disabled:opacity-80">
                  {isLoading ? 'Carregando...' : 'Receber e-mail'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
