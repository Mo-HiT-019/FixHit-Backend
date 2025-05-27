import { Request,Response} from "express";
import { AdminModel } from "../../infrastructure/models/adminModel";
import HTTP_statusCode from "../../enum/statusCode";
import bcrypt from 'bcrypt';
import { viewAllUsers } from "../../usecases/admin/viewUsers";
import { blockUserById, unblockUserById } from "../../usecases/admin/blockUnblockUser";
import { UserRepoImpl } from "../../infrastructure/repositories/userRepoImpl";
import { TechnicianRepoImpl } from "../../infrastructure/repositories/technicianRepoImpl";
import { viewAllTechnicians } from "../../usecases/admin/viewTechnicians";
import {listTechnicianById} from '../../usecases/admin/listTechnicians';
import {unlistTechnicianById} from '../../usecases/admin/unlistTechnicians';
import { registerAdmin } from "../../usecases/admin/registerAdmin";
import { AdminRepositoryImpl } from "../../infrastructure/repositories/adminRepoImpl";
import { loginAdmin } from "../../usecases/admin/loginAdmin";

const userRepository = new UserRepoImpl();
const technicianRepository = new TechnicianRepoImpl();
const adminRepo = new AdminRepositoryImpl();

export const adminSignup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    await (await registerAdmin({ username, password }))(adminRepo);

    res.status(HTTP_statusCode.Created).json({ message: "Admin registered successfully" });
  } catch (err: any) {
    res.status(HTTP_statusCode.BadRequest).json({ message: err.message || "Signup failed" });
  }
};

export const adminLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
    
        const admin = await loginAdmin(username, password)(adminRepo);

        console.log("Admin login successss");
        res.status(HTTP_statusCode.OK).json({ message: "Admin login Success" ,admin });

    } catch (error: any) {
        console.error("Admin login error:", error.message);
        res.status(HTTP_statusCode.Unauthorized).json({ message: error.message || "Login failed due to an unexpected error." });
    }
};




export const getUsersController = async (req: Request, res: Response) => {
  try{

    const search = req.query.search as string;
    const users = await (await viewAllUsers(search))(userRepository);
    res.status(HTTP_statusCode.OK).json(users);

  }catch{
    res.status(HTTP_statusCode.InternalServerError).json({ message: "Failed to fetch the users...." });
  }
};


export const blockUserController = async (req: Request, res: Response) => {
  console.log("Block user controller calledd")
  try {
    await (await blockUserById(req.params.id))(userRepository);
    res.status(HTTP_statusCode.OK).json({ message: "User blocked" });
  } catch {
    res.status(HTTP_statusCode.InternalServerError).json({ message: "Block failed..." });
  }
};


export const unblockUserController = async (req: Request, res: Response) => {
  try {
    
    await (await unblockUserById(req.params.id))(userRepository);
    res.status(HTTP_statusCode.OK).json({ message: "User unblocked.." });
  } catch {
    res.status(HTTP_statusCode.InternalServerError).json({ message: "unblock failed" });
  }
};




export const getTechniciansController = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    const technicians = await (await viewAllTechnicians(search))(technicianRepository);
    res.status(HTTP_statusCode.OK).json(technicians);
  } catch {
    res.status(HTTP_statusCode.InternalServerError).json({ message: "Failed to fetch technicians..." });
  }
};



export const listTechnicianController = async (req: Request, res: Response) => {
  try {
    await (await listTechnicianById(req.params.id))(technicianRepository);
    res.status(HTTP_statusCode.OK).json({ message: "Technician listed" });
  } catch {
    res.status(HTTP_statusCode.InternalServerError).json({ message: "List failed..." });
  }
};


export const unlistTechnicianController = async (req: Request, res: Response) => {
  try {
    await (await unlistTechnicianById(req.params.id))(technicianRepository);
    res.status(HTTP_statusCode.OK).json({ message: "Technician unlisted" });
  } catch {
    res.status(HTTP_statusCode.InternalServerError).json({ message: "Unlist failed..." });
  }
};

