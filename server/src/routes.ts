import { FastifyInstance } from "fastify"
import dayjs from 'dayjs'
import { z } from 'zod'
import prisma from "./lib/prisma"

export async function appRoutes(app: FastifyInstance) {
  app.get('/', () => {
    return 'Welcome to Habits API! 👋'
  })

  app.post('/sign-up', async (request) => {
    const createSignUpParams = z.object({
      userUid: z.string()
    })

    const { userUid } = createSignUpParams.parse(request.body)

    await prisma.user.create({
      data: {
        userUid
      }
    })
  })

  app.post('/habits', async (request) => {
    const createHabitsBody = z.object({
      userUid: z.string(),
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6))
    })

    const {userUid, title, weekDays} = createHabitsBody.parse(request.body);

    const today = dayjs().startOf('day').toDate()

    await prisma.habit.create({
      data: {
        userUid,
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
    const getDayParams = z.object({userUid: z.string(), date: z.coerce.date()})

    const { userUid, date } = getDayParams.parse(request.query)

    const parsedDate = dayjs(date).startOf('day')
    const weekDay = parsedDate.get('day')

    const possibleHabits = await prisma.habit.findMany({
      where: {
        userUid: userUid,
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

    const day = await prisma.day.findFirst({
      where: {
        userUid: userUid,
        date: parsedDate.toDate()
      },
      include: {
        DayHabits: true // Only the completed day habits
      }
    })

    const completedHabits = day?.DayHabits.map(dayHabit => dayHabit.habitId) ?? []

    return { possibleHabits, completedHabits }
  })

  app.patch('/habits/:uuid/toggle', async (request) => {
    const toggleHabitParams = z.object({
      uuid: z.string().uuid()
    })

    const { uuid } = toggleHabitParams.parse(request.params)

    const today = dayjs().startOf('day').toDate()

    const habit = await prisma.habit.findUnique({
      where: {
        uuid: uuid
      }
    })

    if (!habit) {
      throw new Error('Habit not found')
    }

    let day = await prisma.day.findFirst({
      where: {
        userUid: habit.userUid,
        date: today
      },
    })

    if (!day) {
      day = await prisma.day.create({
        data: {
          userUid: habit.userUid,
          date: today
        }
      })
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        dayId_habitId: {
          dayId: day.uuid,
          habitId: uuid
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
          habitId: uuid
        }
      })
    }
  })

  app.get('/summary', async (request) => {
    const summaryParams = z.object({
      userUid: z.string()
    })
    
    const { userUid } = summaryParams.parse(request.query)

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
            AND h.userUid = ${userUid}
        ) amount
      FROM days D
     WHERE D.userUid = ${userUid}
    `

    return days
  })

  app.post('/push-notification/subscribe', async (request) => {
    const pushNotificationSubscribe = z.object({
      userUid: z.string(),
      subscription: z.string(),
    })

    const { userUid, subscription } = pushNotificationSubscribe.parse(request.body)

    const userSubscription = await prisma.subscriber.findUnique({
      where: {
        userUid
      }
    })

    if (!userSubscription) {
      await prisma.subscriber.create({
        data: {
          userUid,
          subscription
        }
      })
    }
    else {
      await prisma.subscriber.update({
        where: {
          userUid: userSubscription.userUid
        },
        data: {
          subscription
        }
      })
    }

  })
}
