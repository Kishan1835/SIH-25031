import express from "express";
import { createDepartment, getDepartments } from "../controllers/departmentController.js";

const router = express.Router();

// POST: create department
router.post("/", createDepartment);

// GET: fetch all departments
router.get("/", getDepartments);

export default router;
