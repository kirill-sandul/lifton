/*
  Warnings:

  - Added the required column `skipped` to the `ExerciseSetRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExerciseSetRecord" ADD COLUMN     "skipped" BOOLEAN NOT NULL;
