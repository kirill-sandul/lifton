-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('INVITE_SENT', 'INVITE_ACCEPTED', 'INVITE_DENIED', 'PROGRAM_ASSIGNED');

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "doneByUserId" TEXT;

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "data" JSONB,
    "fromUserId" TEXT,
    "toUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Notification_toUserId_idx" ON "Notification"("toUserId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_doneByUserId_fkey" FOREIGN KEY ("doneByUserId") REFERENCES "ClientProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
