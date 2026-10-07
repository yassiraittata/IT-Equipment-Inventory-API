import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().nonempty("name is mandatory"),
});

export type categoryDto = z.infer<typeof categorySchema>;
