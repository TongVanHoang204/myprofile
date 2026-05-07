"use client";

import { useState } from "react";
import Image from "next/image";
import { SiSpotify } from "react-icons/si";
import { Search, Loader2 } from "lucide-react";

type Track = {
  id: string;
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
  previewUrl: string | null;
};

export default function SpotifyPlayer() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.tracks || []);
      }
    } catch (error) {
      console.error("Search error", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full space-y-4 rounded-3xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60 sm:p-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
          <SiSpotify className="text-xl text-[#1DB954]" />
          Spotify Player
        </h3>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="relative w-full">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a song..."
            className="w-full rounded-full border border-slate-200 bg-white/50 py-3 pl-12 pr-4 text-sm text-slate-800 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-200"
          />
          <Search className="absolute left-4 h-5 w-5 text-slate-400" />
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="absolute right-2 rounded-full bg-sky-500 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-sky-600 disabled:opacity-50"
          >
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
          </button>
        </div>
      </form>

      {/* Search Results */}
      {results.length > 0 && !selectedTrackId && (
        <div className="mt-4 space-y-2 max-h-64 overflow-y-auto rounded-xl border border-slate-100 bg-white/50 p-2 dark:border-slate-800 dark:bg-slate-800/30 custom-scrollbar">
          {results.map((track) => (
            <div
              key={track.id}
              onClick={() => setSelectedTrackId(track.id)}
              className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
                <Image src={track.albumImageUrl} alt={track.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">{track.title}</p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">{track.artist}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Spotify Embed Player */}
      {selectedTrackId && (
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-black/5">
          <div className="flex justify-between items-center p-2 bg-slate-100/50 dark:bg-slate-800/50">
            <span className="text-xs font-semibold text-slate-500">Now Playing</span>
            <button 
              onClick={() => setSelectedTrackId(null)}
              className="text-xs text-sky-500 hover:text-sky-600 font-medium"
            >
              Change Track
            </button>
          </div>
          <iframe
            src={`https://open.spotify.com/embed/track/${selectedTrackId}`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-b-xl"
          ></iframe>
        </div>
      )}
    </div>
  );
}
