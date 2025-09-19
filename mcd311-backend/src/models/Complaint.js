import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        category: {
            type: String,
            enum: [
                "Sanitation",
                "Streetlight",
                "Water",
                "Roads",
                "Parks",
                "Animals",
                "Others",
            ],
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            minlength: 30,
            maxlength: 500,
            trim: true,
        },

        photos: [
            {
                type: String,
                validate: {
                    validator: function (url) {
                        return /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i.test(url);
                    },
                    message: "Invalid photo URL format",
                },
            },
        ],

        location: {
            latitude: { type: Number, required: true, min: -90, max: 90 },
            longitude: { type: Number, required: true, min: -180, max: 180 },
            address: { type: String, required: true, trim: true },
        },

        status: {
            type: String,
            enum: ["Pending", "In Progress", "Resolved"],
            default: "Pending",
        },

        // Instead of storing officer directly,
        // AI assigns a department (relation to Department collection)
        assignedDepartment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            default: null,
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Later an officer/admin user
        },
    },
    { timestamps: true }
);

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;
