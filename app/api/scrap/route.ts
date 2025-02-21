import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(request: Request) {
  try {
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
