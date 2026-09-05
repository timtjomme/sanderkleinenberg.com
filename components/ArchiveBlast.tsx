"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import FiveKMark from "@/components/FiveKMark";
import { useSoundCloudPlayer } from "@/components/SoundCloudPlayer";

type Memory = {
  type: "PHOTO" | "VIDEO" | "DJ SET";
  year: string;
  title: string;
  copy: string;
  href: string;
  cta: string;
  image?: string;
  videoId?: string;
  credit?: string;
};

const memories: Memory[] = [
  {
    type: "PHOTO",
    year: "2013",
    title: "THE 88 ERA",
    copy: "A press image from the 5K years. One frame from a different version of the story.",
    href: "/story/",
    cta: "Open the archive",
    image: "/images/sander-press-2013.jpg",
    credit: "Photo: SKphotos / CC BY 3.0",
  },
  {
    type: "VIDEO",
    year: "2000",
    title: "MY LEXICON",
    copy: "The official video for a progressive-house landmark—one of the signals that travelled far beyond the first dancefloor.",
    href: "https://www.youtube.com/watch?v=CW4aURZ6hWA",
    cta: "Watch the official video ↗",
    image: "/images/archive-in-motion.png",
    videoId: "CW4aURZ6hWA",
  },
  {
    type: "VIDEO",
    year: "2004",
    title: "THE FRUIT",
    copy: "A restless 2004 club record, with an official video that captures a different turn in the story.",
    href: "https://www.youtube.com/watch?v=Has8ZGPqQJc",
    cta: "Watch the official video ↗",
    videoId: "Has8ZGPqQJc",
  },
  {
    type: "DJ SET",
    year: "2001",
    title: "NUBREED 004",
    copy: "A long-form, two-disc journey from the Global Underground era. Start anywhere; stay for the arc.",
    href: "https://soundcloud.com/guarchive/global-underground-nubreed-4",
    cta: "Play the full mix ↗",
  },
  {
    type: "DJ SET",
    year: "2001",
    title: "ESSENTIAL MIX",
    copy: "Sander Kleinenberg’s BBC Radio 1 Essential Mix — 6 September 2001.",
    href: "https://soundcloud.com/emcguire/sander-kleinenberg-essential-mix-06-09-2001",
    cta: "Play the full mix ↗",
  },
];

// The server has no way to guess which memory the client will draw, so both the
// static HTML and the first client render use index 0 and the random offset is
// only applied once we know we are hydrated. `useSyncExternalStore` reads that
// "am I on the client yet?" flag without a setState-in-an-effect cascade.
const subscribeToHydration = () => () => {};
const isHydratedOnClient = () => true;
const isHydratedOnServer = () => false;

export default function ArchiveBlast() {
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    isHydratedOnClient,
    isHydratedOnServer,
  );
  const [start] = useState(() => Math.floor(Math.random() * memories.length));
  const [step, setStep] = useState(0);
  const { track, isPlaying, play, pause } = useSoundCloudPlayer();
  const index = hydrated ? (start + step) % memories.length : 0;
  const memory = memories[index];

  const next = () => setStep((current) => (current + 1) % memories.length);
  const external = memory.href.startsWith("http");

  return (
    <section className="blast-section" aria-labelledby="blast-title">
      <div className="site-shell">
        <div className="blast-heading">
          <div>
            <p className="eyebrow">LOOK BACK / PLAY FORWARD</p>
            <h2 id="blast-title">A BLAST FROM<br />THE PAST.</h2>
          </div>
          <p>Every time, a different part of the story: a photograph, a film, or a set that still holds the room.</p>
        </div>

        <article className={`blast-card blast-${memory.type.toLowerCase().replace(" ", "-")}`}>
          <div className="blast-visual">
            {memory.type === "VIDEO" && memory.videoId ? (
                <iframe
                  className="blast-video-frame"
                  src={`https://www.youtube-nocookie.com/embed/${memory.videoId}?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`}
                  title={`Sander Kleinenberg — ${memory.title} (official video)`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
            ) : memory.image ? (
                <Image
                  src={memory.image}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 100vw, 50vw"
                  className="blast-image"
                />
            ) : (
              <div className="set-visual">
                <FiveKMark />
                <div className="set-wave"><i /><i /><i /><i /><i /><i /><i /></div>
                <button
                  type="button"
                  className="blast-play-set"
                  onClick={() => track?.href === memory.href && isPlaying ? pause() : play({ href: memory.href, title: memory.title, subtitle: memory.year })}
                >
                  {track?.href === memory.href && isPlaying ? "Pause set" : "Play in site player"}
                </button>
              </div>
            )}
            {memory.credit && <span className="image-credit">{memory.credit}</span>}
          </div>
          <div className="blast-copy">
            <div className="blast-meta"><span>{memory.type}</span><span>{memory.year}</span></div>
            <h3>{memory.title}</h3>
            <p>{memory.copy}</p>
            {memory.type === "DJ SET" ? (
              <button
                type="button"
                className="text-link text-link-button"
                onClick={() => track?.href === memory.href && isPlaying ? pause() : play({ href: memory.href, title: memory.title, subtitle: memory.year })}
              >
                {track?.href === memory.href && isPlaying ? "Pause set" : memory.cta}
              </button>
            ) : (
              <a
                href={memory.href}
                className="text-link"
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {memory.cta}
              </a>
            )}
            <button type="button" onClick={next} className="next-memory">
              Another memory <span>→</span>
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
