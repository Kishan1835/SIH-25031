import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc Register
export const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const user = await User.create({ name, email, phone, password });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            token: generateToken(user._id, user.role),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
