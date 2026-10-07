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

export const createCatrgory: RequestHandler = (req, res, next) => {};
export const updateCatrgory: RequestHandler = (req, res, next) => {};
export const deleteCatrgory: RequestHandler = (req, res, next) => {};
