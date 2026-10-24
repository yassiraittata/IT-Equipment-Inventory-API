import { z } from "zod";

export const userSchema = z.object({
  name: z.string().nonempty("Name is mandatory!"),
  email: z.string().nonempty("email is mandatory!"),
  password: z.string("password is mandatory!"),
  office_id: z.string("office is mandatory!"),
  role: z
    .enum(["admin", "employee"], {
      error: "Role must be either (admin) or (employee)",
    })
    .optional(),
});

export type officeDto = z.infer<typeof userSchema>;
