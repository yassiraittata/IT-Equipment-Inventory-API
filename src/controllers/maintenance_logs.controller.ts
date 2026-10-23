import { RequestHandler } from "express";
import { maintenanceDto } from "../schemas/maintenance.schema.js";
import prisma from "../config/db.js";
import { AppError, ok } from "../lib/appError.js";

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
