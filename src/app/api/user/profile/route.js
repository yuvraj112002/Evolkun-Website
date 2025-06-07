// Structure: /app/api/user/profile/route.js
import { isAuthenticated } from "@/lib/auth";
import GeneratedPlanSet from "@/models/GeneratedPlan"
import { NextResponse } from "next/server";
export async function GET(req) {
  const user = await isAuthenticated(req.headers);
  if (!user) return Response.json({ success: false, message: "Not authenticated" }, { status: 401 });
   // Clean up invalid plan IDs
    const validPlans = await GeneratedPlanSet.find({ _id: { $in: user.plans } });
    if (validPlans.length !== user.plans.length) {
      user.plans = validPlans.map(p => p._id);
      await user.save();
    }

    const remainingPlansToday = 3 - user.dailyPlanCount;

    return NextResponse.json({
      success: true,
      user:{
        name: user.name,
        email: user.email,
        dailyPlanCount: user.dailyPlanCount,
        remainingPlansToday,
        profileImage: user.profileImage,
        plans: validPlans, // or sanitize if needed
      }
    });
  // return Response.json({
  //   success: true,
  //   user: {
  //     id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     profileImage: user.profileImage,
  //   },
  // });
}