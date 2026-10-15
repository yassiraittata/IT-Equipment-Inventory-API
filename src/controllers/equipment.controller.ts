import { RequestHandler } from "express";
import prisma from "../config/db.js";
import { AppError, ok } from "../lib/appError.js";
import { generateSerialNumber, parseDateQuery } from "../utils/index.js";
import { equipmentDto } from "../schemas/equipment.schema.js";
import { parseAnyDate } from "../utils/date.js";

type searchQuery = {
  status: string;
  category: string;
  office: string;
  brand: string;
  purchase_date: Date;
  page: string;
};

export const getAllEquipments: RequestHandler<
  unknown,
  unknown,
  unknown,
  searchQuery
> = async (req, res, next) => {
  const { page, brand, category, office, purchase_date, status } = req.query;
  const take = 10;
  const skip = (+(page || 1) - 1) * take;

  let filterObj: {
    status?: "in_stock" | "in_use" | "in_repair" | "retired";
    category_id?: string;
    office_id?: string;
    brand?: string;
    purchase_date?: Date;
  } = {};

  if (status) {
    const validStatuses = [
      "in_stock",
      "in_use",
      "in_repair",
      "retired",
    ] as const;

    if (validStatuses.includes(status as (typeof validStatuses)[number])) {
      filterObj.status = status as (typeof validStatuses)[number];
    }
  }
  if (category) {
    filterObj.category_id = category;
  }
  if (office) {
    filterObj.office_id = office;
  }
  if (brand) {
    filterObj.brand = brand;
  }
  if (purchase_date) {
    let date = parseDateQuery(purchase_date, next);
    if (date) {
      filterObj.purchase_date = date;
    }
  }

  const equipments = await prisma.equipment.findMany({
    take,
    skip,
    where: { ...filterObj },
  });

  res.status(200).json(ok(equipments));
};

export const getSingleEquipment: RequestHandler<{ id: string }> = async (
  req,
  res,
  next,
) => {
  const { id } = req.params;

  const equipment = await prisma.equipment.findUnique({ where: { id } });

  if (!equipment) {
    return next(new AppError("Equipment was not found!", 404));
  }

  res.status(200).json(ok(equipment));
};

export const createEquipment: RequestHandler<
  unknown,
  unknown,
  equipmentDto
> = async (req, res, _next) => {
  const { brand, category_id, model, office_id, purchase_date, status } =
    req.body;

  const purchaseDate = parseAnyDate(purchase_date);

  if (!purchaseDate) {
    throw new AppError("Invalid purchase date", 400);
  }

  const equipment = await prisma.equipment.create({
    data: {
      brand,
      category_id,
      model,
      office_id,
      purchase_date: purchaseDate,
      status,
      serial_number: generateSerialNumber(),
    },
  });
  res.status(200).json(ok(equipment));
};

export const createEquipments: RequestHandler<
  unknown,
  unknown,
  equipmentDto[]
> = async (req, res, next) => {
  try {
    const data = req.body.map((item) => {
      const purchaseDate = parseAnyDate(item.purchase_date);
      if (!purchaseDate) {
        throw new AppError(`Please enter a valid date for purchase date`, 400);
      }
      return {
        ...item,
        purchase_date: purchaseDate,
        serial_number: generateSerialNumber(),
      };
    });

    const equipment = await prisma.equipment.createMany({
      data,
    });
    res.status(200).json(ok(equipment));
  } catch (e) {
    if (e instanceof AppError) {
      return next(e);
    }
    return next(new AppError("Equipment was not found!!!!", 404));
  }
};

export const updateEquipment: RequestHandler<
  { id: string },
  unknown,
  equipmentDto
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { brand, category_id, model, office_id, purchase_date, status } =
      req.body;

    const purchaseDate = parseAnyDate(purchase_date);

    if (!purchaseDate) {
      throw new AppError("Invalid purchase date", 400);
    }

    const equipment = await prisma.equipment.update({
      where: { id },
      data: {
        brand,
        category_id,
        model,
        office_id,
        purchase_date,
        status,
      },
    });
    res.status(200).json(ok(equipment));
  } catch (e) {
    if (e instanceof AppError) {
      return next(e);
    }
    return next(new AppError("Equipment was not found!", 404));
  }
};

// export const deleteOffice: RequestHandler<{ id: string }> = async (
//   req,
//   res,
//   next,
// ) => {
//   try {
//     const { id } = req.params;

//     const office = await prisma.office.delete({
//       where: { id },
//     });
//     res.status(200).json(ok({ message: "deleted successfully" }));
//   } catch (e) {
//     return next(new AppError("Office was not found!", 404));
//   }
// };
