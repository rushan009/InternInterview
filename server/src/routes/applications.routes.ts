import { Router } from "express";
import { createController, deleteController, getAllApplicationController, getApplicationByIdController, updateController } from "../controllers/application.controller.js";

const router = Router();

router.post("/", createController);
router.get("/", getAllApplicationController);
router.get("/:id", getApplicationByIdController);
router.put("/:id", updateController);
router.delete("/:id", deleteController);

export default router;