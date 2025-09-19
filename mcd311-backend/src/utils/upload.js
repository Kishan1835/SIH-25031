import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
// console.log('upload.js - process.env.NODE_ENV:', process.env.NODE_ENV);
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


console.log("--- Inside Cloudinary Log Block ---");
console.log("🔑 Cloudinary Config Loaded:");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY ? "✅ Loaded" : "❌ Missing");
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "✅ Loaded" : "❌ Missing");


// Storage settings
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "complaints",
        allowed_formats: ["jpg", "jpeg", "png"],
    },
});

// Multer with file size limit (15 MB per file)
const upload = multer({
    storage,
    limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB
});

export default upload;
