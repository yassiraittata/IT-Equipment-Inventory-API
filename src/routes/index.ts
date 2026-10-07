import { Router } from "express";
import categoryRoutes from "./category.routes.js";

const router = Router();

export default () => {
  categoryRoutes(router);
  
  return router;
};
