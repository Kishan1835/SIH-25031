import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
            // Example: "Sanitation", "Streetlight", etc.
        },
        contactEmail: {
            type: String,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        },
        contactPhone: {
            type: String,
            trim: true,
            match: [/^\+?[0-9]{7,15}$/, "Invalid phone number"],
        },
        officers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // officer accounts
            },
        ],
    },
    { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);
export default Department;
