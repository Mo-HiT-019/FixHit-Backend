import { createTechnician } from "./createTechnicain";
import { Technician } from "../../domain/entities/technicain";
import { ITechnicianRepository } from "../../domain/repositories/technicianRepository";
import { OtpModel } from "../../infrastructure/models/otpModel";

export const verifyOtp = async (email: string,enteredOtp: string,technicianData: Omit<Technician, "id">
) => {
  console.log("Technician data:", technicianData);

  return async (technicianRepo: ITechnicianRepository) => {
    const otpDoc = await OtpModel.findOne({ email });

    if (!otpDoc) {
      throw new Error("OTP expired or invalid");
    }

    if (otpDoc.otp !== enteredOtp) {
      throw new Error("Invalid OTP");
    }

    const technician = await (await createTechnician(technicianData))(technicianRepo);
    await OtpModel.deleteOne({ email });
    return technician;
  };
};
