/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `Target` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Target" DROP CONSTRAINT "Target_exerciseId_fkey";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "exerciseTypeId" TEXT;

-- AlterTable
ALTER TABLE "Target" DROP COLUMN "exerciseId",
ADD COLUMN     "exerciseTypeId" TEXT;

-- CreateTable
CREATE TABLE "ExerciseType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" "ExerciseUnit" NOT NULL,

    CONSTRAINT "ExerciseType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_exerciseTypeId_fkey" FOREIGN KEY ("exerciseTypeId") REFERENCES "ExerciseType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Target" ADD CONSTRAINT "Target_exerciseTypeId_fkey" FOREIGN KEY ("exerciseTypeId") REFERENCES "ExerciseType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
