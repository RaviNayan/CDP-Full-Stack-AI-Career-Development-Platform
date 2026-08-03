"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

export const generateAIInsights = async (industry) => {
  const prompt = `
Analyze the current state of the ${industry} industry in INDIA and provide insights in ONLY the following JSON format without any additional notes or explanations.

{
  "salaryRanges": [
    {
      "role": "string",
      "min": number,
      "max": number,
      "median": number,
      "location": "string"
    }
  ],
  "growthRate": number,
  "demandLevel": "High" | "Medium" | "Low",
  "topSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "marketOutlook": "Positive" | "Neutral" | "Negative",
  "keyTrends": ["trend1", "trend2", "trend3", "trend4", "trend5"],
  "recommendedSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"]
}

IMPORTANT RULES:

1. Assume the country is INDIA.
2. Salary values MUST be annual salaries in Indian Rupees (INR).
3. Return salary values as integers only.
4. DO NOT include ₹ symbols, commas, "LPA", or any text in salary values.
5. Use realistic Indian salary data.
6. Use common Indian cities like Bangalore, Hyderabad, Pune, Chennai, Mumbai, Delhi, Noida and Gurugram.
7. Include at least 5 common job roles.
8. Growth rate should be a percentage.
9. Include at least 5 top skills.
10. Include at least 5 key trends.
11. Include at least 5 recommended skills.
12. Return ONLY valid JSON.

Example salary format:

{
  "role": "Software Engineer",
  "min": 600000,
  "max": 1400000,
  "median": 900000,
  "location": "Bangalore"
}
`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

  return JSON.parse(cleanedText);
};

export async function getIndustryInsights() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  // Generate insights if they don't already exist
  if (!user.industryInsight) {
    const insights = await generateAIInsights(user.industry);

    const industryInsight = await db.industryInsight.create({
      data: {
        industry: user.industry,
        ...insights,
        nextUpdate: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ),
      },
    });

    return industryInsight;
  }

  return user.industryInsight;
}