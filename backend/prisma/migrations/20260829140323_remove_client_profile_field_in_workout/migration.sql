/*
  Warnings:

  - You are about to drop the column `clientProfileId` on the `Workout` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_clientProfileId_fkey";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "clientProfileId";
