import { isAuthenticated } from "@lib/auth";
import { NextResponse } from "next/server";
import OpenAI from "openai";
export const runtime = "nodejs"; // <-- important for Clerk to work
import GeneratedPlanSet from "@/models/GeneratedPlan";
// import pricingMap from "@/lib/pricingMap";
const pricingMap = {
  india: { costPerScore: 500, symbol: "₹" },
  usa: { costPerScore: 30, symbol: "$" },
  "united states": { costPerScore: 40, symbol: "$" },
  canada: { costPerScore: 45, symbol: "$" },
  uk: { costPerScore: 50, symbol: "£" },
  "united kingdom": { costPerScore: 60, symbol: "£" },
  australia: { costPerScore: 55, symbol: "A$" },
  germany: { costPerScore: 60, symbol: "€" },
  eu: { costPerScore: 70, symbol: "€" },
  europe: { costPerScore: 75, symbol: "€" },
  "middle east": { costPerScore: 60, symbol: "د.إ" },
  uae: { costPerScore: 56, symbol: "د.إ" },
  qatar: { costPerScore: 70, symbol: "ر.ق" },
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const user = await isAuthenticated(request.headers);
    if (!user)
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    const body = await request.json();
    let { formData, score, country } = body;
    if (!formData || !score || !country) {
      return NextResponse.json(
        { success: false, message: "All feilds are required" },
        { status: 400 }
      );
    }
    console.log(user, "user");
    const now = new Date();
    if (!user.lastPlanGeneratedAt) {
      user.lastPlanGeneratedAt = now;
      user.dailyPlanCount = 0;
      user.plans = [];
      console.log("First-time plan generation");
      await user.save();
    } // 2. If 24 hours have passed since last generation, reset
    else {
      const last = new Date(user.lastPlanGeneratedAt).getTime();
      console.log(now, last, "now and last");
      if (now - last >= 86400000) {
        // 24 hours in milliseconds
        await GeneratedPlanSet.deleteMany({
          _id: { $in: user.plans },
          userId: user._id,
        });
        user.plans = [];
        user.dailyPlanCount = 0;
        user.lastPlanGeneratedAt = now; // ✅ Reset window
        console.log("Resetting plan window after 24 hours");
      } else if (user.dailyPlanCount >= 3) {
        console.log("more than 3");
        const oldTime = new Date(user.lastPlanGeneratedAt).getTime();
        console.log(oldTime, "old time");
        const diffMs = now - oldTime; // difference in milliseconds
        const diffHours = diffMs / (1000 * 60 * 60); // convert to hours

        console.log("Hours passed:", diffHours.toFixed(2));
        const hoursLeft = Math.ceil(24 - diffHours);
        return NextResponse.json(
          {
            success: false,
            message: `You've hit your daily limit. Try again in ${hoursLeft} hour(s).`,
          },
          { status: 403 }
        );
      }
    }

    const key = country.toLowerCase();
    const config = pricingMap[key] || { costPerScore: 25, symbol: "$" };

    let total = score * config.costPerScore;
    let basic = Math.round(total * 0.7);
    let standard = Math.round(total);
    let premium = Math.round(total * 1.3);

    // Formatting function
    const formatPrice = (value, symbol = "₹") => {
      const number = Number(value);
      return symbol === "₹"
        ? number.toLocaleString("en-IN") // e.g., 12,34,567
        : number.toString(); // plain number for others
    };

    basic = formatPrice(basic, config.symbol);
    standard = formatPrice(standard, config.symbol);
    premium = formatPrice(premium, config.symbol);
    // Create the prompt for OpenAI
    const prompt = `
     You are a pricing assistant for a digital agency.

Based on the following user business details and a calculated project score of ${score}, generate **three pricing plans** tailored specifically to the business's needs.

---

📌 **Business Details (analyze this deeply and personalize the plans accordingly):**
${formData}

💸 **Pricing (already calculated – do not change or remove the currency symbol):**
- Basic: ${config.symbol}${basic}
- Standard: ${config.symbol}${standard}
- Premium: ${config.symbol}${premium}

---

📦 Each plan must include:
- A **clear, benefit-focused name** ("Basic", "Standard", "Premium")
- The **correct price** with currency symbol exactly as provided above
- A **description** that explains which type of client the plan is ideal for
- A **customized list of features** (technical + business value) specific to the business type, platform, services selected, and business goals

---

🛠️ Feature Guidelines:
- **Basic** plan: 5–6 essential features suitable for early-stage or budget-conscious businesses
- **Standard** plan: 7–8 features, including all Basic features + enhancements or optimizations
- **Premium** plan: 9–12 features, including all Standard features + advanced/exclusive functionalities

Include:
- Frontend and backend tech (like CMS, dashboards, login, performance)
- Integrations (like analytics, chatbots, APIs, payment gateways)
- Admin or client-side capabilities
- Hosting or maintenance considerations if relevant
- Any AI or automation components if suggested in form data

---

🔁 Output Format (JSON only, do not explain anything outside JSON):

json
[
  {
    "name": "Basic",
    "price": "${config.symbol}${basic}",
    "description": "Perfect for startups and solo founders who need a strong foundation.",
    "features": ["..."]
  },
  {
    "name": "Standard",
    "price": "${config.symbol}${standard}",
    "description": "Great for small to mid-size businesses looking to grow online.",
    "features": ["..."]
  },
  {
    "name": "Premium",
    "price": "${config.symbol}${premium}",
    "description": "Best for growing or funded businesses aiming for scalability and automation.",
    "features": ["..."]
  }
]
json
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates pricing plans. Always return valid JSON only, no additional text.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
      max_tokens: 1400,
      store: true,
    });

    let rawOutput = completion.choices[0].message.content.trim();

    // Remove markdown fences if present
    if (rawOutput.startsWith("```json") || rawOutput.startsWith("```")) {
      rawOutput = rawOutput.replace(/```json|```/g, "").trim();
    }
    const plans = JSON.parse(rawOutput);
    const savedPlan = await GeneratedPlanSet.create({
      userId: user._id,
      businessName: formData?.businessName || "Untitled Business",
      plans,
      createdAt: now,
    });

    // ✅ Push plan ID into user's plans array
    user.plans.push(savedPlan._id);
    user.dailyPlanCount += 1;
    // if (user.dailyPlanCount === 1) {
    //   user.lastPlanGeneratedAt = now;
    // }
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Plan generated successfully",
        plans,
        planId: savedPlan?._id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating pricing plans:",  error);
    return NextResponse.json(
      { message: "Failed to generate pricing plans" },
      { status: 500 }
    );
  }
}
