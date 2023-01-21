import * as Popover from '@radix-ui/react-popover'
import { ProgressBar } from './ProgressBar'
import clsx from 'clsx'
import { DayHabitsList } from '@/components/DayHabitsList'
import dayjs from 'dayjs'
import { useState } from 'react'

interface Props {
  date: Date
  amount?: number
  defaultCompleted?: number
}

export function DayHabit({ date, amount = 0, defaultCompleted = 0 }: Props) {
  const [completed, setCompleted] = useState(defaultCompleted)

  const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')

  function handleCompletedChanged(amountCompleted: number) {
    setCompleted(amountCompleted)
  }

  return (
    <Popover.Root>
      <Popover.Trigger>
        <div
          className={clsx(
            'w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-background',
            {
              'bg-zinc-900 border-zinc-800': completedPercentage === 0,
              'bg-violet-400 border-violet-200': completedPercentage > 0 && completedPercentage <= 20,
              'bg-violet-500 border-violet-300': completedPercentage >= 20 && completedPercentage <= 40,
              'bg-violet-600 border-violet-400': completedPercentage >= 40 && completedPercentage <= 60,
              'bg-violet-700 border-violet-500': completedPercentage >= 60 && completedPercentage <= 80,
              'bg-violet-900 border-violet-700': completedPercentage >= 80
            }
          )}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="flex flex-col min-w-[320px] p-6 rounded-2xl bg-zinc-900">
          <Popover.Close />
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMonth}</span>

          <ProgressBar progress={completedPercentage} />

          <DayHabitsList date={date} onCompletedChanged={handleCompletedChanged} />

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}