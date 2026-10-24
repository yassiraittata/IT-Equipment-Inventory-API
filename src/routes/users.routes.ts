import { Router } from "express";

export default (router: Router) => {
  router.post("/register");
  router.post("/login");
  router.get("/employees");
  router.get("/employees/:id");
  router.put("/employees/:id");
  router.delete("/employees/:id");
};
