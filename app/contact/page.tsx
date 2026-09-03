import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — Sander Kleinenberg",
  description: "Contact and socials for Sander Kleinenberg.",
};

const SOCIALS = [
  { href: "https://soundcloud.com/sanderkleinenberg", label: "SoundCloud" },
  { href: "https://x.com/kleinenberg", label: "X" },
  { href: "https://www.facebook.com/sanderkleinenberg", label: "Facebook" },
];

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-5 pt-16 pb-10 sm:px-8 sm:pt-24">
        <p className="glow-text font-mono text-[.78rem] uppercase tracking-[.2em] text-orange">
          Contact
        </p>
        <h1 className="laser-text mt-4 text-balance font-display text-4xl font-black leading-[1.1] sm:text-6xl">
          Contact &amp; follow.
        </h1>
        <p className="mt-6 text-lg text-ink-dim">
          For bookings, see the{" "}
          <Link href="/booking/" className="link-glow text-ink">
            booking page
          </Link>
          . For everything else:
        </p>
        <a href="mailto:management@sanderkleinenberg.com" className="btn-neon mt-7">
          management@sanderkleinenberg.com
        </a>
      </section>

      <section className="relative">
        <div className="divider-glow" />
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="font-display text-xl font-extrabold">Follow</h2>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm text-ink-dim">
            {SOCIALS.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-glow"
                >
                  {s.label} →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative">
        <div className="divider-glow" />
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="font-display text-xl font-extrabold">Newsletter</h2>
          <p className="mt-4 text-ink-dim">
            There's no active newsletter wired up to this site yet — that
            needs a provider (e.g. Mailchimp) before a signup form here
            would actually do anything. Until then, follow SoundCloud or X
            for new releases and shows.
          </p>
        </div>
      </section>
    </>
  );
}
