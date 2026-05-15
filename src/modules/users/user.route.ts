import { Router } from "express";

import { userController } from "./user.controller";

const router=Router();
router.post("/", userController.createUser);

router.get("/",userController.getAlUser);

router.get("/:id", userController.getSingleUser);

router.put("/:id",userController.updateUser );

router.delete("/:id", userController.userDelete);




export const userRouter=router;