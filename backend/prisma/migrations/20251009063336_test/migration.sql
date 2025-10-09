-- CreateEnum
CREATE TYPE "public"."UserAcademicYear" AS ENUM ('FIRST_YEAR', 'SECOND_YEAR', 'THIRD_YEAR', 'FOURTH_YEAR');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('STUDENT', 'ALUMNI', 'FACULTY', 'AMBASSADOR', 'SUPERADMIN', 'HOD', 'PROFESSOR');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "legalName" TEXT,
    "contactNo" TEXT,
    "emailId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "studentId" TEXT,
    "sscPercentage" DOUBLE PRECISION,
    "hscPercentage" DOUBLE PRECISION,
    "department" TEXT,
    "academicYear" "public"."UserAcademicYear",
    "skills" TEXT[],
    "profilePic" TEXT,
    "resumeUrl" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "socialProfile" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cgpa" (
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
CREATE TABLE "public"."Internship" (
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
CREATE TABLE "public"."Achievement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "certificateUrl" TEXT NOT NULL,
    "achievementTime" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "public"."Role" NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Alumni" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "placedBy" TEXT NOT NULL,
    "currentOrg" TEXT NOT NULL,
    "package" TEXT NOT NULL,

    CONSTRAINT "Alumni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pastorg" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "joiningDate" TIMESTAMP(3) NOT NULL,
    "leavingDate" TIMESTAMP(3),
    "role" TEXT NOT NULL,
    "alumniId" INTEGER NOT NULL,

    CONSTRAINT "Pastorg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HigherStudies" (
    "id" SERIAL NOT NULL,
    "collegeName" TEXT NOT NULL,
    "joiningDate" TIMESTAMP(3) NOT NULL,
    "leavingDate" TIMESTAMP(3),
    "location" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "alumniId" INTEGER NOT NULL,

    CONSTRAINT "HigherStudies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailId_key" ON "public"."User"("emailId");

-- CreateIndex
CREATE INDEX "User_emailId_idx" ON "public"."User"("emailId");

-- CreateIndex
CREATE INDEX "User_studentId_idx" ON "public"."User"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Cgpa_id_key" ON "public"."Cgpa"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Cgpa_UserId_key" ON "public"."Cgpa"("UserId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_emailId_key" ON "public"."Admin"("emailId");

-- CreateIndex
CREATE INDEX "Admin_emailId_idx" ON "public"."Admin"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "Alumni_userId_key" ON "public"."Alumni"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HigherStudies_alumniId_key" ON "public"."HigherStudies"("alumniId");

-- AddForeignKey
ALTER TABLE "public"."Cgpa" ADD CONSTRAINT "Cgpa_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Internship" ADD CONSTRAINT "Internship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Achievement" ADD CONSTRAINT "Achievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Alumni" ADD CONSTRAINT "Alumni_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pastorg" ADD CONSTRAINT "Pastorg_alumniId_fkey" FOREIGN KEY ("alumniId") REFERENCES "public"."Alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HigherStudies" ADD CONSTRAINT "HigherStudies_alumniId_fkey" FOREIGN KEY ("alumniId") REFERENCES "public"."Alumni"("id") ON DELETE CASCADE ON UPDATE CASCADE;
