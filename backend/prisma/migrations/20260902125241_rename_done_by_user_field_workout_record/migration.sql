/*
  Warnings:

  - You are about to drop the column `doneByUserId` on the `WorkoutRecord` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkoutRecord" DROP CONSTRAINT "WorkoutRecord_doneByUserId_fkey";

-- AlterTable
ALTER TABLE "WorkoutRecord" DROP COLUMN "doneByUserId",
ADD COLUMN     "doneByClientId" TEXT;

-- AddForeignKey
ALTER TABLE "WorkoutRecord" ADD CONSTRAINT "WorkoutRecord_doneByClientId_fkey" FOREIGN KEY ("doneByClientId") REFERENCES "ClientProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
