import express from "express";
import {
  createServiceController,
  getAllServicesController,
  updateServiceController,
  deactivateServiceController,
  activateServiceController,
  deleteServiceController,
} from "../controllers/serviceController";

const router = express.Router();

router.post("/", createServiceController);
router.get("/", getAllServicesController);
router.put("/:id", updateServiceController);
router.patch("/:id/deactivate", deactivateServiceController);
router.patch("/:id/activate", activateServiceController);
router.delete("/:id", deleteServiceController);

export default router;
