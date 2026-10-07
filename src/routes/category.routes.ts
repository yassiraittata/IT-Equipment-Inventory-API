import { Router } from "express";
import {
  getCategory,
  listCategories,
} from "../controllers/categories.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { categorySchema } from "../schemas/category.schema.js";

export default (router: Router) => {
  router.get("/categories", listCategories);
  router.get("/categories/:id", getCategory);
  router.post("/categories/add", validateRequest(categorySchema), getCategory);
  router.put("/categories/:id", getCategory);
  router.delete("/categories/:id", getCategory);
};
