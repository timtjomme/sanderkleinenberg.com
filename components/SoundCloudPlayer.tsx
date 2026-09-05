"use client";

import { createContext, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type SoundCloudTrack = { href: string; title: string; subtitle?: string };

type SoundCloudPlayerContextValue = {
  track: SoundCloudTrack | null;
  isPlaying: boolean;
  position: number;
  duration: number;
  artworkUrl: string | null;
  play: (track: SoundCloudTrack) => void;
  load: (track: SoundCloudTrack) => void;
  pause: () => void;
  seek: (position: number) => void;
};

const SoundCloudPlayerContext = createContext<SoundCloudPlayerContextValue | null>(null);

type SoundCloudWidget = {
  bind: (event: string, callback: (progress?: { currentPosition?: number }) => void) => void;
  play: () => void;
  pause: () => void;
  load: (url: string, options: { auto_play?: boolean; callback?: () => void }) => void;
  seekTo: (position: number) => void;
  getDuration: (callback: (duration: number) => void) => void;
  getCurrentSound: (callback: (sound: { artwork_url?: string | null; user?: { avatar_url?: string | null } }) => void) => void;
};

type SoundCloudApi = {
  Widget: ((iframe: HTMLIFrameElement) => SoundCloudWidget) & {
    Events: { READY: string; PLAY: string; PAUSE: string; FINISH: string; PLAY_PROGRESS: string };
  };
};

declare global {
  interface Window { SC?: SoundCloudApi }
}

let soundCloudApiPromise: Promise<SoundCloudApi> | null = null;

function getSoundCloudApi() {
  if (window.SC) return Promise.resolve(window.SC);
  if (soundCloudApiPromise) return soundCloudApiPromise;

  soundCloudApiPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://w.soundcloud.com/player/api.js";
    script.onload = () => window.SC ? resolve(window.SC) : reject(new Error("SoundCloud player API unavailable"));
    script.onerror = () => reject(new Error("SoundCloud player API failed to load"));
    document.head.appendChild(script);
  });

  return soundCloudApiPromise;
}

function embedUrl(href: string) {
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(href)}&color=%23102f87&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false`;
}

function formatTime(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, "0")}`;
}

