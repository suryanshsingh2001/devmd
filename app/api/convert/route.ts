import aj from "@/lib/arcjet";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const RATE_LIMIT_ENABLED = process.env.RATE_LIMIT_ENABLED === "true";

export async function POST(req: Request) {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied() && RATE_LIMIT_ENABLED) {
      const timeLeft = decision.ttl;

      return NextResponse.json(
        {
          text: `Whoa there, speed racer! 🏎️ You're going too fast. Take a day before trying again.`,
        },
        { status: 429 }
      );
    }

    const { text } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `DO NOT PARAPHRASE OR MODIFY THE CONTENT IN ANY WAY! Your task is ONLY to convert the text to markdown format.

    STRICT REQUIREMENTS:
    1. Keep ALL original content exactly as provided - word for word
    2. Only add markdown syntax for formatting
    3. DO NOT add, remove, or change any words
    4. DO NOT summarize or rewrite anything

    Convert using these markdown elements:
    - Use appropriate heading levels (H1, H2, H3)
    - Apply markdown syntax for emphasis and lists
    - Keep all URLs and image references exactly as provided
    - Maintain proper spacing between sections
    - Format code blocks with language-specific syntax highlighting
    - Create readable paragraphs with clear breaks
    - For lists, use bullet points or numbered lists as they appear in the original
    - Add relevant tags only if explicitly mentioned in content
    - For tables, use standard markdown table syntax with headers and aligned columns

    Text to convert (KEEP EXACTLY AS IS):
    ${text}`;

    const result = await model.generateContent(prompt);
    const response =  result.response;
    const markdown = response.text();


    console.log("Conversion result:", markdown);
    return NextResponse.json({ markdown });
  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json(
      { error: "Failed to convert text to markdown" },
      { status: 500 }
    );
  }
}
