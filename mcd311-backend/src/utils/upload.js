import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage settings
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "complaints", // Cloudinary folder name
        allowed_formats: ["jpg", "jpeg", "png"],
    },
});

const upload = multer({ storage });

export default upload;
