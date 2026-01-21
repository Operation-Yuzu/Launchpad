-- DropForeignKey
ALTER TABLE "Theme" DROP CONSTRAINT "Theme_ownerId_fkey";

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
