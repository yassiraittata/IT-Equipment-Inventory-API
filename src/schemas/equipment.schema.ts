import { z } from "zod";

const statusEnum = z.enum(["in_stock", "in_use", "in_repair", "retired"]);

export const equipmentSchema = z.object({
  brand: z.string(),
  model: z.string(),
  category_id: z.string(),
  office_id: z.string(),
  status: statusEnum,
  purchase_date: z.date(),
});

export type equipmentDto = z.infer<typeof equipmentSchema>;
