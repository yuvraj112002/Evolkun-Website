// /api/extract-features/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const { idea } = await req.json();
     if (!idea ) {
      return NextResponse.json({ message: "Idea is required." }, { status: 400 });
    }
  const prompt = `
You are a senior mobile application developer.

Your job is to extract and suggest the key features required to build an app based on the user’s input.

user input 
${idea}
⚠️ Important rules:
- Only respond if the idea clearly describes an *application* (like mobile apps, delivery apps, service-based apps, etc.).
- If the idea is about a *website* (e.g., portfolio site, static site, blog, home page, contact form), then stop and say:
  "❌ This survey is for app development only. Please use the web development survey for website-related projects."

✅ If valid:
- List the 10 **main core features** needed for the application (as per a real development project).
- Use professional names like:
  - User Authentication
  - Push Notifications
  - Real-time Chat
  - In-app Payments
  - Admin Dashboard
- Do not add features that sound like marketing websites or blogs.
- Keep it short, 7–10 bullet points only.
- Output just the bullet list of feature names — no extra comments.

Example idea: "Rent bikes in your city with tracking"
Output:
- User Signup & Login
- Bike Listing System
- Booking & Scheduling
- Live GPS Tracking
- Payment Integration
- Ride History Dashboard
- Push Notifications
`;

try {
    

  const completion = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    }),
  });
    if (!completion.ok) {
      const errorData = await completion.json();
      return NextResponse.json(
        { message: "OpenAI API error", details: errorData },
        { status: completion.status }
      );
    }
  const data = await completion.json();

  const rawText = data.choices?.[0]?.message?.content || "";

  const features = rawText
    .split("\n")
    .map((line) => line.replace(/^[-*•\d. ]+/g, "").trim())
    .filter(Boolean);

  return NextResponse.json({ features });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Something went wrong while processing your request." },
      { status: 500 }
    );
}
}
