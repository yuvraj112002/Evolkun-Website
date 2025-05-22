export async function POST(req) {
  try {

    // const { prompt } = await req.json();
    const prompt = `You are a pricing assistant for a digital agency. Based on the inputs and total score below, return a JSON array of 3 plans: Basic, Standard, and Premium.

📌 Use this pricing formula:
- Total = 200 + (23 × 25) = 775
- Basic = round(775 × 0.7) = 543
- Standard = 775
- Premium = round(775 × 1.3) = 1008

Use JavaScript-style Math.round(). Prices must be numbers only.

---

🧩 Important:
Use a single, unified feature list across all 3 plans.

For each feature, set included: true or included: false depending on which plans offer that feature.

❗Even if a feature is not available in a plan, it MUST still appear in the features array with included: false. Do not omit any features.

Each plan must include:
- name (Basic / Standard / Premium)
- best_for (short use case)
- price (in USD)
- pricing_note (explain what’s included)
- features: array of { name: string, included: boolean }

---
🎯 Use this feature list extracted from user needs:
[
  "UI/UX Design from scratch",
  "Start with design approach",
  "Partially ready content support",
  "Performance optimization",
  "Complex logic handling",
  "Mobile responsive design",
  "Admin dashboard",
  "Full backend development",
  "3rd Party Integration",
  "SEO Optimization"
]

Plan tier logic:
- Basic = ~4–5 features only
- Standard = most features
- Premium = all features

---

Output only valid JSON. No explanations. No markdown. No formulas. Only resolved numbers.
`

    // Edge Case 1: Prompt is missing or empty
    if (!prompt || typeof prompt !== "string") {
      return new Response(JSON.stringify({
        error: "Invalid prompt. Please provide a valid string prompt."
      }), { status: 400 });
    }

    // NVIDIA API Call
    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-8b-instruct",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0,
        top_p: 1,
        max_tokens: 1000
      })
    });

    // Edge Case 2: API fails (non-200 status)
    if (!response.ok) {
      const text = await response.text(); // fallback for HTML errors like 503
      return new Response(JSON.stringify({
        error: "NVIDIA API error",
        status: response.status,
        details: text
      }), { status: 503 });
    }

    const aiResult = await response.json();
    console.log(aiResult,"aoasndoasnf")
    // Edge Case 3: No response or choices
    const rawText = aiResult.choices?.[0]?.message?.content;
    if (!rawText) {
      return new Response(JSON.stringify({
        error: "AI response is empty or malformed",
        raw: aiResult
      }), { status: 500 });
    }

    // Clean and parse JSON safely
    const cleaned = rawText.trim().replace(/```json|```/g, "");
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      return new Response(JSON.stringify({
        error: "Failed to parse JSON from AI response",
        cleanedText: cleaned,
        raw: rawText
      }), { status: 500 });
    }

    // ✅ All good
    return new Response(JSON.stringify(parsed), {
      headers: {
        "Content-Type": "application/json"
      },
      status: 200
    });

  } catch (err) {
    // Edge Case 4: Catch all unexpected errors
    return new Response(JSON.stringify({
      error: "Unexpected server error",
      message: err.message,
      stack: err.stack
    }), { status: 500 });
  }
}