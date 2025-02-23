import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import aj from "@/lib/arcjet";

const RATE_LIMIT_ENABLED = process.env.RATE_LIMIT_ENABLED === "true";

export async function POST(request: Request) {
  try {
    const decision = await aj.protect(request);

    if (decision.isDenied() && RATE_LIMIT_ENABLED) {
      const timeLeft = decision.ttl;
      //convert to minutes
      const minutesTimeLeft = Math.floor(timeLeft / 60);


      return NextResponse.json(
        {
          text: `Slow down! You're going too fast. Please wait ${minutesTimeLeft} minutes before trying again.`,
        },
        { status: 429 }
      );
    }
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        {
          success: false,
          error: "URL is required",
        },
        { status: 400 }
      );
    }

    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Handle both Medium and Peerlist articles
    let content = "";

    if (url.includes("medium.com")) {
      content = $("article").text().trim();
    } else if (url.includes("peerlist.io")) {
      content = $(".peerlist-blog").text().trim();
    }

    return NextResponse.json({
      success: true,
      data: content,
    });
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to scrape content",
      },
      { status: 500 }
    );
  }
}
