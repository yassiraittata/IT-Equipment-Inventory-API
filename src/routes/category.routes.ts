import { Router } from "express";
import {
  getCategory,
  listCategories,
} from "../controllers/categories.controller.js";

export default (router: Router) => {
  router.get("/categories", listCategories);
  router.get("/categories/:id", getCategory);
  router.post("/categories/add", getCategory);
  router.put("/categories/:id", getCategory);
  router.delete("/categories/:id", getCategory);
};
