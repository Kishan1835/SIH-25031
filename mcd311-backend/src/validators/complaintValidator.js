import { body } from "express-validator";

export const createComplaintValidator = [
    body("category")
        .notEmpty().withMessage("Category is required")
        .isString().withMessage("Category must be a string")
        .isLength({ min: 3, max: 50 }).withMessage("Category must be between 3 and 50 characters"),

    body("description")
        .notEmpty().withMessage("Description is required")
        .isLength({ min: 30, max: 500 }).withMessage("Description must be between 10 and 500 characters"),

    body("location.latitude")
        .notEmpty().withMessage("Latitude is required")
        .isFloat({ min: -90, max: 90 }).withMessage("Latitude must be a valid number"),

    body("location.longitude")
        .notEmpty().withMessage("Longitude is required")
        .isFloat({ min: -180, max: 180 }).withMessage("Longitude must be a valid number"),

    body("location.address")
        .notEmpty().withMessage("Address is required")
        .isString().withMessage("Address must be a string")
        .isLength({ min: 5, max: 200 }).withMessage("Address must be between 5 and 200 characters"),
];
