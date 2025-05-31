import { isAuthenticated } from "@lib/auth";
import { NextResponse } from "next/server";
import OpenAI from "openai";
export const runtime = "nodejs"; // <-- important for Clerk to work
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
      return Response.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    const body = await request.json();
    const { formData, score, country } = body;

    console.log(formData, score, country);
    if (!formData || !score || !country) {
      return NextResponse.json(
        { error: "All feilds are required" },
        { status: 400 }
      );
    }

    const TWO_HOURS = 2 * 60 * 60 * 1000; // in milliseconds
    const now = new Date();

    // if (user.lastPlanGeneratedAt) {
    //   const elapsed = now - new Date(user.lastPlanGeneratedAt);
    //   if (elapsed < TWO_HOURS) {
    //     const waitMinutes = Math.ceil((TWO_HOURS - elapsed) / 60000);
    //     return new Response(
    //       JSON.stringify({
    //         success: false,
    //         message: `Please wait ${waitMinutes} more minutes to generate another plan.`,
    //       }),
    //       { status: 403 }
    //     );
    //   }
    // }
    const key = country.toLowerCase();
    const config = pricingMap[key] || { costPerScore: 25, symbol: "$" };

    const total = score * config.costPerScore;
    const basic = Math.round(total * 0.7);
    const standard = Math.round(total);
    const premium = Math.round(total * 1.3);
    console.log(basic, standard, premium, config.symbol);
    // Create the prompt for OpenAI
    const prompt = `
      Based on the following business requirements and a calculated score of ${score}, generate three pricing plans.
      
      Business Details:
      ${formData}
      
      Pricing (already calculated) don't change currency:
      basic: ${config.symbol}${basic},
      standard: ${config.symbol}${standard},
      premium: ${config.symbol}${premium}

      Generate a JSON response with exactly this structure:
      [
        {
          "name": "Basic",
          "price":${config.symbol}${basic},
          "description": "Perfect for small businesses and startups",
          "features": [5-6 relevant features based on the business type and selected service]
        },
        {
          "name": "Standard",
          "price": ${config.symbol}${standard},
          "description": "Ideal for growing businesses",
          "features": [7-8 relevant features, including all Basic features plus more]
        },
        {
          "name": "Premium",
          "price": ${config.symbol}${premium},
          "description": "Best for established businesses seeking maximum impact",
          "features": [9-10 premium features, including all Standard features plus exclusive ones]
        }
      ]
      
      Make the features specific to their business type and goals. Return only valid JSON with given currency.
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
      temperature: 0,
      max_tokens: 1400,
      store: true,
    });

    let rawOutput = completion.choices[0].message.content.trim();

    // Remove markdown fences if present
    if (rawOutput.startsWith("```json") || rawOutput.startsWith("```")) {
      rawOutput = rawOutput.replace(/```json|```/g, "").trim();
    }

    const plans = JSON.parse(rawOutput);
    user.lastPlanGeneratedAt = now;
    await user.save();

    console.log(plans);
    return NextResponse.json(
      {
        success: true,
        message: "Plan generated successfully",
        plans,
        generatedAt:Date.now(now)
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating pricing plans:", error);
    return NextResponse.json(
      { error: "Failed to generate pricing plans" },
      { status: 500 }
    );
  }
}
