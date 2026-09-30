/*
  Warnings:

  - You are about to drop the column `todoListId` on the `TrainerProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[trainerProfileId]` on the table `TrainerTodoList` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TrainerProfile" DROP CONSTRAINT "TrainerProfile_todoListId_fkey";

-- DropIndex
DROP INDEX "TrainerProfile_todoListId_key";

-- AlterTable
ALTER TABLE "TrainerProfile" DROP COLUMN "todoListId";

-- AlterTable
ALTER TABLE "TrainerTodoList" ADD COLUMN     "trainerProfileId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "TrainerTodoList_trainerProfileId_key" ON "TrainerTodoList"("trainerProfileId");

-- AddForeignKey
ALTER TABLE "TrainerTodoList" ADD CONSTRAINT "TrainerTodoList_trainerProfileId_fkey" FOREIGN KEY ("trainerProfileId") REFERENCES "TrainerProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
