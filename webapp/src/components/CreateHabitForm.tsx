import { useId, useState } from 'react'
import { Check } from 'phosphor-react'
import * as Checkbox from '@radix-ui/react-checkbox'
import axios from '@/lib/axios'

const availableWeekDays = [
  'Domingo',
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado'
]

export function CreateHabitForm() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  async function crateHabit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!!title && !!weekDays.length) {
      await axios.post('/habits', { title, weekDays })

      alert('Hábito criado com sucesso!')

      setTitle('')
      setWeekDays([])
    }
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const newWeekDays = weekDays.filter((day) => day !== weekDay)
      setWeekDays(newWeekDays)
    } else {
      setWeekDays((prev) => [...prev, weekDay])
    }
  }

  return (
    <form onSubmit={(e) => crateHabit(e)} className="flex flex-col w-full mt-6">
      <label htmlFor="title">Qual seu comprometimento?</label>
      <input
        autoFocus
        id="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="p-4 rounded-lg my-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
        placeholder="Ex.: Exercícios, dormir 8h etc..."
      />

      <label>Qual a recorrência?</label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, i) => (
          <Checkbox.Root
            key={useId()}
            checked={weekDays.includes(i)}
            className="flex items-center gap-3 group focus:outline-none"
            onCheckedChange={() => handleToggleWeekDay(i)}>
            <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-500 group-focus:ring-offset-2 group-focus:ring-offset-background">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className=" text-white leading-tight">{weekDay}</span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        type="submit"
        className="flex justify-center items-center mt-6 rounded-lg p-4 gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors">
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}
