"use client";

import { useEffect, type CSSProperties } from "react";
import { deepestMixtapes } from "@/lib/deepest-mixtapes";
import { useSoundCloudPlayer } from "@/components/SoundCloudPlayer";

function formatTime(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, "0")}`;
}

export default function DeepestMixtapes() {
  const { track, isPlaying, position, duration, artworkUrl, play, load, pause, seek } = useSoundCloudPlayer();
  const active = deepestMixtapes.find((mixtape) => mixtape.href === track?.href) ?? deepestMixtapes[0];

  useEffect(() => {
    if (!track) {
      load({
        href: deepestMixtapes[0].href,
        title: `THE DEEPEST MIXTAPE #${deepestMixtapes[0].number}`,
        subtitle: "SANDER KLEINENBERG",
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playMixtape = (href: string, number: string | number) => {
    play({
      href,
      title: `THE DEEPEST MIXTAPE #${number}`,
      subtitle: "SANDER KLEINENBERG",
    });
  };

  return (
    <div className="deepest-mixtapes">
      {/* Artwork comes from SoundCloud at runtime, so a plain <img> keeps
          i1.sndcdn.com off the next/image remote-pattern allowlist. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="deepest-mixtapes-artwork"
        src={artworkUrl ?? "/images/5k-original.png"}
        alt={`${track?.title ?? "Sander Kleinenberg"} cover art`}
      />
      <p className="eyebrow">THE DEEPEST MIXTAPES</p>
      <div className="deepest-mixtapes-now-playing">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={artworkUrl ?? "/images/5k-original.png"} alt="" />
        <div className="onsite-player-meta">
          <p>SANDER KLEINENBERG RADIO</p>
          <strong>{track?.title ?? `THE DEEPEST MIXTAPE #${active.number}`}</strong>
        </div>
        <button
          type="button"
          className="onsite-player-play"
          onClick={() => track?.href === active.href && isPlaying ? pause() : playMixtape(active.href, active.number)}
          aria-label={track?.href === active.href && isPlaying ? "Pause mixtape" : "Play mixtape"}
        >
          {track?.href === active.href && isPlaying ? "Ⅱ" : "▶"}
        </button>
      </div>
      <div className="deepest-mixtapes-progress">
        <input
          type="range"
          min="0"
          max={Math.max(duration, 1)}
          value={Math.min(position, Math.max(duration, 1))}
          step="1000"
          onChange={(event) => seek(Number(event.target.value))}
          aria-label={`Seek through ${track?.title ?? `The Deepest Mixtape #${active.number}`}`}
          style={{ "--progress": `${duration ? (position / duration) * 100 : 0}%` } as CSSProperties}
        />
        <div><span>{formatTime(position)}</span><span>{formatTime(duration)}</span></div>
      </div>
      <div className="deepest-mixtapes-queue" aria-label="Deepest Mixtape playlist">
        {deepestMixtapes.map((mixtape) => (
          <button
            key={mixtape.href}
            type="button"
            onClick={() => playMixtape(mixtape.href, mixtape.number)}
            aria-pressed={mixtape.href === track?.href}
          >
            <span>#{mixtape.number}</span>
            <span>{mixtape.href === track?.href && isPlaying ? "Playing" : "Play"}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
