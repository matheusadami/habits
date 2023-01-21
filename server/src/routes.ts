import { FastifyInstance } from "fastify"
import dayjs from 'dayjs'
import { z } from 'zod'
import prisma from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
  app.post('/habits', async (request) => {
    const createHabitsBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6))
    })

    const {title, weekDays} = createHabitsBody.parse(request.body);

    const today = dayjs().startOf('day').toDate()

    await prisma.habit.create({
      data: {
        title,
        createAt: today,
        WeekDays: {
          create: weekDays.map(weekDay => {
            return {weekDay}
          })
        }
      }
    })
  })

  app.get('/day', async (request) => {
    const getDayParams = z.object({date: z.coerce.date()})

    const { date } = getDayParams.parse(request.query)

    const parsedDate = dayjs(date).startOf('day')
    const weekDay = parsedDate.get('day')

    const possibleHabits = await prisma.habit.findMany({
      where: {
        createAt: {
          lte: date
        },
        WeekDays: {
          some: {
            weekDay: weekDay
          }
        }
      }
    })

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate()
      },
      include: {
        DayHabits: true // Only the completed day habits
      }
    })

    const completedHabits = day?.DayHabits.map(dayHabit => dayHabit.habitId) ?? []

    return { possibleHabits, completedHabits }
  })

  app.patch('/habits/:id/toggle', async (request) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid()
    })

    const { id } = toggleHabitParams.parse(request.params)

    const today = dayjs().startOf('day').toDate()

    let day = await prisma.day.findUnique({
      where: {
        date: today
      },
    })

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today
        }
      })
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        dayId_habitId: {
          dayId: day.uuid,
          habitId: id
        }
      }
    })

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          uuid: dayHabit.uuid
        }
      })
    }
    else {
      await prisma.dayHabit.create({
        data: {
          dayId: day.uuid,
          habitId: id
        }
      })
    }
  })

  app.get('/summary', async () => {
    const days = await prisma.$queryRaw`
      SELECT
        D.uuid,
        D.date,
        (
          SELECT cast(count(1) as float)
          FROM dayHabits DH
          WHERE DH.dayId = D.uuid
        ) completed,
        (
          SELECT cast(count(1) as float)
          FROM habitWeekDays HWD
          JOIN habits H
            ON H.uuid = HWD.habitId
          WHERE
            HWD.weekDay = cast(strftime('%w', D.date/1000, 'unixepoch') as int)
            AND h.createAt <= D.date
        ) amount
      FROM days D
    `

    return days
  })
}
