-- CreateEnum
CREATE TYPE "public"."UserAcademicYear" AS ENUM ('FIRST_YEAR', 'SECOND_YEAR', 'THIRD_YEAR', 'FOURTH_YEAR');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "legalName" TEXT,
    "contactNo" TEXT,
    "emailId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
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
CREATE TABLE "public"."cgpa" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
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
    "studentId" TEXT NOT NULL,
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
    "studentId" TEXT NOT NULL,
    "details" TEXT,
    "time" TIMESTAMP(3),

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Alumni" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "placedBy" TEXT NOT NULL,
    "pastOrg" TEXT[],
    "currentOrg" TEXT NOT NULL,
    "package" TEXT NOT NULL,

    CONSTRAINT "Alumni_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailId_key" ON "public"."User"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "cgpa_id_key" ON "public"."cgpa"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_emailId_key" ON "public"."Admin"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "Alumni_studentId_key" ON "public"."Alumni"("studentId");

-- AddForeignKey
ALTER TABLE "public"."cgpa" ADD CONSTRAINT "cgpa_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("emailId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Internship" ADD CONSTRAINT "Internship_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("emailId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Achievement" ADD CONSTRAINT "Achievement_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("emailId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Alumni" ADD CONSTRAINT "Alumni_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("emailId") ON DELETE RESTRICT ON UPDATE CASCADE;
