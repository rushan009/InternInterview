import { Router } from "express";
import { createController, deleteController, getAllApplicationController, updateController } from "../controllers/application.controller";

const router = Router();

router.post("/", createController);
router.get("/", getAllApplicationController);
router.put("/:id", updateController);
router.delete("/:id", deleteController);

export default router;