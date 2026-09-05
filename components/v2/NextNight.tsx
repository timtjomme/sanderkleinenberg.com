"use client";

import { useEffect, useState } from "react";
import type { Show } from "@/lib/shows";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function partsUntil(iso: string): Parts | null {
  const delta = new Date(iso + "T22:00:00Z").getTime() - Date.now();
  if (delta <= 0) return null;
  const seconds = Math.floor(delta / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * The countdown only starts once we are on the client — the server has no
 * business guessing the visitor's clock, and a mismatch would blow hydration.
 */
function Clock({ date }: { date: string }) {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const tick = () => setParts(partsUntil(date));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [date]);

  const units: [string, string][] = parts
    ? [
        [String(parts.days), "Days"],
        [pad(parts.hours), "Hrs"],
        [pad(parts.minutes), "Min"],
        [pad(parts.seconds), "Sec"],
      ]
    : [
        ["—", "Days"],
        ["—", "Hrs"],
        ["—", "Min"],
        ["—", "Sec"],
      ];

  return (
    <div className="v2-clock" role="timer" aria-live="off">
      {units.map(([value, label]) => (
        <span className="v2-clock-unit" key={label}>
          <span className="v2-clock-n">{value}</span>
          <span className="v2-clock-l">{label}</span>
        </span>
      ))}
    </div>
  );
}

export default function NextNight({ shows }: { shows: Show[] }) {
  const [next, ...rest] = shows;
  if (!next) return null;

  return (
    <div className="v2-next" id="next">
      <div className="v2-next-main">
        <p className="v2-next-date">Next night — {next.dateLabel}</p>
        <h2 className="v2-next-title">{next.title}</h2>
        <p className="v2-next-where">
          {next.venue} · {next.city}, {next.country}
        </p>
        <Clock date={next.date} />
        {next.ticketUrl && (
          <a className="v2-btn" href={next.ticketUrl} target="_blank" rel="noopener noreferrer">
            Tickets ↗
          </a>
        )}
      </div>
      {rest.length > 0 && (
        <div className="v2-next-side">
          <p className="v2-next-side-label">Also confirmed</p>
          <div className="v2-then">
            {rest.map((show) => {
              const body = (
                <>
                  <strong>{show.title}</strong>
                  <span>
                    {show.dateLabel} · {show.venue}, {show.city}
                  </span>
                </>
              );
              return show.ticketUrl ? (
                <a
                  key={show.date + show.venue}
                  className="v2-then-item"
                  href={show.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {body}
                </a>
              ) : (
                <div key={show.date + show.venue} className="v2-then-item">
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
