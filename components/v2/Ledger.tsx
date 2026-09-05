"use client";

import Image from "next/image";
import { useState } from "react";
import { ledgerYears, type LedgerYear, type PastEvent } from "@/lib/v2/archive";
import FlyerBox, { formatDate } from "./FlyerBox";

const MAX = Math.max(...ledgerYears.map((year) => year.count));

/**
 * Open on the newest year that actually has nights. Landing on the 2009 peak
 * would drop 85 rows on a first-time visitor; starting at "now" matches the
 * headline and leaves the peak to be found by clicking.
 */
const OPENING = [...ledgerYears].reverse().find((year) => year.count > 0) ?? ledgerYears[0];

const shortDate = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  timeZone: "UTC",
});

function Night({ event, onFlyer }: { event: PastEvent; onFlyer: (e: PastEvent) => void }) {
  return (
    <li className="v2-night">
      {event.flyerFront ? (
        <button
          type="button"
          className="v2-night-thumb"
          onClick={() => onFlyer(event)}
          aria-label={`Open flyer for ${event.title}`}
        >
          <Image src={event.flyerFront} alt="" fill sizes="52px" />
        </button>
      ) : (
        <span className="v2-night-thumb v2-night-thumb--none" aria-hidden="true">
          —
        </span>
      )}
      <div className="v2-night-body">
        <span className="v2-night-date">
          {shortDate.format(new Date(event.date + "T12:00:00Z")).toUpperCase()}
        </span>
        {event.sourceUrl ? (
          <a
            className="v2-night-title"
            href={event.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {event.title}
          </a>
        ) : (
          <span className="v2-night-title">{event.title}</span>
        )}
        <p className="v2-night-where">
          {event.venue}
          {event.city && event.city !== "All" ? ` · ${event.city}` : ""}
          {event.country ? ` · ${event.country}` : ""}
        </p>
      </div>
    </li>
  );
}

export default function Ledger() {
  const [selected, setSelected] = useState<LedgerYear>(OPENING);
  const [flyer, setFlyer] = useState<PastEvent | null>(null);

  return (
    <>
      <div className="v2-chart-scroll">
        <div className="v2-chart" role="group" aria-label="Nights played per year">
          {ledgerYears.map((year) => (
            <button
              key={year.year}
              type="button"
              className={`v2-bar${year.count === 0 ? " v2-bar--empty" : ""}`}
              aria-pressed={year.year === selected.year}
              aria-label={`${year.year}: ${year.count} ${year.count === 1 ? "night" : "nights"}`}
              onClick={() => setSelected(year)}
            >
              <span className="v2-bar-n">{year.count}</span>
              <span
                className="v2-bar-fill"
                style={{ height: `${year.count === 0 ? 0 : (year.count / MAX) * 100}%` }}
              />
            </button>
          ))}
        </div>
        <div className="v2-axis" aria-hidden="true">
          {ledgerYears.map((year) => (
            <span
              className="v2-axis-tick"
              key={year.year}
              data-on={year.year === selected.year}
            >
              {year.year}
            </span>
          ))}
        </div>
      </div>

      <div className="v2-year">
        <div className="v2-year-head">
          <span className="v2-year-n">{selected.year}</span>
          <span className="v2-year-c">
            {selected.count === 0
              ? "No nights on record"
              : `${selected.count} ${selected.count === 1 ? "night" : "nights"} on record`}
          </span>
          <span className="v2-year-hint">Pick a year ↑</span>
        </div>
        {selected.count > 0 ? (
          <ul className="v2-nights">
            {selected.events.map((event, index) => (
              <Night key={event.date + event.venue + index} event={event} onFlyer={setFlyer} />
            ))}
          </ul>
        ) : (
          <p className="v2-ledger-lede" style={{ marginTop: "1.5rem" }}>
            Nothing logged for {selected.year}. The archive is drawn from public
            listings, so a blank year means the record is silent — not always
            that the year was.
          </p>
        )}
      </div>

      <FlyerBox event={flyer} onClose={() => setFlyer(null)} />
    </>
  );
}

export { formatDate };
