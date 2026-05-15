import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";


// post user
const createUser= async (req: Request, res: Response) => {
  try {
  const result=await userService.createUserIntoDb(req.body)
    // console.log(result)
    res.status(200).json({
      message: "created",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(200).json({
      message: error.message,
      error: error.detail,
    });
  }
};

// get all usr 
const getAlUser = async (req: Request, res: Response) => {
  try {
   const result=await userService.getAlUserFromDb()

    res.status(200).json({
      success: true,
      message: "users get successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.detail,
    });
  }
};

// get single user by id
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

   const result=await userService.getSingleUserFromDb(id as string)

    if (result.rows.length == 0) {
      return res.status(404).json({
        success: false,
        message: "user  not found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "user get successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.detail,
    });
  }
};

// edit user details
const updateUser = async (req: Request, res: Response) => {
  try {
    
    const { id } = req.params;
   
    const result = await userService.editUserDetailsFromDb(req.body, id as string);
    


    if (result.rows.length == 0) {
      return res.status(404).json({
        success: false,
        message: "user  not found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "updated successful",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.detail,
    });
  }
};


// delete user form db 
const userDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result= await userService.deleteUserFromDB(id as string);

    if (result.rows.length == 0) {
      return res.status(404).json({
        success: false,
        message: "user  not found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "user delete successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.detail,
    });
  }
};






export const userController = {
  createUser,
  getAlUser,
  getSingleUser,
  updateUser,
  userDelete,
};