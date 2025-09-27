/*
  Warnings:

  - You are about to drop the column `time` on the `Achievement` table. All the data in the column will be lost.
  - Added the required column `certificateUrl` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Achievement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Achievement" DROP COLUMN "time",
ADD COLUMN     "AchievementTime" TEXT,
ADD COLUMN     "certificateUrl" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
