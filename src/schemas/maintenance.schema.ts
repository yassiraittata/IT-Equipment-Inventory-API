import { z } from "zod";

const maintenanceStatus = z.enum([
  "open",
  "in_progress",
  "completed",
  "canceled",
]);

export const maintenanceSchema = z.object({
  equipment_id: z.uuid("Please enter a valid uuid"),
  description: z.string(),
  status: maintenanceStatus,
  cost: z.number().optional(),
  opened_at: z.string(),
  completed_at: z.string().optional(),
});
