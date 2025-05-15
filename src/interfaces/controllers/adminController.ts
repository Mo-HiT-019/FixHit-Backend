import { Request,Response} from "express";
import { AdminModel } from "../../infrastructure/models/adminModel";
import HTTP_statusCode from "../../enum/statusCode";
import { viewAllUsers } from "../../usecases/admin/viewUsers";
import { blockUserById, unblockUserById } from "../../usecases/admin/blockUnblockUser";
import { UserRepoImpl } from "../../infrastructure/repositories/userRepoImpl";
import { TechnicianRepoImpl } from "../../infrastructure/repositories/technicianRepoImpl";
import { viewAllTechnicians } from "../../usecases/admin/viewTechnicians";
import {listTechnicianById} from '../../usecases/admin/listTechnicians';
import {unlistTechnicianById} from '../../usecases/admin/unlistTechnicians';


const userRepository = new UserRepoImpl();
const technicianRepository = new TechnicianRepoImpl();

export const adminLogin = async (req:Request,res:Response)=>{
    const {username, password} = req.body;
    try{
        const admin = await AdminModel.findOne({username});

        if(!admin || admin.password!== password){
            return res.status(HTTP_statusCode.Unauthorized).json({message:"Invalid credentials.."});


        }

        res.status(HTTP_statusCode.OK).json({message:"ADmin login Success"});
    }catch(error){
        res.status(HTTP_statusCode.InternalServerError).json({message:"Internal server erorr.."})
    }
}


export const getUsersController = async (req: Request, res: Response) => {
  try{
    console.log("getuserconreoller called...");
    const search = req.query.search as string;
    const users = await (await viewAllUsers(search))(userRepository);
    res.status(HTTP_statusCode.OK).json(users);

  }catch{
    res.status(HTTP_statusCode.InternalServerError).json({ message: "Failed to fetch the users...." });
  }
};


export const blockUserController = async (req: Request, res: Response) => {
  try {
    await (await blockUserById(req.params.id))(userRepository);
    res.status(HTTP_statusCode.updated).json({ message: "User blocked" });
  } catch {
    res.status(HTTP_statusCode.InternalServerError).json({ message: "Block failed..." });
  }
};


export const unblockUserController = async (req: Request, res: Response) => {
  try {
    
    await (await unblockUserById(req.params.id))(userRepository);
    res.status(HTTP_statusCode.updated).json({ message: "User unblocked.." });
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
    res.status(HTTP_statusCode.updated).json({ message: "Technician listed" });
  } catch {
    res.status(HTTP_statusCode.InternalServerError).json({ message: "List failed..." });
  }
};

export const unlistTechnicianController = async (req: Request, res: Response) => {
  try {
    await (await unlistTechnicianById(req.params.id))(technicianRepository);
    res.status(HTTP_statusCode.updated).json({ message: "Technician unlisted" });
  } catch {
    res.status(HTTP_statusCode.InternalServerError).json({ message: "Unlist failed..." });
  }
};

