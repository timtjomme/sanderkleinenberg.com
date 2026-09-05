import Link from "next/link";
import V2Nav from "@/components/v2/V2Nav";
import NextNight from "@/components/v2/NextNight";
import Ledger from "@/components/v2/Ledger";
import Radio from "@/components/v2/Radio";
import Releases from "@/components/v2/Releases";
import ContactSheet from "@/components/v2/ContactSheet";
import { archiveStats, peakYear, ledgerYears } from "@/lib/v2/archive";
import { deepestMixtapes } from "@/lib/deepest-mixtapes";
import { upcomingShows } from "@/lib/shows";

function Head({
  no,
  title,
  meta,
  id,
}: {
  no: string;
  title: string;
  meta?: string;
  id?: string;
}) {
  return (
    <div className="v2-head" id={id}>
      <span className="v2-head-no">{no}</span>
      <h2 className="v2-head-title">{title}</h2>
      <span className="v2-head-line" />
      {meta && <span className="v2-head-meta">{meta}</span>}
    </div>
  );
}

const quietest = ledgerYears
  .filter((year) => year.year >= 2019 && year.year <= 2023)
  .reduce((low, year) => (year.count < low.count ? year : low));

const recent = ledgerYears[ledgerYears.length - 2];

export default function V2Page() {
  const strip: [string, string][] = [
    [String(archiveStats.nights), "Nights logged"],
    [String(archiveStats.years), "Years running"],
    [String(archiveStats.countries), "Countries"],
    [String(archiveStats.cities), "Cities"],
    [String(archiveStats.venues), "Venues"],
    [String(deepestMixtapes.length), "Mixtapes"],
  ];

  return (
    <>
      <V2Nav />

      <div className="v2-shell v2-mast">
        <p className="v2-mast-kicker">
          <span>◆</span>
          <span>
            Archive edition — {archiveStats.firstYear}–{archiveStats.lastYear}
          </span>
        </p>
        <h1 className="v2-wordmark">
          <span>Sander</span>
          <span className="v2-wordmark-2">Kleinenberg</span>
        </h1>

        <div className="v2-thesis">
          <p className="v2-thesis-line">
            The return is <em>in the numbers.</em>
          </p>
          <p className="v2-thesis-body">
            {archiveStats.nights} nights on public record, from {archiveStats.firstYear} to{" "}
            {archiveStats.lastYear}. They peak at {peakYear.count} in {peakYear.year}, vanish
            from the listings altogether in {quietest.year}, and climb back to{" "}
            {recent.count} in {recent.year}. This page is that record, plotted — a
            career you can read off a chart.
          </p>
        </div>

        <div className="v2-strip">
          {strip.map(([value, label]) => (
            <div className="v2-strip-cell" key={label}>
              <span className="v2-strip-n">{value}</span>
              <span className="v2-strip-l">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="v2-shell v2-band v2-band--tight">
        <Head no="01" title="Next" meta={`${upcomingShows.length} confirmed`} />
        <NextNight shows={upcomingShows} />
      </section>

      <section className="v2-shell v2-band" id="ledger">
        <Head
          no="02"
          title="The Ledger"
          meta={`${archiveStats.firstYear}–${archiveStats.lastYear} · ${archiveStats.nights} nights`}
        />
        <p className="v2-ledger-lede">
          Every night we can find a public listing for, stacked by year. Sources
          are Resident Advisor, Partyflock and Djguide, so this is what the record
          holds — not what the diary held. Click a year to read it back.
        </p>
        <Ledger />
      </section>

      <section className="v2-shell v2-band" id="radio">
        <Head
          no="03"
          title="Radio"
          meta={`${deepestMixtapes.length} editions`}
        />
        <Radio />
      </section>

      <section className="v2-shell v2-band" id="releases">
        <Head no="04" title="Releases" meta="Out now" />
        <Releases />
      </section>

      <section className="v2-shell v2-band" id="sheet">
        <Head
          no="05"
          title="Contact Sheet"
          meta={`${archiveStats.flyers} flyers in the archive`}
        />
        <p className="v2-ledger-lede">
          The paper that survived. Scanned flyers pulled from the same listings —
          click any one to read it.
        </p>
        <ContactSheet />
      </section>

      <footer className="v2-shell v2-colophon">
        <div className="v2-colophon-grid">
          <div>
            <h3>Colophon</h3>
            <p className="v2-colophon-note">
              An alternative art direction for sanderkleinenberg.com, built on the
              same content as the main site. Set in Helvetica Neue. The premise:
              lead with the archive, and let {archiveStats.nights} logged nights
              carry the story.
            </p>
          </div>
          <div>
            <h3>Elsewhere</h3>
            <ul>
              <li>
                <a href="https://soundcloud.com/sanderkleinenberg" target="_blank" rel="noopener noreferrer">
                  SoundCloud ↗
                </a>
              </li>
              <li>
                <a href="https://x.com/kleinenberg" target="_blank" rel="noopener noreferrer">
                  X ↗
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/sanderkleinenberg" target="_blank" rel="noopener noreferrer">
                  Facebook ↗
                </a>
              </li>
              <li>
                <a href="https://ra.co/dj/sanderk" target="_blank" rel="noopener noreferrer">
                  Resident Advisor ↗
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3>Sources</h3>
            <ul>
              <li><span className="v2-dim">Resident Advisor</span></li>
              <li><span className="v2-dim">Partyflock</span></li>
              <li><span className="v2-dim">Djguide</span></li>
            </ul>
          </div>
        </div>
        <div className="v2-colophon-bottom">
          <span>© {new Date().getFullYear()} Sander Kleinenberg</span>
          <span>Direction B — “The Ledger”</span>
          <span>
            <Link href="/" style={{ color: "inherit" }}>← Main site</Link>
          </span>
        </div>
      </footer>
    </>
  );
}
