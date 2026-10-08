import { z } from "zod";

export const officeSchema = z.object({
  name: z.string().nonempty("Name is mandatory!"),
  building: z.string().nonempty("Name is mandatory!"),
  floor: z.coerce.number("Name is mandatory!"),
});

export type officeDto = z.infer<typeof officeSchema>;
