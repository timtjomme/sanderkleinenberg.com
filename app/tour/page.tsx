import type { Metadata } from "next";
import { upcomingShows, pastShows } from "@/lib/shows";

export const metadata: Metadata = {
  title: "Tour & dates — Sander Kleinenberg",
  description:
    "Sander Kleinenberg's schedule: upcoming club shows and festivals, plus recent gigs.",
};

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

      <section className="relative">
        <div className="divider-glow" />
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="font-display text-xl font-extrabold">Recently played</h2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {pastShows.map((show) => (
              <li
                key={show.date + show.venue}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div>
                  <p className="font-display text-base font-bold">
                    {show.venue}, {show.city}
                  </p>
                  <p className="text-sm text-ink-dim">{show.title}</p>
                </div>
                <span className="shrink-0 font-mono text-[.78rem] text-ink-dim">
                  {show.dateLabel}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-dim">
            Full history on{" "}
            <a
              href="https://ra.co/dj/sanderk/past-events"
              target="_blank"
              rel="noopener noreferrer"
              className="link-glow"
            >
              Resident Advisor
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
