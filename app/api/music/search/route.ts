import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("q");
    const limit = Math.min(parseInt(searchParams.get("limit") || "25", 10), 50);
    const pageToken = searchParams.get("pageToken") || "";
    
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!query) {
      return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
    }

    if (!apiKey) {
      return NextResponse.json({ error: "YouTube API Key is not configured" }, { status: 500 });
    }

    // Add music-specific keywords to force YouTube to return songs/OSTs instead of movies or irrelevant videos
    // We add "audio", "lyrics", "OST", "bài hát" to the query, and exclude common movie terms
    const musicQuery = `${query} (official audio OR official video OR lyrics OR bài hát OR OST) -phim -tập -movie`;
    
    // YouTube Data API v3 Search
    const YOUTUBE_ENDPOINT = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(musicQuery)}&maxResults=${limit}&type=video&videoCategoryId=10&key=${apiKey}${pageToken ? `&pageToken=${pageToken}` : ""}`;

    const response = await fetch(YOUTUBE_ENDPOINT, { cache: "no-store" });

    if (!response.ok) {
      const errData = await response.json();
      console.error("[YouTube API Error]", errData);
      return NextResponse.json({ error: "YouTube API Error", detail: errData }, { status: response.status });
    }

    const data = await response.json();

    const tracks = (data.items ?? []).map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'"),
      artist: item.snippet.channelTitle,
      album: "YouTube Video",
      albumImageUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
      previewUrl: null, // We'll use the videoId to play via YouTube Embed API
      songUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      spotifySearchUrl: `https://open.spotify.com/search/${encodeURIComponent(item.snippet.title)}`,
      durationMs: 0, // YouTube search doesn't return duration, need separate call or just estimate
    }));

    return NextResponse.json({
      tracks,
      total: data.pageInfo?.totalResults ?? tracks.length,
      nextPageToken: data.nextPageToken || null,
      source: "youtube",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: "Internal Server Error", detail: message }, { status: 500 });
  }
}
