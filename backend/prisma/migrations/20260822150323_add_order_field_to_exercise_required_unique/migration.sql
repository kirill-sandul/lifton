/*
  Warnings:

  - A unique constraint covering the columns `[workoutId,order]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.
  - Made the column `order` on table `Exercise` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "order" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_workoutId_order_key" ON "Exercise"("workoutId", "order");
