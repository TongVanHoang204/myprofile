import { NextResponse } from "next/server";
import { getNowPlaying, getRecentlyPlayed } from "@/app/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status > 400) {
      // Not playing anything right now, fallback to recently played
      const recentResponse = await getRecentlyPlayed();
      if (recentResponse.status === 204 || recentResponse.status > 400) {
        return NextResponse.json({ isPlaying: false });
      }

      const recentSong = await recentResponse.json();
      if (!recentSong.items || recentSong.items.length === 0) {
        return NextResponse.json({ isPlaying: false });
      }

      const track = recentSong.items[0].track;
      
      const title = track.name;
      const artist = track.artists.map((_artist: any) => _artist.name).join(", ");
      const albumImageUrl = track.album.images[0].url;
      const songUrl = track.external_urls.spotify;

      return NextResponse.json({
        albumImageUrl,
        artist,
        isPlaying: false,
        songUrl,
        title,
      });
    }

    const song = await response.json();

    if (song.item === null) {
      return NextResponse.json({ isPlaying: false });
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist: any) => _artist.name).join(", ");
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;

    return NextResponse.json({
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    });
  } catch (error) {
    return NextResponse.json({ isPlaying: false }, { status: 500 });
  }
}
