/*
  Warnings:

  - You are about to drop the column `doneByUserId` on the `Workout` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_doneByUserId_fkey";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "doneByUserId",
ADD COLUMN     "clientProfileId" TEXT;

-- CreateTable
CREATE TABLE "WorkoutRecord" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "day" "WorkoutDay" NOT NULL,
    "skipped" BOOLEAN,
    "originalWorkoutId" TEXT,
    "doneByUserId" TEXT,

    CONSTRAINT "WorkoutRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseRecord" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "workoutRecordId" TEXT,

    CONSTRAINT "ExerciseRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseSetRecord" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "targetReps" INTEGER NOT NULL,
    "targetValue" DOUBLE PRECISION NOT NULL,
    "executedReps" INTEGER NOT NULL,
    "executedValue" DOUBLE PRECISION NOT NULL,
    "exerciseRecordId" TEXT,

    CONSTRAINT "ExerciseSetRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseRecord_workoutRecordId_order_key" ON "ExerciseRecord"("workoutRecordId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseSetRecord_exerciseRecordId_index_key" ON "ExerciseSetRecord"("exerciseRecordId", "index");

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_clientProfileId_fkey" FOREIGN KEY ("clientProfileId") REFERENCES "ClientProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutRecord" ADD CONSTRAINT "WorkoutRecord_originalWorkoutId_fkey" FOREIGN KEY ("originalWorkoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutRecord" ADD CONSTRAINT "WorkoutRecord_doneByUserId_fkey" FOREIGN KEY ("doneByUserId") REFERENCES "ClientProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseRecord" ADD CONSTRAINT "ExerciseRecord_workoutRecordId_fkey" FOREIGN KEY ("workoutRecordId") REFERENCES "WorkoutRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseSetRecord" ADD CONSTRAINT "ExerciseSetRecord_exerciseRecordId_fkey" FOREIGN KEY ("exerciseRecordId") REFERENCES "ExerciseRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;
