"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import FiveKMark from "@/components/FiveKMark";

type Memory = {
  type: "PHOTO" | "VIDEO" | "DJ SET";
  year: string;
  title: string;
  copy: string;
  href: string;
  cta: string;
  image?: string;
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
  },
  {
    type: "DJ SET",
    year: "2001",
    title: "NUBREED 004",
    copy: "A long-form, two-disc journey from the Global Underground era. Start anywhere; stay for the arc.",
    href: "https://soundcloud.com/sanderkleinenberg",
    cta: "Explore the mixes ↗",
  },
];

export default function ArchiveBlast() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * memories.length));
  }, []);

  const memory = memories[index];
  const next = () => setIndex((current) => (current + 1) % memories.length);
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
            {memory.image ? (
              <Image
                src={memory.image}
                alt=""
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
                className="blast-image"
              />
            ) : (
              <div className="set-visual" aria-hidden="true">
                <FiveKMark />
                <div className="set-wave"><i /><i /><i /><i /><i /><i /><i /></div>
              </div>
            )}
            {memory.type === "VIDEO" && <span className="play-mark" aria-hidden="true">▶</span>}
            {memory.credit && <span className="image-credit">{memory.credit}</span>}
          </div>
          <div className="blast-copy">
            <div className="blast-meta"><span>{memory.type}</span><span>{memory.year}</span></div>
            <h3>{memory.title}</h3>
            <p>{memory.copy}</p>
            <a
              href={memory.href}
              className="text-link"
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {memory.cta}
            </a>
            <button type="button" onClick={next} className="next-memory">
              Another memory <span>→</span>
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
