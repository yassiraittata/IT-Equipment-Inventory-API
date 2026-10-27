import { Router } from "express";
import {
  createCatrgory,
  getCategory,
  listCategories,
  //   createCatrgoryMany,
  deleteCatrgory,
  updateCatrgory,
} from "../controllers/categories.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { categorySchema } from "../schemas/category.schema.js";
import { isAdmin, isAuth } from "../middlewares/authMiddleware.js";

export default (router: Router) => {
  router.get("/categories", isAuth, listCategories);
  router.get("/categories/:id", getCategory);
  router.post(
    "/categories/add",
    isAuth,
    isAdmin,
    validateRequest(categorySchema),
    createCatrgory,
  );
  //   router.post("/categories/add/many", createCatrgoryMany);
  router.put(
    "/categories/:id",
    validateRequest(categorySchema),
    updateCatrgory,
  );
  router.delete("/categories/:id", isAuth, isAdmin, deleteCatrgory);
};
