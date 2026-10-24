import { RequestHandler } from "express";
import {
  completeMaintenanceDto,
  maintenanceDto,
  updateMaintenanceDto,
} from "../schemas/maintenance.schema.js";
import prisma from "../config/db.js";
import { AppError, ok } from "../lib/appError.js";
import { parseAnyDate } from "../utils/date.js";

type searchQuery = {
  status?: "open" | "in_progress" | "completed" | "canceled";
  equipment_id?: string;
  cost?: string | number;
  page?: string;
};

export const getMaintenances: RequestHandler<
  unknown,
  unknown,
  unknown,
  searchQuery
> = async (req, res) => {
  const { page, equipment_id, status, cost } = req.query;
  const take = 10;
  const skip = (+(page || 1) - 1) * take;

  let filterObj: searchQuery = {};

  if (equipment_id) {
    filterObj.equipment_id = equipment_id;
  }
  if (status) {
    filterObj.status = status;
  }
  if (equipment_id) {
    filterObj.cost = typeof cost === "string" ? +cost : cost;
  }

  const maintenances = await prisma.maintenance_logs.findMany({
    where: filterObj,
    take,
    skip,
  });

  res.status(200).json(ok(maintenances));
};

export const getSingleMaintenance: RequestHandler<{ id: string }> = async (
  req,
  res,
) => {
  const { id } = req.params;

  const maintenance = await prisma.maintenance_logs.findUnique({
    where: { id },
  });

  if (!maintenance) {
    throw new AppError("Maintenance was not found!", 404);
  }

  res.status(200).json(ok(maintenance));
};

export const createMaintenance: RequestHandler<
  { id: string },
  unknown,
  maintenanceDto
> = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  const equipment = await prisma.equipment.findUnique({
    where: { id },
  });

  if (!equipment) {
    throw new AppError("Equipment was not found!", 404);
  }

  if (equipment.status == "in_use" || equipment.status == "in_repair") {
    throw new AppError("Equipment is in use or in repair!", 404);
  }

  await prisma.maintenance_logs.create({
    data: {
      description,
      equipment_id: id,
    },
  });

  await prisma.equipment.update({
    where: { id },
    data: {
      status: "in_repair",
    },
  });

  res.status(201).json(ok({ message: "maintenance was created successfully" }));
};

export const updateMaintenance: RequestHandler<
  { id: string },
  unknown,
  updateMaintenanceDto
> = async (req, res) => {
  const { id } = req.params;
  const { completed_at, cost, description, opened_at, status } = req.body;

  const maintenance = await prisma.maintenance_logs.findUnique({
    where: { id },
  });

  if (!maintenance) {
    throw new AppError("maintenance log was not found", 404);
  }

  await prisma.maintenance_logs.update({
    where: { id },
    data: {
      completed_at: parseAnyDate(completed_at) || maintenance.completed_at,
      cost: cost || maintenance.cost,
      description: description || maintenance.description,
      opened_at: parseAnyDate(opened_at) || maintenance.opened_at,
      status: status || maintenance.status,
    },
  });

  res.status(201).json(ok({ message: "Updated succesfully" }));
};

export const completeMaintenance: RequestHandler<
  { id: string },
  unknown,
  completeMaintenanceDto
> = async (req, res) => {
  const { id } = req.params;
  const { completed_at, cost } = req.body;

  const maintenance = await prisma.maintenance_logs.findUnique({
    where: { id },
  });

  if (!maintenance) {
    throw new AppError("maintenance log was not found", 404);
  }

  await prisma.maintenance_logs.update({
    where: { id },
    data: {
      completed_at: parseAnyDate(completed_at),
      status: "completed",
      cost,
    },
  });

  await prisma.equipment.update({
    where: { id: maintenance.equipment_id },
    data: {
      status: "in_stock",
    },
  });

  res.status(201).json(ok({ message: "Updated succesfully" }));
};
