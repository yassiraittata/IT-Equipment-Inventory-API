import { RequestHandler } from "express";

export const getAllOffices: RequestHandler<
  unknown,
  unknown,
  unknown,
  { page: string }
> = (req, res, next) => {};

export const getSingleOffice: RequestHandler<{ id: string }> = (
  req,
  res,
  next,
) => {};

export const createOffice: RequestHandler<{ id: string }> = (
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
