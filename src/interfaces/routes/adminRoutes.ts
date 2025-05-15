import { Router } from "express";
import {adminLogin,
  getUsersController,
  blockUserController,
  unblockUserController,
  getTechniciansController,
  listTechnicianController,
  unlistTechnicianController
} from "../controllers/adminController";

const router = Router();

//router.post("/login", adminLogin);

//userss
router.get("/users", getUsersController);
router.patch("/users/block/:id", blockUserController);
router.patch("/users/unblock/:id", unblockUserController);



//technicnians
router.get("/technicians", getTechniciansController);
router.patch("/technicians/list/:id", listTechnicianController);
router.patch("/technicians/unlist/:id", unlistTechnicianController);

export default router;
