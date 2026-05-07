import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@/app/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("q");
    const offset = parseInt(searchParams.get("offset") || "0", 10);
    const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 50);

    if (!query) {
      return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
    }

    const tokenData = await getAccessToken();
    const access_token = tokenData?.access_token;

    if (!access_token) {
      return NextResponse.json(
        { error: "Failed to get Spotify access token", detail: tokenData?.error_description ?? "Unknown" },
        { status: 502 }
      );
    }

    const SEARCH_ENDPOINT = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}&offset=${offset}`;
    const response = await fetch(SEARCH_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error(`[Spotify] Search failed ${response.status}:`, errBody);
      return NextResponse.json({ error: "Spotify API Error", detail: errBody }, { status: response.status });
    }

    const data = await response.json();
    const tracks = (data.tracks?.items ?? []).map((track: any) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((a: any) => a.name).join(", "),
      // Lấy ảnh nhỏ nhất >= 64px để tránh 404 với ảnh lớn không tồn tại
      albumImageUrl:
        (track.album.images ?? []).find((img: any) => img.width >= 64)?.url ??
        track.album.images?.[track.album.images.length - 1]?.url ??
        null,
      songUrl: track.external_urls.spotify,
      previewUrl: track.preview_url,
    }));

    return NextResponse.json({
      tracks,
      total: data.tracks?.total ?? 0,
      offset,
      limit,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[Spotify] Internal error:", message);
    return NextResponse.json({ error: "Internal Server Error", detail: message }, { status: 500 });
  }
}
