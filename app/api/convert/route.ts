import aj from "@/lib/arcjet";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const RATE_LIMIT_ENABLED = process.env.RATE_LIMIT_ENABLED === "true";
console.log("RATE_LIMIT_ENABLED", RATE_LIMIT_ENABLED);

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

    const prompt = `Convert the following text to professional markdown format optimized for dev.to.
  Only use content from the provided text - do not add any additional content, text, or commentary.

  Key requirements:
  - Use appropriate heading levels (H1, H2, H3)
  - Apply markdown syntax for emphasis and lists
  - Maintain all URLs and image references exactly as provided
  - Ensure proper spacing between sections
  - Format code blocks with language-specific syntax highlighting
  - Create readable paragraphs with clear breaks
  - For lists, use bullet points or numbered lists as they appear in the original
  - Add relevant tags only if explicitly mentioned in content
  - For tables, use standard markdown table syntax with headers and aligned columns

  Text to convert:
  ${text}`;

    const result = await model.generateContent(prompt);
    const response =  result.response;
    const markdown = response.text();

    return NextResponse.json({ markdown });
  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json(
      { error: "Failed to convert text to markdown" },
      { status: 500 }
    );
  }
}
