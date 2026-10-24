import { z } from "zod";

const maintenanceStatus = z.enum(
  ["open", "in_progress", "completed", "canceled"],
  {
    error: `Please enter: open, in_progress, completed or canceled for the status`,
  },
);

export const maintenanceSchema = z.object({
  description: z.string("Please add a description"),
  status: maintenanceStatus.default("open"),
  cost: z.number().optional(),
  opened_at: z.string().optional(),
  completed_at: z.string().optional(),
});

export const updateMaintenanceSchema = z.object({
  description: z.string().optional(),
  status: maintenanceStatus.optional(),
  cost: z.number().optional(),
  opened_at: z.string().optional(),
  completed_at: z.string().optional(),
});

export const completeMaintenanceSchema = z.object({
  cost: z.number().optional(),
  completed_at: z.string().optional(),
});

export type maintenanceDto = z.infer<typeof maintenanceSchema>;
export type updateMaintenanceDto = z.infer<typeof updateMaintenanceSchema>;
export type completeMaintenanceDto = z.infer<typeof completeMaintenanceSchema>;
