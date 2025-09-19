import express from "express";
import {
    createComplaint,
    getComplaints,
    getComplaintsByUser,
    getComplaintById,
    updateComplaintStatus,
    deleteComplaint
} from "../controllers/complaintController.js";

import upload from "../utils/upload.js";
import { createComplaintValidator } from "../validators/complaintValidator.js";
import { validateRequest } from "../middlewares/validationMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Citizen: Create a complaint
router.post(
    "/",
    protect,
    upload.array("photos", 3),
    createComplaintValidator,
    validateRequest,
    createComplaint
);

// Citizen/Admin: Get all complaints (with filters)
router.get("/", protect, getComplaints);

// Citizen: Get own complaints
router.get("/my", protect, getComplaintsByUser);

// Citizen/Admin: Get single complaint
router.get("/:id", protect, getComplaintById);

// Admin only: Update complaint status
router.put("/:id/status", protect, authorizeRoles("admin"), updateComplaintStatus);

// Admin only: Delete complaint
router.delete("/:id", protect, authorizeRoles("admin"), deleteComplaint);

export default router;
