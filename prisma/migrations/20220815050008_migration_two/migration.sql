/*
  Warnings:

  - A unique constraint covering the columns `[customerEmail]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_customerEmail_key" ON "Customer"("customerEmail");
