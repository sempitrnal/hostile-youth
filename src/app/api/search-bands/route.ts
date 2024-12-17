import { NextResponse } from 'next/server';
import { client } from '@/sanity/client';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || '';

    const BANDS_QUERY = `*[
        _type == "band" 
        && defined(slug.current)
        && (
          bandName match "*${query}*" 
          || bandDescription match "*${query}*"
        )
      ]|order(publishedAt desc)[0...12]{
        _id, bandName, slug, bandDescription, publishedAt, image, body
      }`;
    const bands = await client.fetch(BANDS_QUERY);
    return NextResponse.json(bands);
  } catch (error) {
    console.error('Error fetching bands:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bands' },
      { status: 500 },
    );
  }
}
