import { Router } from "express";
import { handleRefresh_token } from "../controllers/authcontroller";

const router = Router();

router.get('/',handleRefresh_token)

export default router;