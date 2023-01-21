-- CreateTable
CREATE TABLE "habits" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "habitweekdays" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "habitId" TEXT NOT NULL,
    "weekDay" INTEGER NOT NULL,
    CONSTRAINT "habitweekdays_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "habits" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "days" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "dayhabits" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "dayId" TEXT NOT NULL,
    "habitId" TEXT NOT NULL,
    CONSTRAINT "dayhabits_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "days" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "dayhabits_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "habits" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "habitweekdays_habitId_weekDay_key" ON "habitweekdays"("habitId", "weekDay");

-- CreateIndex
CREATE UNIQUE INDEX "days_date_key" ON "days"("date");

-- CreateIndex
CREATE UNIQUE INDEX "dayhabits_dayId_habitId_key" ON "dayhabits"("dayId", "habitId");
