// 'use server';
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // Only works inside route handlers
import User from "@/models/User"; // Adjust this to your path
import connectDB from "./db";

export const isAuthenticated = async (requestHeaders) => {
  try {
    connectDB()
    const cookieHeader = requestHeaders.get("cookie");
    if (!cookieHeader) return null;

    const tokenMatch = cookieHeader.match(/token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;
    console.log("Token from cookie:", token);
    console.log(token)
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    const user = await User.findById(decoded.id);
    return user || null;
  } catch (error) {
    console.error("isAuthenticated error:", error);
    return null;
  }
};
