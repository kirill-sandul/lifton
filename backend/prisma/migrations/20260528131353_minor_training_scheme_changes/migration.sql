/*
  Warnings:

  - You are about to drop the column `assignedTrainerId` on the `ClientProfile` table. All the data in the column will be lost.
  - Added the required column `unit` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClientProfile" DROP CONSTRAINT "ClientProfile_assignedTrainerId_fkey";

-- AlterTable
ALTER TABLE "ClientProfile" DROP COLUMN "assignedTrainerId",
ADD COLUMN     "assignedTrainerProfileId" TEXT;

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "unit" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "name" TEXT;

-- AddForeignKey
ALTER TABLE "ClientProfile" ADD CONSTRAINT "ClientProfile_assignedTrainerProfileId_fkey" FOREIGN KEY ("assignedTrainerProfileId") REFERENCES "TrainerProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
