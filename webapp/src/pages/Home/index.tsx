/**
 * Send a request to the user asking it about push notifications sending
 */
import '@/config/pushNotification'

import { Header } from '@/pages/Home/components/Header/index'
import { SummaryTable } from '@/pages/Home/components/SummaryTable/index'

export function HomePage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        <SummaryTable />
      </div>
    </div>
  )
}
