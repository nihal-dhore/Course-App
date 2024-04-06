/*
  Warnings:

  - You are about to drop the column `profilePicture` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "profilePicture";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilePicture";
