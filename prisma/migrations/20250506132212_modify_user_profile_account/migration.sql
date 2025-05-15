/*
  Warnings:

  - You are about to drop the column `userUuid` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `userUuid` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `userUuid` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userUuid_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userUuid_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userUuid_fkey";

-- DropIndex
DROP INDEX "Profile_userUuid_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "userUuid",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "userUuid",
ADD COLUMN     "mobile" TEXT,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "userUuid",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
