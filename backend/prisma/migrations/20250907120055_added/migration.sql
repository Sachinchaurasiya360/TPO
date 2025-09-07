/*
  Warnings:

  - You are about to drop the column `cgpa` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Achievement" DROP CONSTRAINT "Achievement_studentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Internship" DROP CONSTRAINT "Internship_studentId_fkey";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "cgpa";

-- CreateTable
CREATE TABLE "public"."cgpa" (
    "id" TEXT NOT NULL,
    "sem1" DOUBLE PRECISION,
    "sem2" DOUBLE PRECISION,
    "sem3" DOUBLE PRECISION,
    "sem4" DOUBLE PRECISION,
    "sem5" DOUBLE PRECISION,
    "sem6" DOUBLE PRECISION,
    "sem7" DOUBLE PRECISION,
    "sem8" DOUBLE PRECISION
);

-- CreateIndex
CREATE UNIQUE INDEX "cgpa_id_key" ON "public"."cgpa"("id");

-- AddForeignKey
ALTER TABLE "public"."cgpa" ADD CONSTRAINT "cgpa_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Internship" ADD CONSTRAINT "Internship_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Achievement" ADD CONSTRAINT "Achievement_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
