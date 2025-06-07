// pages/api/get-single-plan/[id].js
import connectDB from "@/lib/db";
import GeneratedPlanSet from "@/models/GeneratedPlan";
import { isAuthenticated } from "@lib/auth";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
  await connectDB();
  const {id} = await params // Use params.id if available, otherwise use context.params.id
  console.log(id, "id from params");  
  if (!id) {
    return NextResponse.json(
      {
        success: false,
        message: "ID parameter is required",
      },
      { status: 400 }
    );
  }
  // ✅ Check if id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid ID format.",
      },
      { status: 400 }
    );
  }
  // ✅ Check if user is authenticated
     const user = await isAuthenticated(req.headers);
      if (!user)
        return NextResponse.json(
          { success: false, message: "Not authenticated" },
          { status: 401 }
        );
  try {
    const plan = await GeneratedPlanSet.findById(id);
    if (!plan) {
      return NextResponse.json(
        {
          success: false,
          message: `Plan not found`,
        },
        { status: 404 }
      );
    }
    if (plan.userId.toString() !== user._id.toString()) {
      return NextResponse.json({ success: false, message: "Access denied" }, { status: 403 });
    }

    return NextResponse.json(
      {
        success: true,
        plan,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      {
        success: false,
        message: "Unable to get plan",
      },
      { status: 500 }
    );
  }
}
