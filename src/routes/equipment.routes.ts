import { Router } from "express";

export default (router: Router) => {
  router.get("/equipments");
  router.get("/equipments/:id");
  router.post("/equipments/add");
  router.put("/equipments/:id");
  router.delete("/equipments/:id");
};
