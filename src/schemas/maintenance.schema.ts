import { z } from "zod";

const maintenanceStatus = z.enum([
  "open",
  "in_progress",
  "completed",
  "canceled",
]);

export const maintenanceSchema = z.object({
  description: z.string("Please add a description"),
  status: maintenanceStatus.default("open"),
  cost: z.number().optional(),
  opened_at: z.string().optional(),
  completed_at: z.string().optional(),
});

export type maintenanceDto = z.infer<typeof maintenanceSchema>;
