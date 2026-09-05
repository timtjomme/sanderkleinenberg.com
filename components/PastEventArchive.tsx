"use client";

import { type FormEvent, useEffect, useState } from "react";
import { raPastEvents, type PastEvent } from "@/lib/ra-past-events";
import { partyflockPastEvents } from "@/lib/partyflock-past-events";
import { djguidePastEvents } from "@/lib/djguide-past-events";
import { countryFlag } from "@/lib/country-flag";

const eventDate = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const allPastEvents = [...raPastEvents, ...partyflockPastEvents, ...djguidePastEvents].sort((a, b) =>
  a.date.localeCompare(b.date),
);

const archiveByYear = Object.entries(
  allPastEvents.reduce<Record<string, PastEvent[]>>((years, event) => {
    const year = event.date.slice(0, 4);
    (years[year] ??= []).push(event);
    return years;
  }, {}),
).sort(([a], [b]) => a.localeCompare(b));

export default function PastEventArchive() {
  const [selectedFlyer, setSelectedFlyer] = useState<PastEvent | null>(null);
  const [memoryStatus, setMemoryStatus] = useState<"idle" | "saved">("idle");

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedFlyer(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const saveMemoryDraft = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const draft = Object.fromEntries(
      [...formData.entries()].filter(([, value]) => typeof value === "string"),
    );
    window.localStorage.setItem("sander-kleinenberg-memory-draft", JSON.stringify({ ...draft, savedAt: new Date().toISOString() }));
    setMemoryStatus("saved");
  };

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
            {allPastEvents.length} archived dates. Cards marked <span className="font-mono text-[.78em] uppercase tracking-[.12em] text-orange">View artwork</span> open the original flyer or event image here.
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

        <section className="memory-drop" aria-labelledby="memory-drop-title">
          <div>
            <p className="memory-drop-kicker">WERE YOU THERE?</p>
            <h2 id="memory-drop-title">Add your memory to the archive.</h2>
            <p>Write it down here, then keep it safe until the community intake opens. This draft stays only on your device.</p>
          </div>
          <form onSubmit={saveMemoryDraft} className="memory-drop-form">
            <div className="memory-drop-fields">
              <label>
                Your name
                <input name="name" autoComplete="name" required />
              </label>
              <label>
                Email
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                Year / date
                <input name="date" placeholder="e.g. 2003" />
              </label>
              <label>
                City or event
                <input name="event" placeholder="e.g. Amsterdam / Everybody" />
              </label>
            </div>
            <label>
              The memory
              <textarea name="memory" rows={5} minLength={10} required placeholder="What happened? What did it feel like?" />
            </label>
            <div className="memory-drop-fields">
              <label>
                Photo, video, ticket or set link (optional)
                <input name="link" type="url" placeholder="https://" />
              </label>
            </div>
            <label className="memory-drop-consent">
              <input name="permission" type="checkbox" required />
              I own this material or have permission to share it when the public archive opens.
            </label>
            <div className="memory-drop-actions">
              <button type="submit" className="memory-drop-submit">
                Save draft locally
              </button>
              {memoryStatus === "saved" && <p className="memory-drop-message" role="status">Saved on this device only. Nothing has been sent.</p>}
            </div>
          </form>
        </section>
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
            {/* Scanned flyers of wildly varying aspect ratio, sized by the
                lightbox CSS; the static export runs no image optimizer, so
                next/image would only add intrinsic-size constraints. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedFlyer.flyerFront}
              alt={`Original flyer for ${selectedFlyer.title}`}
              className="flyer-popout-image"
            />
            <div className="flyer-popout-caption">
              <p>{eventDate.format(new Date(`${selectedFlyer.date}T12:00:00Z`))}</p>
              <h3>{selectedFlyer.title}</h3>
              <span>{selectedFlyer.venue} · {countryFlag(selectedFlyer.country)} {selectedFlyer.city}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function EventCard({ event }: { event: PastEvent }) {
  const flag = countryFlag(event.country);

  return (
    <>
      <p className="font-mono text-[.72rem] uppercase tracking-[.12em] text-orange">
        {eventDate.format(new Date(`${event.date}T12:00:00Z`))}
      </p>
      <p className="mt-2 font-display text-base font-bold leading-snug">{event.title}</p>
      <p className="mt-3 text-sm text-ink-dim">
        {event.venue} · {flag && <span className="event-country-flag" title={event.country}>{flag}</span>} {event.city}
        {event.country && event.city !== event.country ? `, ${event.country}` : ""}
      </p>
      {event.flyerFront && <span className="event-flyer-label">View artwork ↗</span>}
    </>
  );
}
