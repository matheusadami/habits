import { useId, useEffect, useState } from 'react'
import { DayHabit } from './DayHabit'
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'
import axios from '@/lib/axios'
import dayjs from 'dayjs'

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

interface Summary {
  uuid: string
  date: string
  amount: number
  completed: number
}

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary[]>([])

  useEffect(() => {
    const loadSummary = async () => {
      const { data } = await axios.get('/summary')
      setSummary(data)
    }

    loadSummary()
  }, [])

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, i) => {
          return (
            <div
              key={useId()}
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
              {weekDay}
            </div>
          )
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 &&
          summaryDates.map((date) => {
            const dayInSummary = summary.find((day) =>
              dayjs(date).isSame(day.date, 'day')
            )

            return (
              <DayHabit
                key={date.toString()}
                date={date}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
              />
            )
          })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
              />
            )
          })}
      </div>
    </div>
  )
}