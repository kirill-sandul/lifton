/*
  Warnings:

  - Added the required column `goal` to the `ClientProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('STRENGTH', 'MUSCLES', 'FATLOSS');

-- AlterTable
ALTER TABLE "ClientProfile" DROP COLUMN "goal",
ADD COLUMN     "goal" "Goal" NOT NULL;
