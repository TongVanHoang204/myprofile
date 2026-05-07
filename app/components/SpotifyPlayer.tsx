"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Loader2, ChevronDown, Play, Pause,
  SkipBack, SkipForward, Volume2, VolumeX, Headphones, Disc3, X, Music2
} from "lucide-react";
import { useMusicStore } from "@/app/store/musicStore";

type Track = {
  id: string;
  title: string;
  artist: string;
  albumImageUrl: string | null;
  songUrl: string | null;
  spotifySearchUrl: string;
};

type SpotifyPlayerProps = {
  variant?: "default" | "three-d";
};

const DEFAULT_QUERY = "Lofi Hip Hop Việt Nam 2024";
const PAGE_SIZE = 20;

function formatTime(s: number) {
  const mins = Math.floor(s / 60);
  const secs = Math.floor(s % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// ── RGB Visualizer (Extracted to prevent remounting) ─────────────────────────
const Visualizer = ({ isSmall = false, isPlaying, mounted }: { isSmall?: boolean, isPlaying: boolean, mounted: boolean }) => {
  if (!mounted) return <div className={isSmall ? "h-3 w-10" : "h-6 w-24"} />;
  
  const barCount = isSmall ? 15 : 40;
  const bars = Array.from({ length: barCount }, (_, i) => i);

  return (
    <div className={`flex items-end gap-[1.5px] ${isSmall ? "h-3" : "h-6"}`}>
      {bars.map((i) => {
        // Tạo các độ cao ngẫu nhiên liên tục để mô phỏng sự nhạy của sóng nhạc
        const h1 = 15 + Math.random() * 20;
        const h2 = 50 + Math.random() * 50;
        const h3 = 30 + Math.random() * 40;
        const h4 = 60 + Math.random() * 40;
        const h5 = 15 + Math.random() * 20;
        
        // Tốc độ nảy cực nhanh để tạo cảm giác "nhạy"
        const duration = 0.2 + Math.random() * 0.2;
        
        // Dải màu cầu vồng trải dài từ trái sang phải
        const color = `hsl(${(i / barCount) * 360}, 100%, 50%)`;

        return (
          <motion.div
            key={i}
            animate={
              isPlaying
                ? { height: [`${h1}%`, `${h2}%`, `${h3}%`, `${h4}%`, `${h5}%`] }
                : { height: "15%" }
            }
            transition={{
              height: { 
                duration: duration, 
                repeat: Infinity, 
                repeatType: "mirror",
                ease: "easeInOut" 
              }
            }}
            style={{
              backgroundColor: isPlaying ? color : "#ffffff33",
              boxShadow: isPlaying ? `0 0 6px ${color}` : "none",
            }}
            className={`${isSmall ? "w-[1.5px]" : "w-[2px]"} rounded-t-sm`}
          />
        );
      })}
    </div>
  );
};

export default function SpotifyPlayer({ variant = "default" }: SpotifyPlayerProps) {
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState(DEFAULT_QUERY);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [mounted, setMounted] = useState(false);

  const playerRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ── Mount guard ──────────────────────────────────────────────────────────────
  useEffect(() => { setMounted(true); }, []);

  // ── YouTube Search ───────────────────────────────────────────────────────────
  const fetchTracks = useCallback(async (q: string, token: string | null = null, append = false) => {
    if (append) setIsLoadingMore(true);
    else setIsSearching(true);
    try {
      const url = `/api/music/search?q=${encodeURIComponent(q)}&limit=${PAGE_SIZE}${token ? `&pageToken=${token}` : ""}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setTracks((prev) => (append ? [...prev, ...(data.tracks ?? [])] : data.tracks ?? []));
      setNextPageToken(data.nextPageToken || null);
    } catch (err) {
      console.error("Music fetch error:", err);
    } finally {
      setIsSearching(false);
      setIsLoadingMore(false);
    }
  }, []);

  useEffect(() => { fetchTracks(DEFAULT_QUERY); }, [fetchTracks]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setActiveQuery(query.trim());
    await fetchTracks(query.trim());
  };

  // ── YouTube Player API ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const first = document.getElementsByTagName("script")[0];
      first.parentNode?.insertBefore(tag, first);
    }

    const initPlayer = () => {
      if ((window as any).YT && !playerRef.current) {
        playerRef.current = new (window as any).YT.Player("youtube-hidden-player", {
          height: "0",
          width: "0",
          videoId: "",
          playerVars: { autoplay: 0, controls: 0, disablekb: 1, fs: 0, modestbranding: 1 },
          events: {
            onStateChange: (event: any) => {
              const state = event.data;
              if (state === 1) {
                setIsPlaying(true);
                setDuration(playerRef.current.getDuration());
                playerRef.current.setVolume(volume);
                startTimer();
              } else if (state === 2) {
                setIsPlaying(false);
                stopTimer();
              } else if (state === 0) {
                setIsPlaying(false);
                stopTimer();
                playNext();
              }
            },
          },
        });
      }
    };

    (window as any).onYouTubeIframeAPIReady = initPlayer;
    if ((window as any).YT?.Player && !playerRef.current) initPlayer();
    return () => { stopTimer(); };
  }, []);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (playerRef.current?.getCurrentTime) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 500);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const setNowPlaying = useMusicStore((s) => s.setNowPlaying);

  const togglePlay = (track: Track) => {
    if (!playerRef.current) return;
    if (playingId === track.id) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setNowPlaying(track.title, track.artist, false);
      } else {
        playerRef.current.playVideo();
        setNowPlaying(track.title, track.artist, true);
      }
      return;
    }
    setPlayingId(track.id);
    setNowPlaying(track.title, track.artist, true);
    playerRef.current.loadVideoById(track.id);
    playerRef.current.playVideo();
  };

  const playNext = () => {
    if (!playingId || tracks.length === 0) return;
    const idx = tracks.findIndex((t) => t.id === playingId);
    if (idx < tracks.length - 1) togglePlay(tracks[idx + 1]);
  };

  const playPrev = () => {
    if (!playingId || tracks.length === 0) return;
    const idx = tracks.findIndex((t) => t.id === playingId);
    if (idx > 0) togglePlay(tracks[idx - 1]);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(volume);
    } else {
      playerRef.current.mute();
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (playerRef.current) {
      playerRef.current.setVolume(val);
      if (val > 0 && isMuted) { playerRef.current.unMute(); setIsMuted(false); }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    playerRef.current?.seekTo(time, true);
  };



  const currentlyPlaying = tracks.find((t) => t.id === playingId);

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <motion.div
      drag
      dragMomentum={false}
      className="fixed bottom-4 right-4 z-50 cursor-grab active:cursor-grabbing sm:bottom-6 sm:right-6"
    >
      {/* ── Avatar-Style Spinning Border Shell ── */}
      <div className="relative overflow-hidden rounded-[1.8rem] p-[2px] shadow-2xl shadow-black/50">
        {/* Rotating conic gradient layer (Avatar style) - Always running */}
        <div className="absolute inset-[-100%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_240deg,#0ea5e9_300deg,#a855f7_330deg,#ffffff_360deg)] opacity-100 blur-sm" />
        <div className="absolute inset-[-100%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_240deg,#0ea5e9_300deg,#a855f7_330deg,#ffffff_360deg)] opacity-60 blur-xl" />

        {/* Solid inner card — sits on top, covers the center */}
        <div
          className={`relative z-10 bg-[#0b0710] rounded-[1.7rem] transition-all duration-300 ${
            isMinimized ? "p-2" : "w-[calc(100vw-2rem)] p-4 sm:w-[22rem] sm:p-6"
          }`}
        >
          {/* YouTube player target — must always exist in DOM */}
          <div id="youtube-hidden-player" className="hidden" />

          {isMinimized ? (
            /* ── MINIMIZED ──────────────────────────────────────────────────── */
            <div className="flex items-center justify-center">
              <button
                onClick={() => setIsMinimized(false)}
                className={`group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                  currentlyPlaying
                    ? "bg-violet-500/10 text-violet-400 hover:bg-violet-500/20"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                title="Mở rộng"
              >
                <Music2 className={`h-5 w-5 ${isPlaying ? "animate-[spin_4s_linear_infinite]" : ""}`} />
                {isPlaying && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-violet-400/20" />
                )}
                
                {/* Tooltip hint on hover */}
                {currentlyPlaying && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black/80 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {currentlyPlaying.title}
                  </div>
                )}
              </button>
            </div>
          ) : (
            /* ── EXPANDED ───────────────────────────────────────────────────── */
            <div onPointerDownCapture={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Music2 className="h-5 w-5 text-violet-400" />
                  <Visualizer isPlaying={isPlaying} mounted={mounted} />
                </div>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-white/40 transition-colors hover:text-white/90"
                  title="Thu gọn"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>

              {/* Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Nhập tên bài hát..."
                    className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-12 pr-24 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
                  />
                  <Search className="absolute left-4 h-5 w-5 text-white/30" />
                  <button
                    type="submit"
                    disabled={isSearching || !query.trim()}
                    className="absolute right-2 rounded-full bg-violet-500 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-violet-600 disabled:opacity-40"
                  >
                    {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Tìm"}
                  </button>
                </div>
              </form>

              {/* Track List */}
              <div>
                {isSearching ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-white/40" />
                  </div>
                ) : tracks.length === 0 ? (
                  <p className="py-6 text-center text-sm text-white/40">Chưa có bài hát. Hãy thử tìm kiếm!</p>
                ) : (
                  <>
                    <div className="mt-2 max-h-52 space-y-0.5 overflow-y-auto rounded-xl border border-white/10 bg-black/30 p-1.5">
                      {tracks.map((track, idx) => (
                        <div
                          key={`${track.id}-${idx}`}
                          onClick={() => togglePlay(track)}
                          className={`group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                            playingId === track.id
                              ? "border border-violet-500/30 bg-violet-500/20"
                              : "hover:bg-white/8"
                          }`}
                        >
                          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-black/20">
                            {track.albumImageUrl && (
                              <Image src={track.albumImageUrl} alt={track.title} fill className="object-cover" unoptimized />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={`truncate text-sm font-semibold ${playingId === track.id ? "text-violet-300" : "text-white/90"}`}>
                              {track.title}
                            </p>
                            <p className="truncate text-xs text-white/40">{track.artist}</p>
                          </div>
                          <Disc3 className="h-4 w-4 flex-shrink-0 text-violet-400 opacity-0 transition-opacity group-hover:opacity-100" />
                          <div
                            className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-all ${
                              playingId === track.id && isPlaying
                                ? "bg-violet-500 text-white"
                                : "bg-white/10 text-white/60 opacity-0 group-hover:opacity-100"
                            }`}
                          >
                            {playingId === track.id && isPlaying
                              ? <Pause className="h-3.5 w-3.5" />
                              : <Play className="h-3.5 w-3.5 ml-0.5" />
                            }
                          </div>
                        </div>
                      ))}
                    </div>

                    {nextPageToken && (
                      <button
                        onClick={() => fetchTracks(activeQuery, nextPageToken, true)}
                        disabled={isLoadingMore}
                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-xs font-semibold text-white/60 transition-colors hover:bg-white/10 hover:text-white/90 disabled:opacity-40"
                      >
                        {isLoadingMore
                          ? <Loader2 className="h-4 w-4 animate-spin" />
                          : <><ChevronDown className="h-4 w-4" />Tải thêm</>
                        }
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Player Bar */}
              {currentlyPlaying && (
                <div className="mt-4 rounded-[1.25rem] border border-white/10 bg-black/40 p-4">
                  <div className="mb-3">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="flex-1 truncate text-sm font-bold text-white">{currentlyPlaying.title}</h4>
                      <Visualizer isSmall isPlaying={isPlaying} mounted={mounted} />
                    </div>
                    <div className="mt-0.5 flex items-center justify-between">
                      <p className="text-[10px] text-white/40">{formatTime(currentTime)} / {formatTime(duration)}</p>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-red-500/60">YouTube</p>
                    </div>
                  </div>

                    <div 
                      className="flex items-center gap-3"
                      onPointerDownCapture={(e) => e.stopPropagation()}
                    >
                      {/* Controls */}
                      <div className="flex items-center gap-2">
                      <button onClick={playPrev} className="text-white/30 transition-colors hover:text-white/80">
                        <SkipBack className="h-3.5 w-3.5 fill-current" />
                      </button>
                      <button
                        onClick={() => togglePlay(currentlyPlaying)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-white shadow-lg shadow-violet-500/30 transition-transform hover:scale-105 hover:bg-violet-400 active:scale-95"
                      >
                        {isPlaying
                          ? <Pause className="h-3.5 w-3.5 fill-current" />
                          : <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                        }
                      </button>
                      <button onClick={playNext} className="text-white/30 transition-colors hover:text-white/80">
                        <SkipForward className="h-3.5 w-3.5 fill-current" />
                      </button>
                    </div>

                    {/* Progress */}
                    <div className="flex-1">
                      <input
                        type="range"
                        min={0}
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1 cursor-pointer appearance-none rounded-full bg-white/10 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-400 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(167,139,250,0.8)]"
                      />
                    </div>

                    {/* Volume */}
                    <div className="flex items-center gap-1">
                      <button onClick={toggleMute} className="text-white/30 transition-colors hover:text-white/80">
                        {isMuted || volume === 0
                          ? <VolumeX className="h-3.5 w-3.5" />
                          : <Volume2 className="h-3.5 w-3.5" />
                        }
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-12 h-1 cursor-pointer appearance-none rounded-full bg-white/10 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
