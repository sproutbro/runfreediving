-- CreateTable
CREATE TABLE "SecretPost" (
    "id" SERIAL NOT NULL,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authorEmail" TEXT NOT NULL,
    "parentCommentId" INTEGER,

    CONSTRAINT "SecretPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SecretPost" ADD CONSTRAINT "SecretPost_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "SecretPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;
