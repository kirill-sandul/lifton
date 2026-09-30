/*
  Warnings:

  - You are about to drop the column `trainerProfileId` on the `TrainerTodoItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[todoListId]` on the table `TrainerProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TrainerTodoItem" DROP CONSTRAINT "TrainerTodoItem_trainerProfileId_fkey";

-- AlterTable
ALTER TABLE "TrainerProfile" ADD COLUMN     "todoListId" TEXT;

-- AlterTable
ALTER TABLE "TrainerTodoItem" DROP COLUMN "trainerProfileId",
ADD COLUMN     "trainerTodoListId" TEXT;

-- CreateTable
CREATE TABLE "TrainerTodoList" (
    "id" TEXT NOT NULL,

    CONSTRAINT "TrainerTodoList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrainerProfile_todoListId_key" ON "TrainerProfile"("todoListId");

-- AddForeignKey
ALTER TABLE "TrainerProfile" ADD CONSTRAINT "TrainerProfile_todoListId_fkey" FOREIGN KEY ("todoListId") REFERENCES "TrainerTodoList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerTodoItem" ADD CONSTRAINT "TrainerTodoItem_trainerTodoListId_fkey" FOREIGN KEY ("trainerTodoListId") REFERENCES "TrainerTodoList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
