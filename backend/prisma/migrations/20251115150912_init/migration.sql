-- CreateEnum
CREATE TYPE "UserAcademicYear" AS ENUM ('FIRST_YEAR', 'SECOND_YEAR', 'THIRD_YEAR', 'FOURTH_YEAR');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('CSE', 'COMPUTER', 'ELECTRICAL', 'MECHANICAL', 'EXTC', 'CIVIL');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'ALUMNI', 'FACULTY', 'AMBASSADOR', 'SUPERADMIN', 'HOD', 'PROFESSOR');

-- CreateEnum
CREATE TYPE "TestCategory" AS ENUM ('APTITUDE', 'TECHNICAL', 'CODING', 'PERSONALITY');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "legalName" TEXT,
    "contactNo" TEXT,
    "emailId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "TotalCgpa" DOUBLE PRECISION DEFAULT 0,
    "parentsContactNo" INTEGER,
    "studentId" TEXT,
    "sscPercentage" DOUBLE PRECISION,
    "hscPercentage" DOUBLE PRECISION,
    "department" "Department" NOT NULL,
    "academicYear" "UserAcademicYear",
    "userSession" TEXT,
    "skills" TEXT[],
    "profilePic" TEXT,
    "resumeUrl" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "socialProfile" TEXT,
    "isAlumni" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cgpa" (
    "id" TEXT NOT NULL,
    "UserId" INTEGER NOT NULL,
    "sem1" DOUBLE PRECISION,
    "sem2" DOUBLE PRECISION,
    "sem3" DOUBLE PRECISION,
    "sem4" DOUBLE PRECISION,
    "sem5" DOUBLE PRECISION,
    "sem6" DOUBLE PRECISION,
    "sem7" DOUBLE PRECISION,
    "sem8" DOUBLE PRECISION
);

-- CreateTable
CREATE TABLE "Internship" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT,
    "companyName" TEXT,
    "roleDescription" TEXT NOT NULL,
    "duration" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "certificateUrl" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Internship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "certificateUrl" TEXT NOT NULL,
    "achievementTime" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alumni" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "placedBy" TEXT NOT NULL,
    "currentOrg" TEXT NOT NULL,
    "package" TEXT NOT NULL,

    CONSTRAINT "Alumni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pastorg" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "joiningDate" TIMESTAMP(3) NOT NULL,
    "leavingDate" TIMESTAMP(3),
    "role" TEXT NOT NULL,
    "alumniId" INTEGER NOT NULL,

    CONSTRAINT "Pastorg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HigherStudies" (
    "id" SERIAL NOT NULL,
    "collegeName" TEXT NOT NULL,
    "joiningDate" TIMESTAMP(3) NOT NULL,
    "leavingDate" TIMESTAMP(3),
    "location" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "alumniId" INTEGER NOT NULL,

    CONSTRAINT "HigherStudies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AptitudeTest" (
    "testNo" SERIAL NOT NULL,
    "CreatedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'DRAFT',
    "rules" TEXT[],
    "totalTestTime" INTEGER NOT NULL,
    "NoOfTimesUserTabSwitch" INTEGER NOT NULL,
    "totalMarks" INTEGER NOT NULL,
    "minimumMarks" INTEGER NOT NULL,
    "higestMarksScoreBy" INTEGER NOT NULL,
    "allowedAttempts" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "category" "TestCategory" NOT NULL,

    CONSTRAINT "AptitudeTest_pkey" PRIMARY KEY ("testNo")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "option1" TEXT NOT NULL,
    "option2" TEXT,
    "option3" TEXT,
    "option4" TEXT,
    "correctOption" TEXT NOT NULL,
    "marks" INTEGER NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailId_key" ON "User"("emailId");

-- CreateIndex
CREATE INDEX "User_department_idx" ON "User"("department");

-- CreateIndex
CREATE INDEX "User_fullName_idx" ON "User"("fullName");

-- CreateIndex
CREATE UNIQUE INDEX "Cgpa_id_key" ON "Cgpa"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Cgpa_UserId_key" ON "Cgpa"("UserId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_emailId_key" ON "Admin"("emailId");

-- CreateIndex
CREATE INDEX "Admin_emailId_idx" ON "Admin"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "Alumni_userId_key" ON "Alumni"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HigherStudies_alumniId_key" ON "HigherStudies"("alumniId");

-- AddForeignKey
ALTER TABLE "Cgpa" ADD CONSTRAINT "Cgpa_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Internship" ADD CONSTRAINT "Internship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alumni" ADD CONSTRAINT "Alumni_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pastorg" ADD CONSTRAINT "Pastorg_alumniId_fkey" FOREIGN KEY ("alumniId") REFERENCES "Alumni"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HigherStudies" ADD CONSTRAINT "HigherStudies_alumniId_fkey" FOREIGN KEY ("alumniId") REFERENCES "Alumni"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_id_fkey" FOREIGN KEY ("id") REFERENCES "AptitudeTest"("testNo") ON DELETE CASCADE ON UPDATE CASCADE;
