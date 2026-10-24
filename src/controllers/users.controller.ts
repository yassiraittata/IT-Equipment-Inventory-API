import { RequestHandler } from "express";
import * as argon from "argon2";

import { userDto } from "../schemas/user.schema.js";
import prisma from "../config/db.js";
import { AppError, ok } from "../lib/appError.js";

export const createUser: RequestHandler<unknown, unknown, userDto> = async (
  req,
  res,
) => {
  const { email, name, password, office_id, role } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    throw new AppError("User already exists", 400);
  }

  const hash = await argon.hash(password);

  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: hash,
      office_id,
      role: role || "employee",
    },
    select: {
      id: true,
      name: true,
      email: true,
    //   password: false,
      role: true,
    //   office_id: true,
      createdAt: true,
      updatedAt: true,
      office: true,
    },
    // include: {
    //   office: true,
    // },
  });

  res.status(201).json(ok(newUser));
};
