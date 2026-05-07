import { create } from "zustand";

interface MusicStore {
  playingTitle: string | null;
  playingArtist: string | null;
  isPlaying: boolean;
  setNowPlaying: (title: string | null, artist: string | null, playing: boolean) => void;
}

export const useMusicStore = create<MusicStore>((set) => ({
  playingTitle: null,
  playingArtist: null,
  isPlaying: false,
  setNowPlaying: (title, artist, playing) =>
    set({ playingTitle: title, playingArtist: artist, isPlaying: playing }),
}));
