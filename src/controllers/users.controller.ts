import { RequestHandler } from "express";
import * as argon from "argon2";

import { loginDto, userDto } from "../schemas/user.schema.js";
import prisma from "../config/db.js";
import { AppError, ok } from "../lib/appError.js";
import { createTokensAndSetCookies } from "../utils/tokens.js";

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
      role: true,
      createdAt: true,
      updatedAt: true,
      office: true,
    },
  });

  res.status(201).json(ok(newUser));
};

export const login: RequestHandler<unknown, unknown, loginDto> = async (
  req,
  res,
) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("User was not found!", 404);
  }

  const isPwMatch = await argon.verify(user.password, password);

  if (!isPwMatch) {
    throw new AppError("Icorrect credentials", 404);
  }

  createTokensAndSetCookies({ userId: user.id }, res);

  res.status(200).json(
    ok({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        office_id: user.office_id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    }),
  );
};

export const getEmpoloyees: RequestHandler<
  unknown,
  unknown,
  unknown,
  { page: string }
> = async (req, res) => {
  const page = req.query.page || 1;
  const take = 10;
  const skip = (+page - 1) * take;

  const employees = await prisma.user.findMany({
    take,
    skip,
  });

  res.status(200).json(ok(employees));
};

export const getSingleEmpoloyee: RequestHandler<{ id: string }> = async (
  req,
  res,
) => {
  const { id } = req.params;

  const empoloyee = await prisma.user.findUnique({ where: { id } });

  if (!empoloyee) {
    throw new AppError("Empoloyee was not found!", 404);
  }

  res.status(200).json(ok(empoloyee));
};
