import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Convert the following text to professional markdown format optimized for dev.to.

Key requirements:
- Use appropriate heading levels (H1, H2, H3)
- Apply markdown syntax for emphasis and lists
- Maintain all URLs and image references
- Ensure proper spacing between sections
- Format code blocks with language-specific syntax highlighting
- Create readable paragraphs with clear breaks
- Add relevant tags if mentioned in content

Text to convert:
${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
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
