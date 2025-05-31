import { Request,Response } from "express";
import { ServiceRepoImpl } from "../../infrastructure/repositories/serviceRepoImpl";
import asyncHandler from "express-async-handler";
import { createService } from "../../usecases/service/createService";
import { updateServiceUseCase } from "../../usecases/service/updateService";
import { getAllServicesUseCase } from "../../usecases/service/getAllServices";
import { activateServiceUseCase, deactivateServiceUseCase } from "../../usecases/service/serviceActivation";
import { deleteServiceUseCase } from "../../usecases/service/deleteService";
import HTTP_statusCode from "../../enum/statusCode";


const serviceRepo = new ServiceRepoImpl();

export const createServiceController = asyncHandler(async (req: Request, res: Response) => {
    console.log("HEllo")
  const service = await createService(serviceRepo, req.body);
  res.status(HTTP_statusCode.Created).json(service);
});

export const getAllServicesController = asyncHandler(async (req: Request, res: Response) => {
  const { search, isActive } = req.query;
  const services = await getAllServicesUseCase(
    serviceRepo,
    search?.toString(),
    isActive === "true" ? true : isActive === "false" ? false : undefined
  );
  res.json(services);
});

export const updateServiceController = asyncHandler(async (req: Request, res: Response) => {
  const updated = await updateServiceUseCase(serviceRepo, req.params.id, req.body);
  res.json(updated);
});

export const deactivateServiceController = asyncHandler(async (req: Request, res: Response) => {
  await deactivateServiceUseCase(serviceRepo, req.params.id);
  res.json({ message: "Service deactivated." });
});

export const activateServiceController = asyncHandler(async (req: Request, res: Response) => {
  await activateServiceUseCase(serviceRepo, req.params.id);
  res.json({ message: "Service activated." });
});

export const deleteServiceController = asyncHandler(async (req: Request, res: Response) => {
  await deleteServiceUseCase(serviceRepo, req.params.id);
  res.json({ message: "Service deleted." });
});