import _config from "../config/config.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
            try {
                        const { name, email, password } = req.body;

                        if (!name || !email || !password) {
                                    return res.status(400).json({ success: false, message: "Fields are required" })
                        }
                        const isUserExist = await User.findOne({ email });

                        if (isUserExist) {
                                    return res.status(409).json({ success: false, message: "User already exist" })
                        }
                        const user = new User({
                                    name,
                                    email,
                                    password
                        })

                        await user.save();

                        return res.status(201).json({ success: true, message: "Register successfully", user })
            } catch (error) {
                        return res.status(500).json({ success: false, message: "Server error", error: error.message })
            }
}


export const login = async (req, res) => {
            try {
                        const { email, password } = req.body;

                        if (!email || !password) {
                                    return res.status(400).json({ success: false, message: "All fields ( email, password) are required" })
                        }
                        const isUserExist = await User.findOne({ email })


                        if (!isUserExist) {
                                    return res.status(401).json({
                                                success: false,
                                                message: "Invalid email or password. Please check your credentials or reset your password.",
                                    });
                        }
                        const isMatch = await isUserExist.comparePassword(password)

                        if (!isMatch) {
                                    return res.status(401).json({
                                                success: false,
                                                message: "Invalid email or password. Please check your credentials or reset your password.",
                                    });
                        }

                        const payload = {
                                    id: isUserExist._id,
                                    name: isUserExist.name,
                                    email: isUserExist.email,
                                    role: isUserExist.role
                        }
                        const token = jwt.sign(payload, _config.JWT_SECRET);
                        res.cookie("token", token, {
                                    httpOnly: true,
                                    secure: true,
                                    sameSite: "Strict",
                                    maxAge: 24 * 60 * 60 * 1000,
                        });
                        return res.status(200).json({
                                    success: true,
                                    message: "Login successfully",
                                    token
                        })

            } catch (error) {
                        console.error("Login error:", error);
                        return res.status(500).json({
                                    success: false,
                                    message: "Server error ",
                                    error: error.message
                        })
            }
}

export const logout = async (req, res) => {
            res.clearCookie("token")
            return res.status(200).json({ success: true, message: "Logged out successfully" })
}