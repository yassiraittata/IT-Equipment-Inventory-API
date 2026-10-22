import { z } from "zod";

export const assignmentSchema = z.object({
  user_id: z.uuid("Make sure to provide a valid uuid"),
});

export type assignmentDto = z.infer<typeof assignmentSchema>;
