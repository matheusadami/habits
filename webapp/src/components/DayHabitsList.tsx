import { useEffect, useState } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'
import axios from '@/lib/axios'
import dayjs from 'dayjs'

interface Props {
  date: Date
  onCompletedChanged: (amountCompleted: number) => void
}

interface Habit {
  uuid: string
  title: string
  createAt: string
}

interface HabitsInfo {
  possibleHabits: Habit[]
  completedHabits: string[]
}

export function DayHabitsList({ date, onCompletedChanged }: Props) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

  const isDayInPast = dayjs(date).endOf('day').isBefore(new Date())

  useEffect(() => {
    const loadDayHabits = async () => {
      const { data } = await axios.get('/day', {
        params: {
          date: date.toISOString()
        }
      })

      setHabitsInfo(data)
    }

    loadDayHabits()
  }, [])

  async function handleToggleHabit(habitId: string) {
    await axios.patch(`/habits/${habitId}/toggle`)

    const isHabitAlreadyCompleted =
      habitsInfo?.completedHabits.includes(habitId)

    let completedHabits: string[] = []

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (id) => id !== habitId
      )
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId]
    }

    setHabitsInfo((prev) => ({ ...prev!, completedHabits }))

    onCompletedChanged(completedHabits.length)
  }

  return (
    <div className="flex flex-col gap-3 mt-6">
      {habitsInfo?.possibleHabits.map((habit) => (
        <Checkbox.Root
          key={habit.uuid}
          disabled={isDayInPast}
          defaultChecked={habitsInfo.completedHabits.includes(habit.uuid)}
          onCheckedChange={() => handleToggleHabit(habit.uuid)}
          className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed">
          <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-500 group-focus:ring-offset-2 group-focus:ring-offset-background">
            <Checkbox.Indicator>
              <Check size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>

          <span className="font-semibold text-lg text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
            {habit.title}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  )
}
