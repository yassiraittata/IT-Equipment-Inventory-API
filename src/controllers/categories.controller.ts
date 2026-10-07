import { RequestHandler } from "express";

import prisma from "../config/db.js";

import { categoryDto } from "../schemas/category.schema.js";
import { ok } from "../lib/appError.js";

export const listCategories: RequestHandler<
  unknown,
  unknown,
  unknown,
  { page: string }
> = (req, res, next) => {
  const { page } = req.query;
  const take = 10;
  const skip = ((+page || 1) - 1) * take;

  const data = prisma.category.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });

  res.status(200).json(ok(data));
};

export const getCategory: RequestHandler = (req, res, next) => {};
export const createCatrgory: RequestHandler = (req, res, next) => {};
export const updateCatrgory: RequestHandler = (req, res, next) => {};
export const deleteCatrgory: RequestHandler = (req, res, next) => {};
