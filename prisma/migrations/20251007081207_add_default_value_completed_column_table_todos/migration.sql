/*
  Warnings:

  - The primary key for the `todos` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "todos" DROP CONSTRAINT "todos_pkey",
ALTER COLUMN "completed" SET DEFAULT false,
ADD CONSTRAINT "todos_pkey" PRIMARY KEY ("id");
