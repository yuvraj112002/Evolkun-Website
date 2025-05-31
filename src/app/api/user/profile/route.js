// Structure: /app/api/user/profile/route.js
import { isAuthenticated } from "@/lib/auth";

export async function GET(req) {
  const user = await isAuthenticated(req.headers);
  if (!user) return Response.json({ success: false, message: "Not authenticated" }, { status: 401 });

  return Response.json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
    },
  });
}