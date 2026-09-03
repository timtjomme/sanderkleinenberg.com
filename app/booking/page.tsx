import type { Metadata } from "next";
import PlaceholderImage from "@/components/PlaceholderImage";

export const metadata: Metadata = {
  title: "Booking & press — Sander Kleinenberg",
  description: "Booking contact and press kit for Sander Kleinenberg.",
};

export default function BookingPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-5 pt-16 pb-10 sm:px-8 sm:pt-24">
        <p className="glow-text font-mono text-[.78rem] uppercase tracking-[.2em] text-orange">
          Booking &amp; press
        </p>
        <h1 className="laser-text mt-4 text-balance font-display text-4xl font-black leading-[1.1] sm:text-6xl">
          Book Sander.
        </h1>
        <p className="mt-6 text-lg text-ink-dim">
          Sander prefers clubs, with the occasional festival. For bookings
          and general enquiries, see below.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <div className="panel-glow rounded-2xl p-8">
          <p className="font-mono text-[.72rem] uppercase tracking-[.1em] text-amber">
            Booking
          </p>
          <p className="mt-3 font-display text-xl font-bold">MN2S</p>
          <p className="mt-1 text-ink-dim">
            Worldwide representation via MN2S.
          </p>
          <a
            href="https://mn2s.com/booking-agency/dj-roster/sander-kleinenberg/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon mt-5"
          >
            Booking profile on MN2S →
          </a>
        </div>

        <div className="panel-glow mt-6 rounded-2xl p-8">
          <p className="font-mono text-[.72rem] uppercase tracking-[.1em] text-amber">
            Management
          </p>
          <p className="mt-3 text-ink-dim">
            For everything else (press, collaborations, general questions):
          </p>
          <a
            href="mailto:management@sanderkleinenberg.com"
            className="btn-neon mt-5"
          >
            management@sanderkleinenberg.com →
          </a>
          <p className="mt-4 text-xs text-ink-dim">
            Still to be confirmed by the team whether this address is
            actively monitored for this site.
          </p>
        </div>
      </section>

      <section className="relative">
        <div className="divider-glow" />
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="font-display text-xl font-extrabold">Press kit</h2>
          <p className="mt-4 text-ink-dim">
            A downloadable press kit with high-resolution photos, logos, and
            a short and long bio belongs here once the material has been
            supplied. Until then, press material runs through MN2S.
          </p>
          <PlaceholderImage
            label="Downloadable press kit — still to be supplied"
            className="mt-6 aspect-[3/1] w-full rounded-2xl"
          />
        </div>
      </section>
    </>
  );
}
