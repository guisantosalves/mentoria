/*
  Warnings:

  - Changed the type of `mentor` on the `Mentoria` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Mentoria" DROP COLUMN "mentor",
ADD COLUMN     "mentor" INTEGER NOT NULL;
