import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: "https://integrate.api.nvidia.com/v1",
});

export async function POST(req) {
  try {
    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct",
      messages: [
        {
          role: "user",
          content: `
You are a pricing assistant. Based on the answers below, return 3 plans inside plans array (Basic, Standard, Premium) as JSON with:
- name
- best_for
- price ($599–$1999)
- pricing_note (string)
- features: array of { name: string, included: boolean }
In Premium plane add relevant technical depth and business value features
All plans must include the same features. Use included: false if not available in a plan. Only return structured JSON. Do not include explanations.

User needs:
{
  "type": "Web Application",
  "ui_ux": "Need from scratch",
  "design_approach": "Start with design",
  "content": "Partially ready",
  "priority": ["Performance", "Complexity", "Mobile responsive"],
  "management": "Admin dashboard",
  "backend": "Full backend",
  "integration": "Yes",
  "responsive": "Yes",
  "seo": "Yes",
  "timeline": "3–4 Weeks"
}
          `,
        },
      ],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
      stream: true,
    });

    let fullText = '';

    for await (const chunk of completion) {
      fullText += chunk.choices[0]?.delta?.content || '';
    }

    // ✅ Clean up backticks or ```json
    const cleanedText = fullText
      .replace(/^```json/, '')
      .replace(/^```/, '')
      .replace(/```$/, '')
      .trim();

    const parsed = JSON.parse(cleanedText); // Safe if model returns valid JSON
    // console.log(parsed)
    return new Response(JSON.stringify(parsed), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error generating plan:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate pricing plan.' }),
      { status: 500 }
    );
  }
}
