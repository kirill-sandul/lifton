/*
  Warnings:

  - A unique constraint covering the columns `[usernameCanonical]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT,
ADD COLUMN     "usernameCanonical" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_usernameCanonical_key" ON "User"("usernameCanonical");
