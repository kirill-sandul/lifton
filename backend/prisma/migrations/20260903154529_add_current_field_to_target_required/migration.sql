/*
  Warnings:

  - Made the column `currentValue` on table `Target` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Target" ALTER COLUMN "currentValue" SET NOT NULL;
