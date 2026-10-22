import { RequestHandler } from "express";
import { assignmentDto } from "../schemas/assignments.schema.js";
import prisma from "../config/db.js";
import { AppError, ok } from "../lib/appError.js";

export const createAssignments: RequestHandler<
  { id: string },
  unknown,
  assignmentDto
> = async (req, res, _next) => {
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
