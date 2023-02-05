import Lottie from 'lottie-react'
import error404Animation from '@/assets/animations/error-404.json'

export function ErrorPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col justify-center items-center gap-16">
        <Lottie animationData={error404Animation} style={{ height: 300 }} />
        <div className="font-semibold text-5xl">Oooops...</div>
      </div>
    </div>
  )
}
