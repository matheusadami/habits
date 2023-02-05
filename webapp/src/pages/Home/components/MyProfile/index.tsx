import { useEffect, useState } from 'react'
import { Check } from 'phosphor-react'
import { auth, hasAuthUser } from '@/services/firebase'
import { updateEmail, updateProfile } from 'firebase/auth'

interface ProfileType {
  username: string
  email: string
}

interface MyProfileProps {
  onDismissDialog: () => void
}

const initialProfileType: ProfileType = {
  username: '',
  email: ''
}

export function MyProfile({ onDismissDialog }: MyProfileProps) {
  const [profile, setProfile] = useState<ProfileType>({ ...initialProfileType })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!hasAuthUser()) {
      onDismissDialog()
    } else {
      const profile: ProfileType = {
        username: auth.currentUser!.displayName!,
        email: auth.currentUser!.email!
      }

      setProfile(profile)
    }
  }, [])

  async function updateMyProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setIsLoading(true)

      if (!profile.username) {
        throw new Error('Por favor informe seu Nome')
      }

      if (!profile.email) {
        throw new Error('Por favor informe seu E-mail')
      }

      await updateProfile(auth.currentUser!, { displayName: profile.username })
      await updateEmail(auth.currentUser!, profile.email)

      onDismissDialog()
    } catch (error) {
      alert((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={(e) => updateMyProfile(e)} className="flex flex-col w-full mt-6">
      <label htmlFor="username">Nome</label>
      <input
        type="text"
        name="username"
        value={profile.username}
        onChange={(event) => setProfile((prev) => ({ ...prev, username: event.target.value }))}
        className="p-4 rounded-lg my-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
      />

      <label htmlFor="email">E-mail</label>
      <input
        type="text"
        name="email"
        value={profile.email}
        onChange={(event) => setProfile((prev) => ({ ...prev, email: event.target.value }))}
        className="p-4 rounded-lg my-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="flex justify-center items-center mt-6 rounded-lg p-4 gap-3 font-semibold bg-green-600 hover:bg-green-500 disabled:opacity-80 transition-colors">
        {isLoading ? (
          'Carregando...'
        ) : (
          <>
            <Check size={20} weight="bold" />
            Alterar
          </>
        )}
      </button>
    </form>
  )
}
