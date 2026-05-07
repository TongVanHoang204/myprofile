"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiSpotify } from "react-icons/si";

type SpotifyData = {
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export default function SpotifyPlayer() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpotify = async () => {
      try {
        const res = await fetch("/api/spotify");
        if (res.ok) {
          const spotifyData = await res.json();
          setData(spotifyData);
        }
      } catch (error) {
        console.error("Error fetching Spotify data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpotify();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchSpotify, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-24 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white/50 dark:border-slate-800 dark:bg-slate-900/50">
        <SiSpotify className="animate-pulse text-2xl text-slate-400" />
      </div>
    );
  }

  if (!data?.songUrl) {
    return null;
  }

  return (
    <div className="group relative flex w-full items-center overflow-hidden rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur-md transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 sm:p-5">
      <Link
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10"
      >
        <span className="sr-only">Play on Spotify</span>
      </Link>
      
      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md shadow-sm sm:h-16 sm:w-16">
        <Image
          src={data.albumImageUrl}
          alt={data.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <SiSpotify className="text-xl text-white" />
        </div>
      </div>

      <div className="ml-4 flex min-w-0 flex-col justify-center">
        <div className="flex items-center gap-2">
          <SiSpotify className="text-xs text-[#1DB954]" />
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {data.isPlaying ? "Now Playing" : "Recently Played"}
          </p>
          {data.isPlaying && (
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1DB954] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1DB954]"></span>
            </span>
          )}
        </div>
        <p className="truncate text-base font-bold text-slate-900 dark:text-slate-100 sm:text-lg">
          {data.title}
        </p>
        <p className="truncate text-sm text-slate-600 dark:text-slate-300">
          {data.artist}
        </p>
      </div>
    </div>
  );
}
