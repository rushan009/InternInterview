import { createApplication, deleteApplication, getAllApplication, getApplicationById, updateApplication } from "../services/application.service.js";
import {Response, Request} from "express"
import { ApplicationFilters, CreateApplicationInput, UpdateApplicationInput } from "../types/application.types.js";

export const createController = async (req:Request, res:Response)=>{
    try {


        //take the data from the body and convert it into the Create Application Input type and then pass it to the service function to create the application in the database and then send the response back to the client.
        const data= req.body as CreateApplicationInput;

        //call the service function to create the application in the database and then send the response back to the client.
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
        
        //onclick on delete icon sends teh id tot the params and then we take that id and pass it to the service function to delete the application from the database and then send the response back to the client.
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

        //onclick on edit icon sends the id to the params and the updated data to the body and then we take that id and data and pass it to the service function to update the application in the database and then send the response back to the client.
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

        //the filters are going to come from the query params and then we take those filters and pass them to the
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

        //the id is going to come from the params and then we take that id and pass it to the service function to get the application from the database and then send the response back to the client.

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