"use client";

import { useEffect, useRef } from "react";

const posts = [
  { id: "DcY9dyKjDyB", kind: "p", alt: "Sander Kleinenberg Instagram post from August 2026" },
  { id: "DcVv-d3DN0V", kind: "p", alt: "Sander Kleinenberg Instagram post from August 2026" },
  { id: "DbXyXQJjPdX", kind: "p", alt: "Sander Kleinenberg Instagram post from July 2026" },
  { id: "DaLLKufsw1T", kind: "reel", alt: "Sander Kleinenberg Instagram reel from June 2026" },
  { id: "DaFiAv1sjI0", kind: "reel", alt: "Sander Kleinenberg Instagram reel from June 2026" },
  { id: "DZBANXDjATB", kind: "p", alt: "Sander Kleinenberg Instagram post from May 2026" },
  {
    id: "DYzs1tckalG",
    kind: "p",
    author: "panorama.sessions",
    alt: "Panorama Sessions Instagram post featuring Sander Kleinenberg",
  },
  { id: "DYxjw7GMT30", kind: "reel", alt: "Sander Kleinenberg Instagram reel from May 2026" },
  { id: "DYZx4GLsy45", kind: "p", alt: "Sander Kleinenberg Instagram post from May 2026" },
  {
    id: "DYVOrY8NBhm",
    kind: "reel",
    author: "iocerouno",
    alt: "Instagram reel featuring Sander Kleinenberg from May 2026",
  },
  { id: "DYM9rjSjJ7I", kind: "p", alt: "Sander Kleinenberg Instagram post from May 2026" },
  { id: "DYC--Z8DMnX", kind: "p", alt: "Sander Kleinenberg Instagram post from May 2026" },
];

export default function InstagramScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = scrollRef.current;
    if (!rail || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let paused = false;
    const halfWidth = () => rail.scrollWidth / 2;
    const tick = () => {
      if (!paused) {
        rail.scrollLeft += 0.38;
        if (rail.scrollLeft >= halfWidth()) rail.scrollLeft -= halfWidth();
      }
      frame = window.requestAnimationFrame(tick);
    };
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    const loopManualScroll = () => {
      if (rail.scrollLeft >= halfWidth()) rail.scrollLeft -= halfWidth();
    };

    rail.addEventListener("pointerenter", pause);
    rail.addEventListener("pointerleave", resume);
    rail.addEventListener("focusin", pause);
    rail.addEventListener("focusout", resume);
    rail.addEventListener("scroll", loopManualScroll, { passive: true });
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      rail.removeEventListener("pointerenter", pause);
      rail.removeEventListener("pointerleave", resume);
      rail.removeEventListener("focusin", pause);
      rail.removeEventListener("focusout", resume);
      rail.removeEventListener("scroll", loopManualScroll);
    };
  }, []);

  const renderPost = (post: (typeof posts)[number], copy = false) => {
    const author = post.author ?? "sanderkleinenberg";
    return (
      <a
        key={`${post.id}-${copy ? "copy" : "original"}`}
        href={`https://www.instagram.com/${author}/${post.kind}/${post.id}/`}
        target="_blank"
        rel="noopener noreferrer"
        className="instagram-post"
        aria-hidden={copy || undefined}
        tabIndex={copy ? -1 : undefined}
      >
        {/* Static export runs no image optimizer (next.config.ts sets
            `images: { unoptimized: true }`), so next/image would emit these
            same bytes while forcing intrinsic sizes onto a CSS-sized marquee. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/images/instagram/${post.id}.jpg`} alt={copy ? "" : post.alt} loading="lazy" />
      </a>
    );
  };

  return (
    <section className="instagram-section" id="visuals" aria-label="Instagram photo scroll">
      <div className="instagram-scroll" ref={scrollRef}>
        <div className="instagram-track">
          {posts.map((post) => renderPost(post))}
          {posts.map((post) => renderPost(post, true))}
        </div>
      </div>
    </section>
  );
}
