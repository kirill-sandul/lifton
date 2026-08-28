/*
  Warnings:

  - A unique constraint covering the columns `[exerciseId,index]` on the table `ExerciseSet` will be added. If there are existing duplicate values, this will fail.
  - Made the column `index` on table `ExerciseSet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ExerciseSet" ALTER COLUMN "index" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseSet_exerciseId_index_key" ON "ExerciseSet"("exerciseId", "index");
