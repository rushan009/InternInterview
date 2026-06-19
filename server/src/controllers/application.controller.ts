import { createApplication, deleteApplication, getAllApplication, getApplicationById, updateApplication } from "../services/application.service.js";
import {Response, Request} from "express"
import { ApplicationFilters, CreateApplicationInput, UpdateApplicationInput } from "../types/application.types.js";

export const createController = async (req:Request, res:Response)=>{
    try {

        const data= req.body as CreateApplicationInput;
        const response = await createApplication(data);
        res.status(201).json({
            success:true,
            message:"Created sucessfully",
            response
        })
        

    } catch (error) {
        console.error(error); 
        res.status(500).json({
            success:false,
            message:error
        })
    }
}

export const deleteController = async (req:Request, res:Response)=>{
    try {

        const id= parseInt(req.params.id as string);
        const response = await deleteApplication(id);
        res.status(200).json({
            success:true,
            message:"Deleted sucessfully",
            response
        })
        

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error
        })
    }
}


export const updateController = async (req:Request, res:Response)=>{
    try {
        const id= parseInt(req.params.id as string);
        const data= req.body as UpdateApplicationInput;
        const response = await updateApplication(id, data);
        res.status(200).json({
            success:true,
            message:"Update sucessfully",
            response
        })
        

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error
        })
    }
}

export const getAllApplicationController = async (req:Request, res:Response)=>{
    try {

        const filters= req.query as ApplicationFilters;
        const response = await getAllApplication(filters);
        res.status(200).json({
            success:true,
            message:"Fetched sucessfully",
            response
        })
        

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error
        })
    }
}


export const getApplicationByIdController = async (req:Request, res:Response)=>{
    try {

        const id= parseInt(req.params.id as string);
        const response = await getApplicationById(id);
        res.status(200).json({
            success:true,
            message:"Fetched sucessfully",
            response
        })
        

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error
        })
    }
}