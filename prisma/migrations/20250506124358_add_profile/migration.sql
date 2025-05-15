/*
  Warnings:

  - You are about to drop the column `userUuid` on the `Brand` table. All the data in the column will be lost.
  - Added the required column `profileUuid` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Brand" DROP CONSTRAINT "Brand_userUuid_fkey";

-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "userUuid",
ADD COLUMN     "profileUuid" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "avatar" TEXT,
    "userUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userUuid_key" ON "Profile"("userUuid");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_profileUuid_fkey" FOREIGN KEY ("profileUuid") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
