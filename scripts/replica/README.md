# Homepage replica

`public/replica/index.html` is a standalone copy of the homepage: one file, no
React, no Next, no build step at runtime. Markup and CSS are lifted verbatim
from the production export, so it is the real page rather than a lookalike; only
the React runtime is replaced with plain JS in `runtime.js`.

## Rebuild

```bash
npm run build            # refresh out/ first — the replica is generated from it
python3 scripts/replica/build.py
```

## How it fits together

| File | Role |
| --- | --- |
| `build.py` | Lifts the body markup + compiled CSS out of `out/index.html`, strips the Next runtime, inlines everything into one file. |
| `extract-data.js` | Reads the mixtape / release / memory / show arrays straight from the TS sources so the replica cannot drift from the site. |
| `runtime.js` | Plain-JS reimplementation of the interactive parts: SoundCloud player + dock, mixtape panel, release coverflow, rotating hero, Instagram rail, archive shuffle, show countdowns. |

Assets are referenced as `../images/…`, which resolves both when served at
`/replica/` and when the file is opened directly from `public/replica/`.
It needs `public/images/` alongside it; it is not self-contained on its own.
