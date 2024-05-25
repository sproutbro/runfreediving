/*
  Warnings:

  - You are about to drop the column `userId` on the `SecretPost` table. All the data in the column will be lost.
  - Added the required column `userName` to the `SecretPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SecretPost" DROP COLUMN "userId",
ADD COLUMN     "isSecret" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userName" TEXT NOT NULL;
