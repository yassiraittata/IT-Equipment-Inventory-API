import { RequestHandler } from "express";
import { officeDto } from "../schemas/office.schema.js";
import prisma from "../config/db.js";
import { ok } from "../lib/appError.js";

export const getAllOffices: RequestHandler<
  unknown,
  unknown,
  unknown,
  { page: string }
> = async (req, res, next) => {
  const { page } = req.query;
  const take = 10;
  const skip = (+page - 1) * take;

  const offices = await prisma.office.findMany({
    take,
    skip,
  });

  res.status(200).json(ok(offices));
};

export const getSingleOffice: RequestHandler<{ id: string }> = (
  req,
  res,
  next,
) => {};

export const createOffice: RequestHandler<unknown, unknown, officeDto> = (
  req,
  res,
  next,
) => {};

export const updateOffice: RequestHandler<{ id: string }> = (
  req,
  res,
  next,
) => {};

export const deleteOffice: RequestHandler<{ id: string }> = (
  req,
  res,
  next,
) => {};
