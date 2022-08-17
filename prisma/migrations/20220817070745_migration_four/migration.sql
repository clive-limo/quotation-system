/*
  Warnings:

  - You are about to drop the column `dateApproved` on the `Quotation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quotation" DROP COLUMN "dateApproved",
ADD COLUMN     "quoteStatus" BOOLEAN NOT NULL DEFAULT false;