export function SoundCloudPlayerProvider({ children }: { children: ReactNode }) {
  const [track, setTrack] = useState<SoundCloudTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [artworkUrl, setArtworkUrl] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const widgetRef = useRef<SoundCloudWidget | null>(null);
  const widgetBoundRef = useRef(false);
  const widgetReadyRef = useRef(false);
  const shouldPlayRef = useRef(false);

  useEffect(() => {
    getSoundCloudApi().catch(() => undefined);
  }, []);

  const configureWidget = (iframe: HTMLIFrameElement) => {
    getSoundCloudApi()
      .then((api) => {
        const widget = api.Widget(iframe);
        widgetRef.current = widget;
        const updateDuration = () => widget.getDuration((nextDuration) => setDuration(nextDuration));
        const updateArtwork = () => widget.getCurrentSound((sound) => {
          const artwork = sound.artwork_url ?? sound.user?.avatar_url ?? null;
          setArtworkUrl(artwork?.replace("-large", "-t500x500") ?? null);
        });

        if (widgetBoundRef.current) return;

        widgetBoundRef.current = true;
        widget.bind(api.Widget.Events.READY, () => {
          widgetReadyRef.current = true;
          updateDuration();
          updateArtwork();
          if (shouldPlayRef.current) {
            widget.play();
            shouldPlayRef.current = false;
          }
        });
        widget.bind(api.Widget.Events.PLAY, () => setIsPlaying(true));
        widget.bind(api.Widget.Events.PAUSE, () => setIsPlaying(false));
        widget.bind(api.Widget.Events.FINISH, () => setIsPlaying(false));
        widget.bind(api.Widget.Events.PLAY_PROGRESS, (progress) => setPosition(progress?.currentPosition ?? 0));
        updateDuration();
        updateArtwork();

        // The widget accepts commands while it is completing its ready cycle.
        // Sending the intent here keeps a visitor's very first click inside the
        // original browser gesture instead of waiting for a second click.
        if (shouldPlayRef.current) {
          widget.play();
          shouldPlayRef.current = false;
        }
      })
      .catch(() => setIsPlaying(false));
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!track || !iframe) return;

    const trackChanged = iframe.dataset.track !== track.href;
    const shouldPlay = shouldPlayRef.current;

    if (trackChanged) {
      iframe.dataset.track = track.href;
      setIsPlaying(false);
      setPosition(0);
      setDuration(0);
      setArtworkUrl(null);

      if (widgetRef.current) {
        const widget = widgetRef.current;
        widget.load(track.href, {
          auto_play: shouldPlay,
          callback: () => {
            widget.getDuration((nextDuration) => setDuration(nextDuration));
            widget.getCurrentSound((sound) => {
              const artwork = sound.artwork_url ?? sound.user?.avatar_url ?? null;
              setArtworkUrl(artwork?.replace("-large", "-t500x500") ?? null);
            });
            if (shouldPlayRef.current) {
              widget.play();
              shouldPlayRef.current = false;
            }
          },
        });
      } else {
        widgetBoundRef.current = false;
        widgetReadyRef.current = false;
        iframe.addEventListener("load", () => configureWidget(iframe), { once: true });
        iframe.src = embedUrl(track.href);
      }
    } else if (shouldPlay && widgetRef.current) {
      widgetRef.current.play();
      shouldPlayRef.current = false;
    }
  }, [track]);

  const play = (nextTrack: SoundCloudTrack) => {
    if (track?.href === nextTrack.href && widgetRef.current) {
      // Do not wait for READY here. The command is deliberately sent from the
      // click itself, which is the moment browsers permit embedded audio to
      // begin. READY still supplies a fallback for a just-created widget.
      widgetRef.current.play();
      shouldPlayRef.current = false;
      return;
    }

    shouldPlayRef.current = true;
    setTrack(nextTrack);
  };

  const load = (nextTrack: SoundCloudTrack) => {
    shouldPlayRef.current = false;
    setTrack(nextTrack);
  };

  const pause = () => {
    if (widgetRef.current) {
      widgetRef.current.pause();
    } else {
      const iframe = iframeRef.current;
      if (iframe) getSoundCloudApi().then((api) => api.Widget(iframe).pause()).catch(() => undefined);
    }
    setIsPlaying(false);
  };

  const seek = (nextPosition: number) => {
    if (widgetRef.current) {
      widgetRef.current.seekTo(nextPosition);
    } else {
      const iframe = iframeRef.current;
      if (iframe) getSoundCloudApi().then((api) => api.Widget(iframe).seekTo(nextPosition)).catch(() => undefined);
    }
    setPosition(nextPosition);
  };

  return (
    <SoundCloudPlayerContext.Provider value={{ track, isPlaying, position, duration, artworkUrl, play, load, pause, seek }}>
      {children}
      <iframe ref={iframeRef} className="soundcloud-engine" title="SoundCloud audio engine" allow="autoplay" />
      {track && (
        <aside className="soundcloud-dock" aria-label="Now playing">
          <div className="soundcloud-dock-header">
            {/* Remote SoundCloud artwork: a plain <img> keeps i1.sndcdn.com
                off the next/image remote-pattern allowlist. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {artworkUrl && <img src={artworkUrl} alt="" />}
            <div>
              <p>NOW PLAYING</p>
              <strong>{track.title}</strong>
              {track.subtitle && <span>{track.subtitle}</span>}
            </div>
            <button type="button" onClick={() => { pause(); setTrack(null); }} aria-label="Close player">×</button>
          </div>
          <div className="soundcloud-dock-controls">
            <button type="button" onClick={() => isPlaying ? pause() : play(track)}>{isPlaying ? "Pause" : "Play"}</button>
            <span>SoundCloud</span>
          </div>
          <div className="soundcloud-dock-progress">
            <input
              type="range"
              min="0"
              max={Math.max(duration, 1)}
              value={Math.min(position, Math.max(duration, 1))}
              step="1000"
              onChange={(event) => seek(Number(event.target.value))}
              aria-label={`Seek through ${track.title}`}
              style={{ "--progress": `${duration ? (position / duration) * 100 : 0}%` } as CSSProperties}
            />
            <div><span>{formatTime(position)}</span><span>{formatTime(duration)}</span></div>
          </div>
        </aside>
      )}
    </SoundCloudPlayerContext.Provider>
  );
}

export function useSoundCloudPlayer() {
  const player = useContext(SoundCloudPlayerContext);
  if (!player) throw new Error("useSoundCloudPlayer must be used inside SoundCloudPlayerProvider");
  return player;
}
