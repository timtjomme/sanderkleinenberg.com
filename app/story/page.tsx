import type { Metadata } from "next";
import PlaceholderImage from "@/components/PlaceholderImage";
import { timeline, raStats } from "@/lib/legacy";

const earlyArchive = [
  {
    year: "1993",
    name: "FREE FROGS",
    title: "Bombay",
    note: "The first release: a Belgian 12-inch on Wonka Beats.",
    href: "https://www.discogs.com/release/83107-Free-Frogs-Bombay",
    kind: "RELEASE",
  },
  {
    year: "1994",
    name: "EUROPE",
    title: "Transporter",
    note: "A Superstition release from the early trance and techno years.",
    href: "https://www.discogs.com/release/34870-Europe-Europe-Transporter",
    kind: "RELEASE",
  },
  {
    year: "EARLY YEARS",
    name: "RAILS INC.",
    title: "Artist archive",
    note: "A Discogs catalogue entry added to this archive.",
    href: "https://www.discogs.com/artist/46434-Rails-Inc",
    kind: "ALIAS",
  },
  {
    year: "EARLY YEARS",
    name: "SAKAN",
    title: "Artist archive",
    note: "A Discogs catalogue entry added to this archive.",
    href: "https://www.discogs.com/artist/62921-Sakan",
    kind: "ALIAS",
  },
  {
    year: "EARLY YEARS",
    name: "S.N.S.",
    title: "Artist archive",
    note: "A Discogs catalogue entry added to this archive.",
    href: "https://www.discogs.com/artist/42287-S-N-S",
    kind: "ALIAS",
  },
  {
    year: "EARLY YEARS",
    name: "PS-5",
    title: "Artist archive",
    note: "A Discogs catalogue entry added to this archive.",
    href: "https://www.discogs.com/artist/921266-PS-5",
    kind: "ALIAS",
  },
  {
    year: "1996–97",
    name: "MTF",
    title: "It Moves / Running",
    note: "A Dutch-techno alias and a formative collaboration with Stef Vrolijk.",
    href: "https://www.discogs.com/artist/87598-MTF",
    kind: "ALIAS",
  },
  {
    year: "1998",
    name: "MEVROUW SPOELSTRA",
    title: "Bullets",
    note: "A one-off detour before the progressive-house chapter came into focus.",
    href: "https://www.discogs.com/artist/9091-Mevrouw-Spoelstra",
    kind: "ALIAS",
  },
  {
    year: "1998",
    name: "FETZAN",
    title: "Miks",
    note: "Another alias from the same restless first wave of studio work.",
    href: "https://www.discogs.com/artist/556554-Fetzan",
    kind: "ALIAS",
  },
  {
    year: "1998",
    name: "SANDER KLEINENBERG",
    title: "Melk",
    note: "The debut album: fourteen tracks from an artist still finding the future.",
    href: "https://www.discogs.com/release/208351-Sander-Kleinenberg-Melk",
    kind: "ALBUM",
  },
];

const mixArchive = [
  {
    year: "2000",
    title: "Tranceglobal Airways",
    label: "Muzik magazine mix",
    href: "https://www.discogs.com/release/23554-Sander-Kleinenberg-Tranceglobal-Airways",
  },
  {
    year: "2001",
    title: "Nubreed 004 — Global Underground",
    label: "Global Underground",
    href: "https://www.discogs.com/master/47322-Sander-Kleinenberg-Nubreed-Global-Underground",
  },
  {
    year: "2002",
    title: "Essential Mix",
    label: "Warner Music",
    href: "https://www.discogs.com/master/319891-Sander-Kleinenberg-Essential-Mix",
  },
  {
    year: "2003",
    title: "Everybody",
    label: "Renaissance",
    href: "https://www.discogs.com/master/47338-Sander-Kleinenberg-Everybody",
  },
  {
    year: "2004",
    title: "This Is Everybody Too",
    label: "Everybody Loves Music",
    href: "https://www.discogs.com/master/47376-Sander-Kleinenberg-This-Is-Everybody-Too",
  },
  {
    year: "2005",
    title: "Everybody On Tour",
    label: "with Lee Burridge",
    href: "https://www.discogs.com/master/47415-Sander-Kleinenberg-And-Lee-Burridge-This-Is-Everybody-On-Tour",
  },
  {
    year: "2009",
    title: "This Is Sander Kleinenberg 2",
    label: "Everybody Loves Music",
    href: "https://www.discogs.com/master/204400-Sander-Kleinenberg-This-Is-Sander-Kleinenberg-2",
  },
];

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

      <section className="early-archive">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="early-archive-intro">
            <div>
              <p className="eyebrow">1993 — 1998</p>
              <h2 className="early-archive-title">BEFORE THE<br />SIGNAL.</h2>
            </div>
            <p>
              Before <em>My Lexicon</em>, there were side paths, aliases and
              early records. This is the opening shelf of the archive.
            </p>
          </div>
          <div className="early-archive-grid">
            {earlyArchive.map((entry) => (
              <a
                key={entry.name + entry.title}
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                className="early-archive-item"
              >
                <div className="early-archive-meta"><span>{entry.year}</span><span>{entry.kind}</span></div>
                <h3>{entry.name}</h3>
                <p className="early-archive-release">{entry.title}</p>
                <p className="early-archive-note">{entry.note}</p>
                <span className="early-archive-link">View on Discogs ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mix-archive">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="mix-archive-intro">
            <p className="eyebrow">2000 — 2009</p>
            <h2>THE<br /><em>LONG</em> FORM.</h2>
            <p>
              Six mix records that turned a DJ&apos;s point of view into a
              format of its own: patient, widescreen, and built to be played
              from beginning to end.
            </p>
          </div>
          <div className="mix-archive-grid">
            {mixArchive.map((entry) => (
              <a
                key={entry.title}
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mix-archive-item"
              >
                <span>{entry.year}</span>
                <h3>{entry.title}</h3>
                <p>{entry.label}</p>
                <small>View on Discogs ↗</small>
              </a>
            ))}
          </div>
        </div>
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
