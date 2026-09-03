import type { Metadata } from "next";
import PlaceholderImage from "@/components/PlaceholderImage";
import { timeline, raStats } from "@/lib/legacy";

export const metadata: Metadata = {
  title: "Story — Sander Kleinenberg",
  description:
    "The story of Sander Kleinenberg: 25 years of progressive house, a deliberate break, and a comeback built around clubs.",
};

export default function StoryPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-5 pt-16 pb-10 sm:px-8 sm:pt-24">
        <p className="glow-text font-mono text-[.78rem] uppercase tracking-[.2em] text-orange">
          Story
        </p>
        <h1 className="laser-text mt-4 text-balance font-display text-4xl font-black leading-[1.1] sm:text-6xl">
          25 years, a deliberate break, and a return to the club.
        </h1>
        <p className="mt-6 text-lg text-ink-dim">
          Sander Kleinenberg (Amsterdam, also known as Sander K and 5K) broke
          through internationally with the 4 Seasons trilogy and the
          progressive house classic My Lexicon. Two decades later, he made a
          deliberate choice to step off the touring treadmill — and came
          back on his own terms.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-5 sm:px-8">
        <PlaceholderImage
          label="Press photo — to be supplied via MN2S"
          className="aspect-video w-full rounded-2xl"
        />
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <h2 className="font-display text-2xl font-extrabold">Legacy</h2>
        <ul className="mt-6 flex flex-col gap-5">
          {timeline.map((item) => (
            <li key={item.year} className="flex gap-5">
              <span className="w-28 shrink-0 font-mono text-[.78rem] text-amber">
                {item.year}
              </span>
              <span className="text-ink">{item.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative">
        <div className="divider-glow" />
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <blockquote className="border-l-4 border-orange pl-6">
            <p className="glow-text text-balance font-display text-2xl font-semibold leading-snug sm:text-3xl">
              “Clubs are where my first love is and always will.”
            </p>
            <cite className="mt-4 block font-mono text-[.78rem] not-italic text-ink-dim">
              Sander Kleinenberg, Electronic Groove, 2024
            </cite>
          </blockquote>
          <p className="mt-6 text-ink-dim">
            After a few years out of the spotlight — time to reset and
            reconnect with family and friends — Sander made a deliberate
            choice to return to clubs rather than big festivals. He
            describes his new material as a{" "}
            <span className="text-ink">marriage of old and new</span>: the
            sounds of before, with the precision of now.
          </p>
        </div>
      </section>

      <section className="relative">
        <div className="divider-glow" />
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="font-display text-2xl font-extrabold">By the numbers</h2>
          <p className="mt-2 text-sm text-ink-dim">
            According to Resident Advisor, checked 31 August 2026.
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[.72rem] uppercase tracking-[.06em] text-ink-dim">
                On Resident Advisor since
              </p>
              <p className="laser-text mt-2 font-display text-3xl font-black">
                {raStats.firstEventOnRA}
              </p>
            </div>
            <div>
              <p className="font-mono text-[.72rem] uppercase tracking-[.06em] text-ink-dim">
                Most played regions
              </p>
              <ul className="mt-2 text-ink">
                {raStats.regions.slice(0, 3).map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[.72rem] uppercase tracking-[.06em] text-ink-dim">
                Clubs he's played most
              </p>
              <ul className="mt-2 text-ink">
                {raStats.clubs.slice(0, 3).map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 text-ink-dim">
            Labels: {raStats.labels.join(" · ")}
          </p>
        </div>
      </section>
    </>
  );
}
