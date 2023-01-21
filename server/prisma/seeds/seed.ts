import prisma from '../../src/lib/prisma'

(async () => {
  try {
    await prisma.habitWeekDays.deleteMany()
    await prisma.dayHabit.deleteMany()
    await prisma.habit.deleteMany()
    await prisma.day.deleteMany()

    const firstHabit = await prisma.habit.create({
      data: {
        title: 'Beber 2L de água',
        createAt: new Date('2022-12-31T03:00:00.000'),
        WeekDays: {
          create: [
            { weekDay: 1 },
            { weekDay: 2 },
            { weekDay: 3 },
          ]
        }
      }
    })

    const secondHabit = await prisma.habit.create({
      data: {
        title: 'Exercitar',
        createAt: new Date('2023-01-03T03:00:00.000'),
        WeekDays: {
          create: [
            { weekDay: 3 },
            { weekDay: 4 },
            { weekDay: 5 },
          ]
        }
      }
    })

    const thirdHabit = await prisma.habit.create({
      data: {
        title: 'Dormir 8H',
        createAt: new Date('2023-01-08T03:00:00.000'),
        WeekDays: {
          create: [
            { weekDay: 1 },
            { weekDay: 2 },
            { weekDay: 3 },
            { weekDay: 4 },
            { weekDay: 5 },
          ]
        }
      }
    })

    /**
     * Habits (Complete/Available): 1/1
     */
    await prisma.day.create({
      data: {
        date: new Date('2023-01-02T03:00:00.000z'),
        DayHabits: {
          create: [
            { habitId: firstHabit.uuid },
          ]
        }
      }
    })

    /**
     * Habits (Complete/Available): 1/1
     */
    await prisma.day.create({
      data: {
        date: new Date('2023-01-06T03:00:00.000z'),
        DayHabits: {
          create: [
            { habitId: firstHabit.uuid },
          ]
        }
      }
    })

    /**
     * Habits (Complete/Available): 2/2
     */
    await prisma.day.create({
      data: {
        date: new Date('2023-01-04T03:00:00.000z'),
        DayHabits: {
          create: [
            { habitId: firstHabit.uuid },
            { habitId: secondHabit.uuid },
          ]
        }
      }
    })
  } catch (error) {
    console.error(error)
  }
  finally {
    await prisma.$disconnect()
  }
})()