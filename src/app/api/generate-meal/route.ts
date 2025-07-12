import { NextRequest } from "next/server";
import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY environment variable is not set");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const validateNutrition = (calories: number, protein: number, fat: number, carbs: number) => {
  console.log("🔍 Validating nutrition values:", { calories, protein, fat, carbs });

  if (calories < 800 || calories > 4000) return false;
  if (protein < 20 || protein > 300) return false;
  if (fat < 10 || fat > 200) return false;
  if (carbs < 50 || carbs > 500) return false;

  console.log("✅ Nutrition values are valid");
  return true;
};

export async function POST(req: NextRequest) {
  console.log("🚀 API Request received");

  try {
    const body = await req.json();
    console.log("📦 Request body:", body);

    const { calories, protein, fat, carbs } = body;

    if (
      typeof calories !== "number" ||
      typeof protein !== "number" ||
      typeof fat !== "number" ||
      typeof carbs !== "number"
    ) {
      return new Response("Invalid data types. All values must be numbers.", { status: 400 });
    }

    if (!validateNutrition(calories, protein, fat, carbs)) {
      return new Response("Nutritional values are out of reasonable range.", { status: 400 });
    }

    const prompt = `
Create a realistic Japanese-style daily meal plan based on the following nutrition goals:

- Calories: ${calories} kcal  
- Protein: ${protein}g  
- Fat: ${fat}g  
- Carbohydrates: ${carbs}g  

Split the plan into 4 parts:
- Breakfast  
- Lunch  
- Dinner  
- Snack / Supplements  

For each meal, list several common Japanese dishes using everyday ingredients (e.g. rice, fish, tofu, miso, vegetables).  
Each item should include dish name, amount in grams (g), and macronutrients in g (Protein / Fat / Carbs).
Please ensure that the total protein, fat, and carbohydrate values across all meals are within ±5g of the target values.  
The total calories should be close to ${calories} kcal, but macronutrients are the top priority.

Return the meal plan in **natural Japanese text**, using the following format exactly:

---

🥣 朝食（approx. ○○ kcal）  
・[dish name] [amount in grams]（/ P: yg / F: zg / C: xg）  
・...  
🔹 合計：/ P: yyg / F: zzg / C: xxg / xxx kcal

---

🍱 昼食（○○ kcal）  
・...

---

🍽 夕食（○○ kcal）  
・...

---

🍌 間食・補助（○○ kcal）  
・...

---

✅ 1日合計：  
Calories: ${calories} kcal  
Protein: ${protein}g  
Fat: ${fat}g  
Carbohydrates: ${carbs}g  

Respond **only in Japanese**.  
No explanations or JSON. Format strictly as shown above.
`;

    console.log("🤖 Sending request to OpenAI...");
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const result = response.choices[0]?.message?.content || "";
    console.log("📄 GPT response (text):", result);

    return new Response(result, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (err: any) {
    console.error("💥 API error:", err);
    return new Response("Internal server error occurred.", { status: 500 });
  }
}
