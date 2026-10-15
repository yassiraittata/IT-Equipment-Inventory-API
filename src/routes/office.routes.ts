import { Router } from "express";
import {
  createOffice,
  deleteOffice,
  getAllOffices,
  getSingleOffice,
  updateOffice,
} from "../controllers/offices.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { officeSchema } from "../schemas/office.schema.js";
import { validateParams } from "../middlewares/paramsValidator.js";
import { paramsSchema } from "../schemas/uuid.schema.js";

export default (router: Router) => {
  router.get("/offices", getAllOffices);
  router.get("/offices/:id", validateParams(paramsSchema), getSingleOffice);
  router.post("/offices/add", validateRequest(officeSchema), createOffice);
  router.put("/offices/:id", validateParams(paramsSchema), updateOffice);
  router.delete("/offices/:id", validateParams(paramsSchema), deleteOffice);
};
