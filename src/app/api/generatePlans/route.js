import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { formData, score, country } = body
    console.log(formData,score,country)
    if(!formData || !score || !country){
        return NextResponse.json({ error: "All feilds are required" }, { status: 400 })
    }
    // Calculate pricing based on the formula
    const total = 200 + score * 25
    const basic = Math.round(total * 0.7)
    const standard = total
    const premium = Math.round(total * 1.3)

    // Create the prompt for OpenAI
    const prompt = `
      Based on the following business requirements and a calculated score of ${score}, generate three pricing plans.
      
      Business Details:
      ${formData}
      
      Pricing (already calculated):
      - Basic: $${basic}
      - Standard: $${standard}
      - Premium: $${premium}
      
      Generate a JSON response with exactly this structure:
      [
        {
          "name": "Basic",
          "price": ${basic},
          "description": "Perfect for small businesses and startups",
          "features": [5-6 relevant features based on the business type and selected service]
        },
        {
          "name": "Standard",
          "price": ${standard},
          "description": "Ideal for growing businesses",
          "features": [7-8 relevant features, including all Basic features plus more]
        },
        {
          "name": "Premium",
          "price": ${premium},
          "description": "Best for established businesses seeking maximum impact",
          "features": [9-10 premium features, including all Standard features plus exclusive ones]
        }
      ]
      
      Make the features specific to their business type and goals. Return only valid JSON.
    `

    const completion = await openai.chat.completions.create({
     model: "",
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
      max_tokens: 1000,
      store: true
    })

    const plans = JSON.parse(completion.choices[0].message.content)
    console.log(plans)
    return NextResponse.json({ plans })
  } catch (error) {
    console.error("Error generating pricing plans:", error)
    return NextResponse.json({ error: "Failed to generate pricing plans" }, { status: 500 })
  }
}