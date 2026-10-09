-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_office_id_fkey";

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_office_id_fkey" FOREIGN KEY ("office_id") REFERENCES "Office"("id") ON DELETE SET NULL ON UPDATE CASCADE;
