import { Router } from "express";
import {
  createEquipment,
  createEquipments,
  getAllEquipments,
  getSingleEquipment,
} from "../controllers/equipment.controller.js";

export default (router: Router) => {
  router.get("/equipments", getAllEquipments);
  router.get("/equipments/:id", getSingleEquipment);
  router.post("/equipments/add", createEquipment);
  router.post("/equipments/add-many", createEquipments);
  router.put("/equipments/:id");
  router.delete("/equipments/:id");
};
