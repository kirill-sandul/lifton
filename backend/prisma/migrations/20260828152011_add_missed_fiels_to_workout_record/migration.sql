/*
  Warnings:

  - You are about to drop the column `skipped` on the `WorkoutRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkoutRecord" DROP COLUMN "skipped",
ADD COLUMN     "missed" BOOLEAN,
ADD COLUMN     "missedReason" TEXT;
