-- CreateEnum
CREATE TYPE "public"."UserAcademicYear" AS ENUM ('Y2022_26', 'Y2023_27', 'Y2024_28', 'Y2025_29', 'Y2026_30', 'Y2027_31');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "legalName" TEXT,
    "contactNo" TEXT,
    "emailId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cgpa" DOUBLE PRECISION,
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
CREATE TABLE "public"."Internship" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "companyName" TEXT,
    "duration" TEXT,
    "studentId" TEXT,

    CONSTRAINT "Internship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Achievement" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "details" TEXT,
    "time" TIMESTAMP(3),
    "studentId" TEXT NOT NULL,

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
    "placedBy" TEXT NOT NULL,
    "pastOrg" TEXT[],
    "currentOrg" TEXT[],
    "package" TEXT NOT NULL,

    CONSTRAINT "Alumni_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailId_key" ON "public"."User"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_emailId_key" ON "public"."Admin"("emailId");

-- AddForeignKey
ALTER TABLE "public"."Internship" ADD CONSTRAINT "Internship_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Achievement" ADD CONSTRAINT "Achievement_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Alumni" ADD CONSTRAINT "Alumni_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
