-- AlterEnum
ALTER TYPE "InviteStatus" ADD VALUE 'PENDING';

-- AlterTable
ALTER TABLE "Invite" ALTER COLUMN "status" SET DEFAULT 'PENDING';
