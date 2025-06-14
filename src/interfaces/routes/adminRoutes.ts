import { Router } from "express";
import {adminLogin,
  getUsersController,
  blockUserController,
  unblockUserController,
  getTechniciansController,
  listTechnicianController,
  unlistTechnicianController,
  adminSignup,getTechniciansForVerificationController,
  getTechnicianByIdController,
  markTechnicianAsVerifiedController
} from "../controllers/adminController";

const router = Router();

router.post("/login", adminLogin);
router.post('/signup',adminSignup)

//userss
router.get("/users", getUsersController);
router.patch("/users/:id/block", blockUserController);
router.patch("/users/:id/unblock", unblockUserController);



//technicnians
router.get("/technicians", getTechniciansController);
router.get("/technicians/verification-requests", getTechniciansForVerificationController);
router.patch("/technicians/:id/list", listTechnicianController);
router.patch("/technicians/:id/unlist", unlistTechnicianController);
router.get('/technicians/:id', getTechnicianByIdController);
router.patch('/technicians/verify/:id',markTechnicianAsVerifiedController);

export default router;
