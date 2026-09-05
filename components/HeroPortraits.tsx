"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const portraits = [
  { src: "/images/hero/sander-portrait-wix.jpg", position: "center 42%" },
  { src: "/images/hero/sander-portrait-google.jpg", position: "62% center" },
  { src: "/images/hero/sander-portrait-tubantia.jpg", position: "center" },
] as const;

export default function HeroPortraits() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % portraits.length);
    }, 7500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="hero-portraits" role="img" aria-label="Sander Kleinenberg">
      {portraits.map((portrait, index) => (
        <Image
          key={portrait.src}
          src={portrait.src}
          alt=""
          aria-hidden="true"
          fill
          priority={index === 0}
          sizes="100vw"
          className={`hero-image hero-portrait${index === activeIndex ? " is-active" : ""}`}
          style={{ objectPosition: portrait.position }}
        />
      ))}
    </div>
  );
}
