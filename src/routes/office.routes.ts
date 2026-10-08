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

export default (router: Router) => {
  router.get("/offices", getAllOffices);
  router.get("/offices/:id", getSingleOffice);
  router.post("/offices/add", validateRequest(officeSchema), createOffice);
  router.put("/offices/:id", updateOffice);
  router.delete("/offices/:id", deleteOffice);
};
