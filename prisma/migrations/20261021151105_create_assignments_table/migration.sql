-- CreateTable
CREATE TABLE "Assignments" (
    "id" UUID NOT NULL,
    "equipment_id" UUID NOT NULL,
    "assigned_to" UUID NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL,
    "returned_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assignments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "Assignments_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "Assignments_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
