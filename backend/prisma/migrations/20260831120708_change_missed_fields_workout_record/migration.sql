/*
  Warnings:

  - You are about to drop the column `missed` on the `WorkoutRecord` table. All the data in the column will be lost.
  - You are about to drop the column `missedReason` on the `WorkoutRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "clientProfileId" TEXT;

-- AlterTable
ALTER TABLE "WorkoutRecord" DROP COLUMN "missed",
DROP COLUMN "missedReason",
ADD COLUMN     "skipReason" TEXT,
ADD COLUMN     "skipped" BOOLEAN;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_clientProfileId_fkey" FOREIGN KEY ("clientProfileId") REFERENCES "ClientProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
