import { z } from "zod";

export const officeSchema = z.object({
  name: z.string().nonempty("Name is mandatory!"),
  building: z.string().nonempty("building is mandatory!"),
  floor: z.coerce.number("floor is mandatory!"),
});

export type officeDto = z.infer<typeof officeSchema>;
