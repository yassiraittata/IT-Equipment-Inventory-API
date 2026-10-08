import { NextFunction } from "express";
import crypto from "node:crypto";
import { AppError } from "./lib/appError.js";

export function generateSerialNumber(): string {
  return `EQP-${crypto.randomBytes(6).toString("hex").toUpperCase()}`;
}

export function parseDateQuery(
  value: unknown,
  next: NextFunction,
): Date | void {
  if (typeof value !== "string") {
    throw new Error("purchase_date must be a string");
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    next(new AppError("purchase_date must use YYYY-MM-DD format", 401));
    return;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    next(new AppError("purchase_date must use YYYY-MM-DD format", 401));
    return;
  }

  return date;
}