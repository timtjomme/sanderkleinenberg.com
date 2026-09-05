import { raPastEvents, type PastEvent } from "@/lib/ra-past-events";
import { partyflockPastEvents } from "@/lib/partyflock-past-events";
import { djguidePastEvents } from "@/lib/djguide-past-events";

export type { PastEvent };

/**
 * One merged, chronological ledger of every night we have a record of.
 * Three sources, one spine — the whole of this direction is built on it.
 */
export const ledger: PastEvent[] = [
  ...raPastEvents,
  ...partyflockPastEvents,
  ...djguidePastEvents,
].sort((a, b) => b.date.localeCompare(a.date));

export type LedgerYear = {
  year: number;
  count: number;
  events: PastEvent[];
};

const byYear = new Map<number, PastEvent[]>();
for (const event of ledger) {
  const year = Number(event.date.slice(0, 4));
  if (!Number.isFinite(year)) continue;
  const bucket = byYear.get(year);
  if (bucket) bucket.push(event);
  else byYear.set(year, [event]);
}

export const firstYear = Math.min(...byYear.keys());
export const lastYear = Math.max(...byYear.keys());

/**
 * Every year in the span, including the empty ones. The gaps are the point:
 * 2022 has no entry at all, and that silence is what makes the return read.
 */
export const ledgerYears: LedgerYear[] = Array.from(
  { length: lastYear - firstYear + 1 },
  (_, index) => {
    const year = firstYear + index;
    const events = byYear.get(year) ?? [];
    return { year, count: events.length, events };
  },
);

export const peakYear = ledgerYears.reduce((peak, year) =>
  year.count > peak.count ? year : peak,
);

const unique = (values: (string | null | undefined)[]) =>
  new Set(values.filter((value): value is string => Boolean(value))).size;

export const archiveStats = {
  nights: ledger.length,
  years: lastYear - firstYear + 1,
  firstYear,
  lastYear,
  countries: unique(ledger.map((event) => event.country)),
  cities: unique(ledger.map((event) => event.city)),
  venues: unique(ledger.map((event) => event.venue)),
  flyers: ledger.filter((event) => event.flyerFront).length,
};

/** Flyers, newest first, de-duplicated — the contact sheet reads off this. */
export const flyers = (() => {
  const seen = new Set<string>();
  return ledger.filter((event) => {
    if (!event.flyerFront || seen.has(event.flyerFront)) return false;
    seen.add(event.flyerFront);
    return true;
  });
})();
