"use client";

import { useEffect, useState } from "react";
import { raPastEvents, type PastEvent } from "@/lib/ra-past-events";

const eventDate = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const archiveByYear = Object.entries(
  raPastEvents.reduce<Record<string, PastEvent[]>>((years, event) => {
    const year = event.date.slice(0, 4);
    (years[year] ??= []).push(event);
    return years;
  }, {}),
).sort(([a], [b]) => a.localeCompare(b));

export default function PastEventArchive() {
  const [selectedFlyer, setSelectedFlyer] = useState<PastEvent | null>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedFlyer(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <section className="relative bg-surface-2">
      <div className="divider-glow" />
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="max-w-2xl">
          <p className="glow-text font-mono text-[.78rem] uppercase tracking-[.2em] text-orange">
            2000 — 2026
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
            Past events, on the record.
          </h2>
          <p className="mt-4 text-ink-dim">
            {raPastEvents.length} published listings, beginning in 2000 on the
            earliest page currently held in the Resident Advisor archive. Cards
            marked <span className="font-mono text-[.78em] uppercase tracking-[.12em] text-orange">View flyer</span> open the original artwork here.
          </p>
        </div>

        <div className="mt-10 border-y border-line">
          {archiveByYear.map(([year, events]) => (
            <details
              key={year}
              open={year === archiveByYear[0]?.[0]}
              className="group border-b border-line last:border-b-0"
            >
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 px-1 py-5 font-display text-xl font-extrabold marker:content-none sm:text-2xl">
                <span>{year}</span>
                <span className="font-mono text-[.72rem] font-normal uppercase tracking-[.14em] text-ink-dim group-open:text-orange">
                  {events.length} dates <span className="ml-2 inline-block transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <ul className="grid gap-px border-t border-line bg-line sm:grid-cols-2">
                {events.map((event, index) => (
                  <li key={`${event.date}-${event.venue}-${index}`} className="bg-surface">
                    {event.flyerFront ? (
                      <button
                        type="button"
                        onClick={() => setSelectedFlyer(event)}
                        className="event-card event-card-with-flyer"
                        aria-label={`View flyer for ${event.title}`}
                      >
                        <EventCard event={event} />
                      </button>
                    ) : (
                      <div className="event-card"><EventCard event={event} /></div>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
        <p className="mt-5 text-sm text-ink-dim">
          Source: Resident Advisor&apos;s{" "}
          <a
            href="https://ra.co/dj/sanderk/past-events"
            target="_blank"
            rel="noopener noreferrer"
            className="link-glow"
          >
            past-events archive
          </a>
          . Listings and flyer artwork follow the original event records.
        </p>
      </div>

      {selectedFlyer?.flyerFront && (
        <div
          className="flyer-popout"
          role="dialog"
          aria-modal="true"
          aria-label={`Flyer for ${selectedFlyer.title}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedFlyer(null);
          }}
        >
          <div className="flyer-popout-panel">
            <button
              type="button"
              onClick={() => setSelectedFlyer(null)}
              className="flyer-popout-close"
              aria-label="Close flyer"
            >
              ×
            </button>
            <img
              src={selectedFlyer.flyerFront}
              alt={`Original flyer for ${selectedFlyer.title}`}
              className="flyer-popout-image"
            />
            <div className="flyer-popout-caption">
              <p>{eventDate.format(new Date(`${selectedFlyer.date}T12:00:00Z`))}</p>
              <h3>{selectedFlyer.title}</h3>
              <span>{selectedFlyer.venue} · {selectedFlyer.city}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function EventCard({ event }: { event: PastEvent }) {
  return (
    <>
      <p className="font-mono text-[.72rem] uppercase tracking-[.12em] text-orange">
        {eventDate.format(new Date(`${event.date}T12:00:00Z`))}
      </p>
      <p className="mt-2 font-display text-base font-bold leading-snug">{event.title}</p>
      <p className="mt-3 text-sm text-ink-dim">
        {event.venue} · {event.city}
        {event.country && event.city !== event.country ? `, ${event.country}` : ""}
      </p>
      {event.flyerFront && <span className="event-flyer-label">View flyer ↗</span>}
    </>
  );
}
