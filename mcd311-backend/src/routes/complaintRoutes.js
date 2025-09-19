import express from "express";
import { createComplaint } from "../controllers/complaintController.js";
import upload from "../utils/upload.js";
import { createComplaintValidator } from "../validators/complaintValidator.js";
import { validateRequest } from "../middlewares/validationMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js"; // 👈 import protect

const router = express.Router();

router.post(
    "/",
    protect, 
    upload.array("photos", 3),
    createComplaintValidator,
    validateRequest,
    createComplaint
);

export default router;
