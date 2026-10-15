import { z } from "zod";

export const paramsSchema = z.object({
  id: z.uuid("Make sure to provide a valid uuid"),
});
