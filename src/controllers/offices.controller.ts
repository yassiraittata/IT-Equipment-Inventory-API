import { RequestHandler } from "express";
import { officeDto } from "../schemas/office.schema.js";
import prisma from "../config/db.js";
import { AppError, ok } from "../lib/appError.js";

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

export const getSingleOffice: RequestHandler<{ id: string }> = async (
  req,
  res,
  next,
) => {
  const { id } = req.params;

  const office = await prisma.office.findUnique({ where: { id } });

  if (!office) {
    return next(new AppError("Office was not found!", 404));
  }

  res.status(200).json(ok(office));
};

export const createOffice: RequestHandler<unknown, unknown, officeDto> = async (
  req,
  res,
  next,
) => {
  const { floor, name, building } = req.body;

  const office = await prisma.office.create({
    data: {
      name,
      building,
      floor,
    },
  });
  res.status(200).json(ok(office));
};

export const updateOffice: RequestHandler<
  { id: string },
  unknown,
  officeDto
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { floor, name, building } = req.body;

    const office = await prisma.office.update({
      where: { id },
      data: {
        name,
        building,
        floor,
      },
    });
    res.status(200).json(ok(office));
  } catch (e) {
    return next(new AppError("Office was not found!", 404));
  }
};

export const deleteOffice: RequestHandler<{ id: string }> = (
  req,
  res,
  next,
) => {};
