"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { PastEvent } from "@/lib/v2/archive";

const longDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(iso: string) {
  return longDate.format(new Date(iso + "T12:00:00Z"));
}

/** One flyer, blown up. Shared by the ledger's night list and the contact sheet. */
export default function FlyerBox({
  event,
  onClose,
}: {
  event: PastEvent | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!event) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [event, onClose]);

  if (!event?.flyerFront) return null;

  return (
    <div
      className="v2-box"
      role="dialog"
      aria-modal="true"
      aria-label={`Flyer: ${event.title}`}
      onClick={onClose}
    >
      <button type="button" className="v2-box-x" onClick={onClose} aria-label="Close">
        ✕
      </button>
      <figure className="v2-box-fig" onClick={(e) => e.stopPropagation()}>
        <div className="v2-box-img">
          <Image
            src={event.flyerFront}
            alt={`Flyer for ${event.title}`}
            fill
            sizes="(max-width: 700px) 82vw, 560px"
          />
        </div>
        <figcaption className="v2-box-cap">
          <b>{event.title}</b>
          {formatDate(event.date)} — {event.venue}, {event.city}
          {event.country ? `, ${event.country}` : ""}
        </figcaption>
      </figure>
    </div>
  );
}
