/*
  Warnings:

  - Added the required column `createdById` to the `AptitudeTest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('IN_PROGRESS', 'SUBMITTED', 'REVIEWED');

-- AlterEnum
ALTER TYPE "TestStatus" ADD VALUE 'ARCHIVED';

-- AlterTable
ALTER TABLE "AptitudeTest" ADD COLUMN     "createdById" INTEGER NOT NULL,
ADD COLUMN     "department" "Department",
ADD COLUMN     "eligibleYears" "AcademicYear"[],
ADD COLUMN     "isHomework" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "TestSubmission" (
    "id" TEXT NOT NULL,
    "testId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "attemptNumber" INTEGER NOT NULL DEFAULT 1,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submittedAt" TIMESTAMP(3),
    "answers" JSONB NOT NULL,
    "autoScore" INTEGER,
    "finalScore" INTEGER,
    "tabSwitchCount" INTEGER NOT NULL DEFAULT 0,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "reviewedById" INTEGER,
    "reviewedAt" TIMESTAMP(3),
    "facultyRemarks" TEXT,

    CONSTRAINT "TestSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TestSubmission_studentId_idx" ON "TestSubmission"("studentId");

-- CreateIndex
CREATE INDEX "TestSubmission_testId_idx" ON "TestSubmission"("testId");

-- CreateIndex
CREATE INDEX "TestSubmission_status_idx" ON "TestSubmission"("status");

-- CreateIndex
CREATE UNIQUE INDEX "TestSubmission_testId_studentId_attemptNumber_key" ON "TestSubmission"("testId", "studentId", "attemptNumber");

-- CreateIndex
CREATE INDEX "AptitudeTest_status_idx" ON "AptitudeTest"("status");

-- CreateIndex
CREATE INDEX "AptitudeTest_createdById_idx" ON "AptitudeTest"("createdById");

-- AddForeignKey
ALTER TABLE "AptitudeTest" ADD CONSTRAINT "AptitudeTest_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestSubmission" ADD CONSTRAINT "TestSubmission_testId_fkey" FOREIGN KEY ("testId") REFERENCES "AptitudeTest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestSubmission" ADD CONSTRAINT "TestSubmission_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestSubmission" ADD CONSTRAINT "TestSubmission_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
