/*
  Warnings:

  - You are about to drop the column `trainingPlanId` on the `ClientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `trainingPlanId` on the `Target` table. All the data in the column will be lost.
  - You are about to drop the column `trainingPlanId` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the `TrainingPlan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClientProfile" DROP CONSTRAINT "ClientProfile_trainingPlanId_fkey";

-- DropForeignKey
ALTER TABLE "Target" DROP CONSTRAINT "Target_trainingPlanId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_trainingPlanId_fkey";

-- AlterTable
ALTER TABLE "ClientProfile" DROP COLUMN "trainingPlanId",
ADD COLUMN     "trainingProgramId" TEXT;

-- AlterTable
ALTER TABLE "Target" DROP COLUMN "trainingPlanId",
ADD COLUMN     "trainingProgramId" TEXT;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "trainingPlanId",
ADD COLUMN     "trainingProgramId" TEXT;

-- DropTable
DROP TABLE "TrainingPlan";

-- CreateTable
CREATE TABLE "TrainingProgram" (
    "id" TEXT NOT NULL,
    "cycle" "Cycle" NOT NULL DEFAULT 'WEEK',

    CONSTRAINT "TrainingProgram_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClientProfile" ADD CONSTRAINT "ClientProfile_trainingProgramId_fkey" FOREIGN KEY ("trainingProgramId") REFERENCES "TrainingProgram"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_trainingProgramId_fkey" FOREIGN KEY ("trainingProgramId") REFERENCES "TrainingProgram"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Target" ADD CONSTRAINT "Target_trainingProgramId_fkey" FOREIGN KEY ("trainingProgramId") REFERENCES "TrainingProgram"("id") ON DELETE SET NULL ON UPDATE CASCADE;
