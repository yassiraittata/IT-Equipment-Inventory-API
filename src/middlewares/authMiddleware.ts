import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../lib/appError.js";
import env from "../config/env-validate.js";

export const isAuth: RequestHandler = (req, _res, next) => {
  const cookies = (req as typeof req & { cookies?: Record<string, unknown> })
    .cookies;
  const token = cookies?.token;

  if (typeof token !== "string" || !token) {
    throw new AppError("Authentication token is required", 401);
  }

  const secret = env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new AppError("Authentication is not configured", 500);
  }

  try {
    const payload = jwt.verify(token, secret);
    if (typeof payload === "string") {
      throw new AppError("Invalid authentication token", 401);
    }

    req.userId = payload.userId;
    req.user_role = payload.role;
    next();
  } catch {
    throw new AppError("Invalid or expired authentication token", 401);
  }
};

export const isAdmin: RequestHandler = (req, _res, next) => {
  const role = req.user_role;

  if (role !== "admin") {
    throw new AppError("Administrator access required", 403);
  }

  next();
};
