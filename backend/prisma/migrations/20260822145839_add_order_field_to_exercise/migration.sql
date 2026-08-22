/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "order" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_order_key" ON "Exercise"("order");
