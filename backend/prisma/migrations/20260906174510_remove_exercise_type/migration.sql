/*
  Warnings:

  - You are about to drop the column `exerciseTypeId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseTypeId` on the `Target` table. All the data in the column will be lost.
  - You are about to drop the `ExerciseType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_exerciseTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Target" DROP CONSTRAINT "Target_exerciseTypeId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "exerciseTypeId";

-- AlterTable
ALTER TABLE "Target" DROP COLUMN "exerciseTypeId";

-- DropTable
DROP TABLE "ExerciseType";

-- CreateTable
CREATE TABLE "_ExerciseToTarget" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ExerciseToTarget_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ExerciseToTarget_B_index" ON "_ExerciseToTarget"("B");

-- AddForeignKey
ALTER TABLE "_ExerciseToTarget" ADD CONSTRAINT "_ExerciseToTarget_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToTarget" ADD CONSTRAINT "_ExerciseToTarget_B_fkey" FOREIGN KEY ("B") REFERENCES "Target"("id") ON DELETE CASCADE ON UPDATE CASCADE;
