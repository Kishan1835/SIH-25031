import Department from "../models/Department.js";

// @desc Create new department
export const createDepartment = async (req, res) => {
    try {
        const { name, category, contactEmail, contactPhone } = req.body;

        const department = new Department({
            name,
            category,
            contactEmail,
            contactPhone,
        });

        await department.save();
        res.status(201).json(department);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Get all departments
export const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
