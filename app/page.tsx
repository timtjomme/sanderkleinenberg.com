import Image from "next/image";
import FiveKMark from "@/components/FiveKMark";
import HeroPortraits from "@/components/HeroPortraits";
import ArchiveBlast from "@/components/ArchiveBlast";
import DeepestMixtapes from "@/components/DeepestMixtapes";
import InstagramScroll from "@/components/InstagramScroll";
import LatestReleaseCoverflow from "@/components/LatestReleaseCoverflow";
import ShowCountdown from "@/components/ShowCountdown";
import { upcomingShows, pastShows } from "@/lib/shows";

export default function Home() {
  const recentShows = pastShows.slice(0, 3);

  return (
    <>
      <section className="hero">
        <HeroPortraits />
        <div className="hero-shade" />
        <div className="site-shell hero-content">
          <h1 className="hero-title">
            <span className="hero-title-outline">SANDER</span><br />
            <span className="hero-title-solid">KLEINENBERG</span><br />
            <span className="hero-title-outline">IS BACK</span>
          </h1>
        </div>
        <div className="hero-5k">
          <FiveKMark priority />
          <span>THE 5K ERA</span>
        </div>
      </section>

      <section className="signal-section" id="music">
        <div className="site-shell">
          <p className="signal-section-title">THE LATEST</p>
          <LatestReleaseCoverflow />
          <div className="grid gap-px bg-line md:grid-cols-[1.06fr_.94fr]">
            <div className="signal-panel signal-panel-feature">
              <DeepestMixtapes />
            </div>
            <div className="signal-panel signal-panel-show">
              <h2 className="signal-headline">UPCOMING<br />GIGS</h2>
              <div className="mt-6 grid gap-4">
                {upcomingShows.map((show) => (
                  <article key={show.date + show.venue} className="grid grid-cols-[5.5rem_1fr] overflow-hidden border border-line bg-surface">
                    {show.image && (
                      <Image
                        src={show.image}
                        alt={`${show.title} artwork`}
                        width={934}
                        height={934}
                        className="h-full min-h-32 w-full object-cover"
                      />
                    )}
                    <div className="flex flex-col items-start p-4">
                      <div className="flex w-full items-start justify-between gap-3">
                        <p className="font-display text-base font-extrabold leading-tight">{show.title}</p>
                        <span className="glow-text shrink-0 font-mono text-[.62rem] text-orange"><ShowCountdown date={show.date} /></span>
                      </div>
                      <p className="mt-2 text-sm text-ink-dim">{show.venue} · {show.dateLabel}</p>
                      {show.ticketUrl && (
                        <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer" className="text-link mt-4">
                          Tickets ↗
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <InstagramScroll />

      <ArchiveBlast />

      <section className="recent-section">
        <div className="site-shell">
          <p className="eyebrow">RECENTLY</p>
          <ul className="recent-list">
            {recentShows.map((show) => (
              <li
                key={show.date + show.venue}
              >
                <span className="recent-city">{show.city}</span><span>{show.venue}</span><span>{show.dateLabel}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
