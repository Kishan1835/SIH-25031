import Complaint from "../models/Complaint.js";

// @desc Create complaint
export const createComplaint = async (req, res) => {
    try {
        const { category, description, latitude, longitude, address } = req.body;

        const complaint = new Complaint({
            userId: req.user.id, // from auth middleware
            category,
            description,
            location: { latitude, longitude, address },
            photos: req.files ? req.files.map(file => file.path) : [] // Cloudinary URLs
        });

        await complaint.save();
        res.status(201).json({ message: "Complaint registered", complaint });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// @desc Get all complaints (filterable)
export const getComplaints = async (req, res) => {
    try {
        const { category, status } = req.query;
        let filter = {};
        if (category) filter.category = category;
        if (status) filter.status = status;

        const complaints = await Complaint.find(filter).populate("userId", "name email");
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc Get single complaint
export const getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id).populate("userId", "name email");
        if (!complaint) return res.status(404).json({ message: "Complaint not found" });
        res.json(complaint);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc Update complaint status (Admin)
export const updateComplaintStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) return res.status(404).json({ message: "Complaint not found" });

        complaint.status = status || complaint.status;
        await complaint.save();
        res.json(complaint);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc Delete complaint (Admin only)
export const deleteComplaint = async (req, res) => {
    try {
        await Complaint.findByIdAndDelete(req.params.id);
        res.json({ message: "Complaint deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
