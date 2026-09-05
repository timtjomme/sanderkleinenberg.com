// Pulls the homepage's data arrays straight out of the TypeScript sources so
// the replica never drifts from the real site. Prints JSON on stdout.
const fs = require("fs");

function grab(file, startRe) {
  const t = fs.readFileSync(file, "utf8");
  const m = t.match(startRe);
  if (!m) throw new Error(`no match in ${file}`);
  // Start at the "[" after the "=", not one inside a `Type[]` annotation.
  const eq = t.indexOf("=", m.index + m[0].length - 1);
  const start = t.indexOf("[", eq);
  let depth = 0, i = start;
  for (; i < t.length; i++) {
    const c = t[i];
    if (c === "[") depth++;
    else if (c === "]" && --depth === 0) { i++; break; }
  }
  return eval("(" + t.slice(start, i).replace(/\bas const\b/g, "") + ")");
}

const shows = grab("lib/shows.ts", /export const shows: Show\[\]\s*=/);
process.stdout.write(JSON.stringify({
  mixtapes: grab("lib/deepest-mixtapes.ts", /export const deepestMixtapes\s*=/),
  releases: grab("components/LatestReleaseCoverflow.tsx", /const releases\s*=/),
  memories: grab("components/ArchiveBlast.tsx", /const memories: Memory\[\]\s*=/),
  upcomingShows: shows.filter(s => s.status === "upcoming").sort((a, b) => a.date.localeCompare(b.date)),
  pastShows: shows.filter(s => s.status === "past").sort((a, b) => b.date.localeCompare(a.date)),
}));
