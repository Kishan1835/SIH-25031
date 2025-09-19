import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    // Collect validation errors
    let formattedErrors = [];
    if (!errors.isEmpty()) {
        formattedErrors = errors.array().map(err => ({
            field: err.param,
            message: err.msg,
        }));
    }

    // Photos validation
    if (!req.files || req.files.length === 0) {
        formattedErrors.push({
            field: "photos",
            message: "At least one photo is required",
        });
    } else {
        req.files.forEach(file => {
            // Allowed file types
            const allowedTypes = ["image/jpeg", "image/png"];
            if (!allowedTypes.includes(file.mimetype)) {
                formattedErrors.push({
                    field: "photos",
                    message: `Invalid file type: ${file.originalname}. Only JPG/PNG allowed`,
                });
            }

            // File size check (15 MB = 15 * 1024 * 1024 bytes)
            const maxSize = 15 * 1024 * 1024;
            if (file.size > maxSize) {
                formattedErrors.push({
                    field: "photos",
                    message: `File ${file.originalname} exceeds max image upload size (15 MB)`,
                });
            }
        });
    }

    // If any error → send response
    if (formattedErrors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: formattedErrors,
        });
    }

    next();
};
