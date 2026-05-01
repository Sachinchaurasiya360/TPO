-- CreateEnum
CREATE TYPE "BroadcastStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'PARTIAL', 'FAILED');

-- CreateEnum
CREATE TYPE "BroadcastType" AS ENUM ('JOB_POSTED', 'EVENT_CREATED', 'ACCOUNT_APPROVED', 'ALUMNI_INVITE', 'CUSTOM');

-- CreateTable
CREATE TABLE "BroadcastJob" (
    "id" TEXT NOT NULL,
    "type" "BroadcastType" NOT NULL,
    "subject" TEXT NOT NULL,
    "htmlBody" TEXT NOT NULL,
    "recipientIds" INTEGER[],
    "status" "BroadcastStatus" NOT NULL DEFAULT 'PENDING',
    "totalCount" INTEGER NOT NULL,
    "sentCount" INTEGER NOT NULL DEFAULT 0,
    "failedCount" INTEGER NOT NULL DEFAULT 0,
    "failures" JSONB,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 3,
    "lastError" TEXT,
    "createdById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "BroadcastJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BroadcastJob_status_idx" ON "BroadcastJob"("status");

-- CreateIndex
CREATE INDEX "BroadcastJob_createdAt_idx" ON "BroadcastJob"("createdAt");
