import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Popover from '@radix-ui/react-popover'
import { signOut as firebaseSignOut } from 'firebase/auth'
import { Plus, X, User, SignOut, Lock } from 'phosphor-react'

import logoImage from '@/assets/logo.svg'
import { auth } from '@/services/firebase'
import { MyProfile } from '@/pages/Home/components/MyProfile/index'
import { CreateHabitForm } from '@/pages/Home/components/CreateHabitForm/index'

export function Header() {
  const [isOpenMyProfile, setIsOpenMyProfile] = useState(false)

  async function signOut() {
    await firebaseSignOut(auth)
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex justify-between items-center">
      <img src={logoImage} alt="Habits" />

      <div className="w-2/6 flex justify-between items-center gap-6">
        <Dialog.Root>
          <div className="group">
            <Dialog.Trigger
              type="button"
              className="flex items-center gap-3 border border-violet-800 font-semibold rounded-lg px-6 py-4 group-hover:border-violet-600 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background">
              <Plus size={20} className="text-violet-800 group-hover:text-violet-600 transition-colors" />
              <span className="text-white">Novo Hábito</span>
            </Dialog.Trigger>
          </div>
          <Dialog.Portal>
            <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />
            <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Dialog.Close className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200 focus:outline-none rounded-lg focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-background">
                <X size={24} aria-label="Close" />
              </Dialog.Close>
              <Dialog.Title className="text-3xl leading-tight font-extrabold">Criar Hábito</Dialog.Title>
              <CreateHabitForm />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <Popover.Root>
          <Popover.Trigger
            type="button"
            className="flex items-center justify-center w-10 h-10 my-2 bg-violet-800 rounded-full hover:bg-violet-600">
            <User size={26} aria-label="Profile" className="text-white" />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className="flex flex-col min-w-[220px] py-4 rounded-2xl bg-zinc-900">
              <Popover.Close />

              {/* Option - My Profile */}
              <Dialog.Root open={isOpenMyProfile} onOpenChange={setIsOpenMyProfile}>
                <div className="group">
                  <Dialog.Trigger
                    type="button"
                    className="flex justify-start items-center w-full py-1 px-4 gap-2 hover:bg-background">
                    <User size={26} aria-label="Profile" className="text-violet-600 mx-3 my-2" />

                    <span className=" text-white leading-tight">Meu Perfil</span>
                  </Dialog.Trigger>
                </div>
                <Dialog.Portal>
                  <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />
                  <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Dialog.Close className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200 focus:outline-none rounded-lg focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-background">
                      <X size={24} aria-label="Close" />
                    </Dialog.Close>
                    <Dialog.Title className="text-3xl leading-tight font-extrabold">Meu Perfil</Dialog.Title>
                    <MyProfile onDismissDialog={() => setIsOpenMyProfile(false)} />
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>

              {/* Option - Sign Out */}
              <button
                type="button"
                onClick={signOut}
                className="flex justify-start items-center w-full py-1 px-4 gap-2 hover:bg-background">
                <SignOut size={26} aria-label="Profile" className="text-red-600 mx-3 my-2" />

                <span className=" text-white leading-tight">Sair</span>
              </button>

              <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  )
}
