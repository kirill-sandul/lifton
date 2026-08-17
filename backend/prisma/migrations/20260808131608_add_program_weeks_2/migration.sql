/*
  Warnings:

  - You are about to drop the column `trainingProgramId` on the `Workout` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_trainingProgramId_fkey";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "trainingProgramId";
