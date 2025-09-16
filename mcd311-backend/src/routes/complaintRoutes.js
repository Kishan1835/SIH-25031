import express from "express";
import {
    createComplaint,
    getComplaints,
    getComplaintById,
    updateComplaintStatus,
    deleteComplaint
} from "../controllers/complaintController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../utils/upload.js";

const router = express.Router();

router.post("/", protect, upload.array("photos", 5), createComplaint);
router.get("/", protect, getComplaints);
router.get("/:id", protect, getComplaintById);
router.put("/:id/status", protect, adminOnly, updateComplaintStatus);
router.delete("/:id", protect, adminOnly, deleteComplaint);

export default router;
