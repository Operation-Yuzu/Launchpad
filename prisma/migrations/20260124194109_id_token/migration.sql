/*
  Warnings:

  - You are about to drop the column `token` on the `GoogleToken` table. All the data in the column will be lost.
  - Added the required column `access_token` to the `GoogleToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_token` to the `GoogleToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GoogleToken" DROP COLUMN "token",
ADD COLUMN     "access_token" TEXT NOT NULL,
ADD COLUMN     "id_token" TEXT NOT NULL;
