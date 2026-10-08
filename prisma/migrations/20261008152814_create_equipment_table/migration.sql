-- CreateEnum
CREATE TYPE "Status" AS ENUM ('in_stock', 'in_use', 'in_repair', 'retired');

-- CreateTable
CREATE TABLE "Equipment" (
    "id" UUID NOT NULL,
    "serial_number" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "category_id" UUID NOT NULL,
    "office_id" UUID NOT NULL,
    "status" "Status" NOT NULL,
    "purchase_date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_serial_number_key" ON "Equipment"("serial_number");

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_office_id_fkey" FOREIGN KEY ("office_id") REFERENCES "Office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
