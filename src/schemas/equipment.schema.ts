import { z } from "zod";

const statusEnum = z.enum(["in_stock", "in_use", "in_repair", "retired"]);

export const equipmentSchema = z.object({
  brand: z.string("Please enter a valid brand"),
  model: z.string("Please enter a valid bramodelnd"),
  category_id: z.uuid("Make sure to provide a valid uuid for category"),
  office_id: z.uuid("Make sure to provide a valid uuid for office"),
  status: statusEnum,
  purchase_date: z.string("Please enter a valid purchase date"),
});

export type equipmentDto = z.infer<typeof equipmentSchema>;
