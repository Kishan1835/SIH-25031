import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: {
        type: String,
        enum: ["Sanitation", "Streetlight", "Water", "Roads", "Parks", "Animals", "Others"],
        required: true
    },
    description: { type: String, required: true },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        address: { type: String }
    },
    photos: [String],   // store photo URLs
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Resolved"],
        default: "Pending"
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Admin/Officer
}, { timestamps: true });

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;
