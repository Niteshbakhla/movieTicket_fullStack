import express from "express";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
            try {
                        const token = req.cookies?.token || req.headers?.authorization.split(" ")[1]
                        if (!token) {
                                    return res.status(401).json({ success: false, message: "Unauthorized" })
                        }

                        const decoded = jwt.verify(token, process.env.JWT_SECRET);
                        req.user = decoded
                        next()
            } catch (error) {
                        return res.status(400).json({ error: "Invalid token!" })
            }
}

export const isAdmin = (req, res, next) => {
            if (req.user.role !== "admin") {
                        return res.status(403).json({ success: false, message: "Access denied ❌" });
            }
            next();
};