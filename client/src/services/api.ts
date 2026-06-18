import axios from "axios";
import type { CreateApplicationInput, UpdateApplicationInput } from "../types/application.types";

const BASE_URL = "http://localhost:5000/api/applications";

export const getAllapplication = async (status?:string, search?:string) => {
    try{
        const response = await axios.get(BASE_URL, {
            params:{
                status,
                search,
                page:1,
                limit:3
            }
        })

        return response.data.response;
    }
    catch(error){
        console.error("Error fetching applications:", error);
        throw error;
    }
}

export const createApplication = async (applicationData: CreateApplicationInput) => {
    try {
        const response = await axios.post(BASE_URL, applicationData);
        return response.data;
    } catch (error) {
        console.error("Error creating application:", error);
        throw error;
    }
};

export const updateApplication = async (id: number, applicationData: UpdateApplicationInput) => {
    try{
        const response = await axios.put(`${BASE_URL}/${id}`, applicationData);
        return response.data;
    } catch (error) {
        console.error("Error updating application:", error);
        throw error;
    }
}

export const deleteApplication = async (id: number) => {
    try{
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting application:", error);
        throw error;
    }
}