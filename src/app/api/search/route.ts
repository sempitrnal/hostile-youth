import { client } from "@/sanity/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  if (!query) {
    return NextResponse.json({ news: [], bands: [] });
  }

  // Sanity Search Query
  const SEARCH_QUERY = `
    {
      "news": *[_type == "post" && (
        title match "*${query}*" ||
        description match "*${query}*" ||
        tags[] match "*${query}*"
      )]{ _id, title, slug, publishedAt, image, description },

      "bands": *[_type == "band" && (
        bandName match "*${query}*" ||
        bandDescription match "*${query}*"
      )]{ _id, bandName, slug, image, bandDescription }
    }
  `;

  try {
    const results = await client.fetch(SEARCH_QUERY);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Failed to fetch search results" });
  }
}
