/*
  Warnings:

  - Added the required column `department` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Department" AS ENUM ('CSE', 'COMPUTER', 'ELECTRICAL', 'MECHANICAL', 'EXTC', 'CIVIL');

-- DropForeignKey
ALTER TABLE "public"."Pastorg" DROP CONSTRAINT "Pastorg_alumniId_fkey";

-- DropIndex
DROP INDEX "public"."User_emailId_idx";

-- DropIndex
DROP INDEX "public"."User_studentId_idx";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "parentsContactNo" INTEGER,
DROP COLUMN "department",
ADD COLUMN     "department" "Department" NOT NULL;

-- CreateIndex
CREATE INDEX "User_department_idx" ON "User"("department");

-- CreateIndex
CREATE INDEX "User_fullName_idx" ON "User"("fullName");

-- AddForeignKey
ALTER TABLE "Pastorg" ADD CONSTRAINT "Pastorg_alumniId_fkey" FOREIGN KEY ("alumniId") REFERENCES "Alumni"("id") ON DELETE CASCADE ON UPDATE CASCADE;
