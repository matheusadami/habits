import dayjs from "dayjs"
import cron from 'node-cron'
import webPush from 'web-push'
import prisma from "../lib/prisma"

export async function habitsNotificationJob() {
  // The notifications will be sending at 9 P.M every day 
  cron.schedule("0 0 21 * * *", async function () {
    const parsedDate = dayjs().startOf('day')
    const weekDay = parsedDate.get('day')

    console.log(`Executing notifications jobs - ${parsedDate.toISOString()}`)

    const users = await prisma.user.findMany({
      include: {
        Subscriber: true
      }
    })

    for (const user of users) {
      const possibleHabits = await prisma.habit.findMany({
        where: {
          userUid: user.userUid,
          createAt: {
            lte: parsedDate.toDate()
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
          userUid: user.userUid,
          date: parsedDate.toDate()
        },
        include: {
          DayHabits: true // Only the completed day habits
        }
      })
      
      const amountPossibleHabits = possibleHabits.length ?? 0
      const amoutCompletedHabits = day?.DayHabits.length ?? 0

      if (amountPossibleHabits > 0 && amountPossibleHabits > amoutCompletedHabits) {
        const notificationPayload = {
          title: `Habits`,
          body: 'Ei, você ainda tem hábitos para serem concluídos hoje!'
        }
        webPush.sendNotification(JSON.parse(user.Subscriber!.subscription), JSON.stringify(notificationPayload))
      }
    }
  });
}