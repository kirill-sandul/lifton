/*
  Warnings:

  - Added the required column `trainerAuthorId` to the `TrainingProgram` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrainingProgram" ADD COLUMN     "trainerAuthorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TrainingProgram" ADD CONSTRAINT "TrainingProgram_trainerAuthorId_fkey" FOREIGN KEY ("trainerAuthorId") REFERENCES "TrainerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
