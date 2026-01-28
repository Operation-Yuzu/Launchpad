/*
  Warnings:

  - Added the required column `expiry_date` to the `GoogleToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GoogleToken" ADD COLUMN     "expiry_date" TIMESTAMP(3) NOT NULL;
