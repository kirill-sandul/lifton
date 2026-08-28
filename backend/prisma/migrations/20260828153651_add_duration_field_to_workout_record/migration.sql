/*
  Warnings:

  - Added the required column `durationSec` to the `WorkoutRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutRecord" ADD COLUMN     "durationSec" INTEGER NOT NULL;
