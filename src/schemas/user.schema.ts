import { z } from "zod";

export const userSchema = z.object({
  name: z.string("Name is mandatory!").nonempty(""),
  email: z.email("Please enter a valid email format").nonempty(),
  password: z.string("password is mandatory!").nonempty(),
  office_id: z.uuid("office is mandatory!").nonempty(),
  role: z
    .enum(["admin", "employee"], {
      error: "Role must be either (admin) or (employee)",
    })
    .optional()
    .default("employee"),
});

export const updateUserSchema = z.object({
  name: z.string("Name is mandatory!").optional(),
  email: z.email("Please enter a valid email format").optional(),
  password: z.string("password is mandatory!").optional(),
  office_id: z.uuid("office is mandatory!").optional(),
  role: z
    .enum(["admin", "employee"], {
      error: "Role must be either (admin) or (employee)",
    })
    .optional(),
});

export const loginSchema = z.object({
  email: z.email("Please enter a valid email format").nonempty(),
  password: z.string("password is mandatory!").nonempty(),
});

export type userDto = z.infer<typeof userSchema>;
export type updateUserDto = z.infer<typeof updateUserSchema>;
export type loginDto = z.infer<typeof loginSchema>;
