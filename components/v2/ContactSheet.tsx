"use client";

import Image from "next/image";
import { useState } from "react";
import { flyers, type PastEvent } from "@/lib/v2/archive";
import FlyerBox from "./FlyerBox";

/**
 * A contact sheet of the real flyers. Capped rather than dumping all of them —
 * the grid stays a texture you scan, and the browser stays honest.
 */
const SHEET = flyers.slice(0, 120);

export default function ContactSheet() {
  const [flyer, setFlyer] = useState<PastEvent | null>(null);

  return (
    <>
      <div className="v2-sheet">
        {SHEET.map((event, index) => (
          <button
            key={(event.flyerFront ?? "") + index}
            type="button"
            className="v2-sheet-cell"
            onClick={() => setFlyer(event)}
            aria-label={`${event.title}, ${event.venue} — open flyer`}
          >
            <Image
              src={event.flyerFront!}
              alt=""
              fill
              sizes="120px"
              loading="lazy"
            />
          </button>
        ))}
      </div>
      <FlyerBox event={flyer} onClose={() => setFlyer(null)} />
    </>
  );
}
