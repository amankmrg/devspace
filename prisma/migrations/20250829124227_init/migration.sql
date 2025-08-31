-- AlterTable
ALTER TABLE "public"."Posts" ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "technology" TEXT,
    "img" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
