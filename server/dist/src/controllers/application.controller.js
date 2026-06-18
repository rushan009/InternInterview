import { createApplication, deleteApplication, getAllApplication, updateApplication } from "../services/application.service.js";
export const createController = async (req, res) => {
    try {
        const data = req.body;
        const response = await createApplication(data);
        res.status(201).json({
            success: true,
            message: "Created sucessfully",
            response
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error
        });
    }
};
export const deleteController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await deleteApplication(id);
        res.status(200).json({
            success: true,
            message: "Deleted sucessfully",
            response
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
};
export const updateController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const response = await updateApplication(id, data);
        res.status(200).json({
            success: true,
            message: "Update sucessfully",
            response
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
};
export const getAllApplicationController = async (req, res) => {
    try {
        const filters = req.query;
        const response = await getAllApplication(filters);
        res.status(200).json({
            success: true,
            message: "Fetched sucessfully",
            response
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
};
