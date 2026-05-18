import { Router, type NextFunction, type Request, type Response } from "express";

import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { Roles } from "../../types";




const router=Router();
router.post("/", userController.createUser);

router.get("/",auth(Roles.admin,Roles.users),userController.getAlUser);

router.get("/:id", userController.getSingleUser);

router.put("/:id",userController.updateUser );

router.delete("/:id", userController.userDelete);




export const userRouter=router;