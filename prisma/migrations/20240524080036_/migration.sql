/*
  Warnings:

  - Added the required column `userId` to the `SecretPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SecretPost" ADD COLUMN     "userId" TEXT NOT NULL;
