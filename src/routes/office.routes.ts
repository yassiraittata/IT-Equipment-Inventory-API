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
import { isAdmin, isAuth } from "../middlewares/authMiddleware.js";

export default (router: Router) => {
  router.get("/offices", isAuth, getAllOffices);
  router.get(
    "/offices/:id",
    isAuth,
    validateParams(paramsSchema),
    getSingleOffice,
  );
  router.post(
    "/offices/add",
    isAuth,
    isAdmin,
    validateRequest(officeSchema),
    createOffice,
  );
  router.put(
    "/offices/:id",
    isAuth,
    isAdmin,
    validateParams(paramsSchema),
    updateOffice,
  );
  router.delete(
    "/offices/:id",
    isAuth,
    isAdmin,
    validateParams(paramsSchema),
    deleteOffice,
  );
};
