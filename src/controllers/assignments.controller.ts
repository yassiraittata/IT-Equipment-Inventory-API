import { RequestHandler } from "express";
import { assignmentDto } from "../schemas/assignments.schema.js";
import prisma from "../config/db.js";
import { AppError, ok } from "../lib/appError.js";
import { parseAnyDate } from "../utils/date.js";

export const createAssignments: RequestHandler<
  { id: string },
  unknown,
  assignmentDto
> = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  const equipement = await prisma.equipment.findUnique({
    where: { id },
  });

  if (!equipement) {
    throw new AppError("Equipement was not found!", 404);
  }

  if (equipement.status == "in_use") {
    throw new AppError("Equipement was already assigned!", 404);
  }
  if (equipement.status == "in_repair") {
    throw new AppError("Equipement is in repair!", 404);
  }
  if (equipement.status == "retired") {
    throw new AppError("Equipement is retired!", 404);
  }

  const user = await prisma.user.findUnique({
    where: { id: user_id },
  });

  if (!user) {
    throw new AppError("User was not found", 404);
  }

  await prisma.assignments.create({
    data: {
      assigned_to: user_id,
      equipment_id: id,
    },
  });

  await prisma.equipment.update({
    data: {
      status: "in_use",
    },
    where: {
      id,
    },
  });

  res.status(201).json(ok({ message: "The item was assigned successfully!" }));
};


// TODO: make sure to add time
export const closeAssignments: RequestHandler<{ id: string }> = async (
  req,
  res,
) => {
  const { id } = req.params;

  const assignment = await prisma.assignments.findUnique({
    where: { id },
  });

  if (!assignment) {
    throw new AppError("Assignment was not found!", 404);
  }

  await prisma.assignments.update({
    data: {
      returned_at: parseAnyDate(new Date()),
    },
    where: { id },
  });

  await prisma.equipment.update({
    data: {
      status: "in_stock",
    },
    where: { id: assignment.equipment_id },
  });

  res.status(201).json(ok({ message: "returned successfully" }));
};
