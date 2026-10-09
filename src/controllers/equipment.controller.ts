import { RequestHandler } from "express";
import prisma from "../config/db.js";
import { AppError, ok } from "../lib/appError.js";
import { generateSerialNumber, parseDateQuery } from "../utils/index.js";
import { equipmentDto } from "../schemas/equipment.schema.js";

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
  const skip = (+page - 1) * take;

  let filterObj: {
    status?: string;
    category?: string;
    office?: string;
    brand?: string;
    purchase_date?: Date;
  } = {};

  if (brand) {
    filterObj.status = status;
  }
  if (brand) {
    filterObj.category = category;
  }
  if (brand) {
    filterObj.office = office;
  }
  if (brand) {
    filterObj.brand = brand;
  }
  if (brand) {
    let date = parseDateQuery(purchase_date, next);
    if (date) {
      filterObj.purchase_date = date;
    }
  }

  const equipments = await prisma.equipment.findMany({
    take,
    skip,
  });

  res.status(200).json(ok(equipments));
};

export const getSingleEquipment: RequestHandler<{ id: string }> = async (
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

export const createEquipment: RequestHandler<
  unknown,
  unknown,
  equipmentDto
> = async (req, res, next) => {
  const { brand, category_id, model, office_id, purchase_date, status } =
    req.body;

  const date = new Date(purchase_date);

  if (Number.isNaN(date.getTime())) {
    return next(new AppError("Invalid purchase date", 400));
  }

  const office = await prisma.equipment.create({
    data: {
      brand,
      category_id,
      model,
      office_id,
      purchase_date,
      status,
      serial_number: generateSerialNumber(),
    },
  });
  res.status(200).json(ok(office));
};

// TODO: insert sample data from GPT
// TODO: test the previous routes
export const createEquipments: RequestHandler<
  unknown,
  unknown,
  equipmentDto[]
> = async (req, res, next) => {
  try {
   


    const data = req.body.map((item) => ({
      ...item,
      serial_number: generateSerialNumber(),
    }));

    const office = await prisma.equipment.createMany({
      data: data,
    });
    res.status(200).json(ok(office));
  } catch (e) {
    console.log(e);
  }
};

// export const updateOffice: RequestHandler<
//   { id: string },
//   unknown,
//   officeDto
// > = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { floor, name, building } = req.body;

//     const office = await prisma.office.update({
//       where: { id },
//       data: {
//         name,
//         building,
//         floor,
//       },
//     });
//     res.status(200).json(ok(office));
//   } catch (e) {
//     return next(new AppError("Office was not found!", 404));
//   }
// };

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
