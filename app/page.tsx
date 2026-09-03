import Link from "next/link";
import Image from "next/image";
import FiveKMark from "@/components/FiveKMark";
import ArchiveBlast from "@/components/ArchiveBlast";
import { upcomingShows, pastShows } from "@/lib/shows";

export default function Home() {
  const nextShow = upcomingShows[0];
  const recentShows = pastShows.slice(0, 3);

  return (
    <>
      <section className="hero">
        <Image
          src="/images/archive-in-motion.png"
          alt="Abstract blue audiovisual performance artwork"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-shade" />
        <div className="site-shell hero-content">
          <p className="eyebrow">DJ / PRODUCER / VISUAL ARCHITECT</p>
          <h1 className="hero-title">
            THE NEXT<br />
            <span>CHAPTER</span>
          </h1>
          <p className="hero-copy">Built on the moments. Tuned for now.</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link href="/tour/" className="btn-neon">
              See live dates
          </Link>
            <a href="#music" className="text-link">Enter the archive ↓</a>
          </div>
          <div className="hero-timeline" aria-label="Career timeline">
            <span>1999</span><span>2000</span><span>2003</span><span>2006</span><strong>2026</strong>
          </div>
        </div>
        <div className="hero-5k">
          <FiveKMark priority />
          <span>THE 5K ERA</span>
        </div>
      </section>

      <section className="signal-section" id="music">
        <div className="site-shell grid gap-px bg-line md:grid-cols-[1.06fr_.94fr]">
          <div className="signal-panel signal-panel-feature">
            <p className="eyebrow">SIGNAL / 01</p>
            <h2 className="signal-headline">MUSIC MOVES<br /><em>FORWARD.</em></h2>
            <p className="mt-6 max-w-md text-lg text-ink-dim">New music, remastered moments and long-form sets. The catalogue remains in motion.</p>
            <a href="https://soundcloud.com/sanderkleinenberg" target="_blank" rel="noopener noreferrer" className="text-link mt-8">Listen on SoundCloud ↗</a>
          </div>
          <div className="signal-panel signal-panel-show">
            <p className="eyebrow">NEXT TRANSMISSION</p>
            {nextShow ? (
              <>
                <p className="show-date">{nextShow.dateLabel}</p>
                <p className="show-venue">{nextShow.venue}<br />{nextShow.city}</p>
                <p className="mt-4 text-ink-dim">{nextShow.title}</p>
              </>
            ) : (
              <p className="mt-3 text-ink-dim">New dates are being transmitted shortly.</p>
            )}
            <Link href="/tour/" className="text-link mt-8">
              View all dates →
            </Link>
          </div>
        </div>
      </section>

      <section className="archive-section" id="visuals">
        <div className="site-shell">
          <div className="archive-intro">
            <p className="eyebrow">ARCHIVE IN MOTION</p>
            <h2>THE WORK THAT<br />OPENED THE DOOR.</h2>
            <p>Records, rooms, images and the visual experiments that changed how a DJ performance could feel.</p>
          </div>
          <div className="archive-grid">
            <article className="archive-card archive-card-lexicon"><span>2000</span><h3>MY<br />LEXICON</h3><p>A progressive-house signal that still travels.</p></article>
            <article className="archive-card archive-card-5k"><FiveKMark /><div><span>2010</span><h3>5K</h3><p>Audio / visual archive</p></div></article>
            <article className="archive-card archive-card-dvj"><span>ONGOING</span><h3>SOUND<br />+ VISION</h3><p>Performance built beyond the booth.</p></article>
          </div>
          <Link href="/story/" className="text-link mt-9">Enter the full archive →</Link>
        </div>
      </section>

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
