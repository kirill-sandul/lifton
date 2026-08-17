/*
  Warnings:

  - You are about to drop the column `data` on the `Notification` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "NotificationActions" AS ENUM ('ACCEPT', 'DECLINE', 'ARCHIVE', 'SEE_PROFILE');

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "data",
ADD COLUMN     "actions" "NotificationActions"[];
