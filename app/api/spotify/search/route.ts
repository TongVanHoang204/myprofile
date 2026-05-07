import { NextRequest, NextResponse } from "next/server";
import { searchTracks } from "@/app/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
    }

    const response = await searchTracks(query);

    if (response.status > 400) {
      return NextResponse.json({ error: "Spotify API Error" }, { status: response.status });
    }

    const data = await response.json();
    const tracks = data.tracks?.items?.map((track: any) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((a: any) => a.name).join(", "),
      albumImageUrl: track.album.images[0]?.url,
      songUrl: track.external_urls.spotify,
      previewUrl: track.preview_url,
    })) || [];

    return NextResponse.json({ tracks });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
