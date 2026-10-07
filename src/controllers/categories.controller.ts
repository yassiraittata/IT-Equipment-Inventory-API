import { RequestHandler } from "express";

import prisma from "../config/db.js";

import { categoryDto } from "../schemas/category.schema.js";
import { AppError, ok } from "../lib/appError.js";

export const listCategories: RequestHandler<
  unknown,
  unknown,
  unknown,
  { page: string }
> = async (req, res, next) => {
  const { page } = req.query;
  const take = 10;
  const skip = ((+page || 1) - 1) * take;

  const data = await prisma.category.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });

  res.status(200).json(ok(data));
};

export const getCategory: RequestHandler<{ id: string }> = async (
  req,
  res,
  next,
) => {
  const { id } = req.params;

  const category = await prisma.category.findFirst({
    where: { id },
  });

  if (!category) {
    return next(new AppError("No category eas found", 404));
  }

  res.status(200).json(ok(category));
};

export const createCatrgory: RequestHandler<
  unknown,
  unknown,
  categoryDto
> = async (req, res, next) => {
  const { name } = req.body;

  const category = await prisma.category.create({ data: { name } });

  res.status(201).json(ok(category));
};

// export const createCatrgoryMany: RequestHandler<
//   unknown,
//   unknown,
//   categoryDto[]
// > = async (req, res, next) => {
//   const body = req.body;

//   const data = await prisma.category.createMany({ data: body });

//   res.status(201).json(ok(data));
// };

export const updateCatrgory: RequestHandler<
  { id: string },
  unknown,
  categoryDto
> = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const cat = await prisma.category.findUnique({ where: { id } });

  if (!cat) {
    return next(new AppError("category was not found!", 404));
  }

  const category = await prisma.category.update({
    where: { id },
    data: { name },
  });

  res.status(201).json(ok(category));
};

export const deleteCatrgory: RequestHandler<{ id: string }> = async (
  req,
  res,
  next,
) => {
  const { id } = req.params;

  const cat = await prisma.category.findUnique({ where: { id } });

  if (!cat) {
    return next(new AppError("category was not found!", 404));
  }

  await prisma.category.delete({
    where: { id },
  });

  res.status(201).json(ok({ message: "deleted succesfully" }));
};
