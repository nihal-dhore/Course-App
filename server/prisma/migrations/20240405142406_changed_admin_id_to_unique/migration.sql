/*
  Warnings:

  - A unique constraint covering the columns `[adminId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Course_adminId_key" ON "Course"("adminId");
