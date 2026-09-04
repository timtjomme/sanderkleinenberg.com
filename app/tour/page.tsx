import type { Metadata } from "next";
import { raPastEvents } from "@/lib/ra-past-events";
import { upcomingShows } from "@/lib/shows";

export const metadata: Metadata = {
  title: "Tour & dates — Sander Kleinenberg",
  description:
    "Sander Kleinenberg's schedule, plus an on-site Resident Advisor past-events archive.",
};

const eventDate = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const archiveByYear = Object.entries(
  raPastEvents.reduce<Record<string, typeof raPastEvents>>((years, event) => {
    const year = event.date.slice(0, 4);
    (years[year] ??= []).push(event);
    return years;
  }, {}),
).sort(([a], [b]) => a.localeCompare(b));

export default function TourPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-5 pt-16 pb-10 sm:px-8 sm:pt-24">
        <p className="glow-text font-mono text-[.78rem] uppercase tracking-[.2em] text-orange">
          Tour &amp; dates
        </p>
        <h1 className="laser-text mt-4 text-balance font-display text-4xl font-black leading-[1.1] sm:text-6xl">
          Back on the club floor, worldwide.
        </h1>
        <p className="mt-6 text-lg text-ink-dim">
          Since March 2025 Sander has been playing regularly again — from
          Amsterdam and Rotterdam to New York, Detroit, Mexico City, Tulum,
          Lisbon and the SXM Festival on Saint Martin. Mostly clubs, on
          purpose, with the occasional festival.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <h2 className="font-display text-xl font-extrabold">Upcoming</h2>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {upcomingShows.map((show) => (
            <li
              key={show.date + show.venue}
              className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div>
                <p className="font-display text-lg font-bold">
                  {show.venue}, {show.city}
                </p>
                <p className="text-ink-dim">{show.title}</p>
              </div>
              <span className="glow-text shrink-0 font-mono text-[.78rem] text-orange">
                {show.dateLabel}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink-dim">
          For tickets, see the event page on{" "}
          <a
            href="https://ra.co/dj/sanderk/upcoming-events"
            target="_blank"
            rel="noopener noreferrer"
            className="link-glow"
          >
            Resident Advisor
          </a>
          .
        </p>
      </section>

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
              earliest page currently held in the Resident Advisor archive. Start
              at the beginning and move forward through the rooms, cities and festivals.
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
                    <li key={`${event.date}-${event.venue}-${index}`} className="bg-surface px-5 py-5">
                      <p className="font-mono text-[.72rem] uppercase tracking-[.12em] text-orange">
                        {eventDate.format(new Date(`${event.date}T12:00:00Z`))}
                      </p>
                      <p className="mt-2 font-display text-base font-bold leading-snug">
                        {event.title}
                      </p>
                      <p className="mt-3 text-sm text-ink-dim">
                        {event.venue} · {event.city}
                        {event.country && event.city !== event.country ? `, ${event.country}` : ""}
                      </p>
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
            . Listings are retained here for browsing; titles and venue names follow
            the original event listings.
          </p>
        </div>
      </section>
    </>
  );
}
