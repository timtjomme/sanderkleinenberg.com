import type { Metadata } from "next";
import Image from "next/image";
import ArchiveEasterEgg from "@/components/ArchiveEasterEgg";
import ShowCountdown from "@/components/ShowCountdown";
import { countryFlag } from "@/lib/country-flag";
import { upcomingShows } from "@/lib/shows";

export const metadata: Metadata = {
  title: "Tour & dates — Sander Kleinenberg",
  description: "Sander Kleinenberg's upcoming schedule.",
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
            show.ticketUrl && show.image ? (
              <li key={show.date + show.venue} className="py-5">
                <article className="grid overflow-hidden border border-line bg-surface sm:grid-cols-[11rem_1fr]">
                  <Image
                    src={show.image}
                    alt={`${show.title} artwork`}
                    width={934}
                    height={934}
                    className="aspect-square h-full w-full object-cover"
                  />
                  <div className="flex flex-col items-start p-5 sm:p-6">
                    <div className="flex w-full flex-wrap items-baseline justify-between gap-x-5 gap-y-2">
                      <p className="font-display text-xl font-extrabold">{show.title}</p>
                      <span className="glow-text font-mono text-[.72rem] text-orange"><ShowCountdown date={show.date} /></span>
                    </div>
                    <p className="mt-2 text-ink-dim">{show.venue}, <span className="event-country-flag" title={show.country}>{countryFlag(show.country)}</span> {show.city} · {show.dateLabel}</p>
                    <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer" className="btn-neon mt-6">
                      Tickets ↗
                    </a>
                  </div>
                </article>
              </li>
            ) : (
              <li
                key={show.date + show.venue}
                className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div>
                  <p className="font-display text-lg font-bold">
                    {show.venue}, <span className="event-country-flag" title={show.country}>{countryFlag(show.country)}</span> {show.city}
                  </p>
                  <p className="text-ink-dim">{show.title}</p>
                </div>
                <span className="glow-text shrink-0 font-mono text-[.78rem] text-orange">
                  {show.dateLabel}
                </span>
              </li>
            )
          ))}
        </ul>
      </section>

      <ArchiveEasterEgg />
    </>
  );
}
