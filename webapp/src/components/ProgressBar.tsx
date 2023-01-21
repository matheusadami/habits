interface Props {
  progress: number
}

export function ProgressBar({ progress }: Props) {
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div
        role="progressbar"
        className="h-3 rounded-lg bg-violet-600 w-3/4 transition-all"
        aria-label="Progresso de hábitos completos neste dia"
        aria-valuenow={progress}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
