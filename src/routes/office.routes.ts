import { Router } from "express";
import { z } from "zod";
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

const officeParamsSchema = z.object({
  id: z.uuid("Make sure to provide a valid uuid"),
});
export default (router: Router) => {
  router.get("/offices", getAllOffices);
  router.get(
    "/offices/:id",
    validateParams(officeParamsSchema),
    getSingleOffice,
  );
  router.post("/offices/add", validateRequest(officeSchema), createOffice);
  router.put("/offices/:id", validateParams(officeParamsSchema), updateOffice);
  router.delete(
    "/offices/:id",
    validateParams(officeParamsSchema),
    deleteOffice,
  );
};
