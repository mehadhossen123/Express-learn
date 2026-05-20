import { Router } from "express";
import { authController } from "./auth.controller";

const router=Router()
router.post("/login",authController.createLogin)
router.post("/refresh_token",authController.createRefreshToken)
export const authRouter=router;