"""Assemble a standalone replica of the homepage from the production export.

Run `npm run build` first, then `python3 scripts/replica/build.py`.
Output: public/replica/index.html


Markup and CSS are taken verbatim from `out/` so the result is the real page,
not an approximation; only the React runtime is swapped for plain JS.
"""
import json, pathlib, re, subprocess, sys

here = pathlib.Path(__file__).resolve().parent
root = here.parent.parent
sp = here
src = (root / "out" / "index.html").read_text()

# --- head bits -------------------------------------------------------------
title = re.search(r"<title>(.*?)</title>", src, re.S).group(1)
desc = re.search(r'<meta name="description" content="(.*?)"/?>', src).group(1)
css_href = re.search(r'<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"', src).group(1)
css = (root / "out" / css_href.lstrip("/")).read_text()

# --- body ------------------------------------------------------------------
body_open = re.search(r"<body[^>]*>", src).group(0)
body_class = re.search(r'class="([^"]*)"', body_open).group(1)
inner = src[src.index(body_open) + len(body_open): src.rindex("</body>")]

# Drop the Next.js runtime; keep every rendered element and React's inert
# text-separator comments exactly as the server emitted them.
inner = re.sub(r"<script\b[^>]*>.*?</script>", "", inner, flags=re.S)
inner = re.sub(r"<script\b[^>]*/?>", "", inner)
inner = re.sub(r"<template\b.*?</template>", "", inner, flags=re.S)

data = json.loads(subprocess.run(
    ["node", str(here / "extract-data.js")], cwd=root,
    capture_output=True, text=True, check=True).stdout)

# Make the two countdowns live again.
dates = [s["date"] for s in data["upcomingShows"]]
seen = {"i": 0}
def tag_countdown(m):
    i = seen["i"]; seen["i"] += 1
    date = dates[i] if i < len(dates) else ""
    return m.group(1) + '<span data-countdown="' + date + '">' + m.group(2) + "</span></span>"
inner, n = re.subn(
    r'(<span class="glow-text[^"]*">)<span>(.*?)</span></span>',
    tag_countdown, inner,
)
assert n == len(dates), f"countdown spans: patched {n}, expected {len(dates)}"

# Host node for the player dock (absent server-side, since no track is cued).
assert '<iframe class="soundcloud-engine"' in inner
inner = inner.replace('<iframe class="soundcloud-engine"',
                      '<div id="replica-dock"></div><iframe class="soundcloud-engine"', 1)

js = (here / "runtime.js").read_text()

# Point every asset at ../images/ instead of /images/. From public/replica/ that
# resolves the same whether the file is served at /replica/ or opened straight
# off disk, which makes the single file genuinely portable.
data_json = json.dumps(data, separators=(",", ":")).replace('"/images/', '"../images/')
inner = inner.replace('src="/images/', 'src="../images/')
js = js.replace('"/images/5k-original.png"', '"../images/5k-original.png"')

out = (
    "<!doctype html>\n"
    '<html lang="en">\n<head>\n'
    '<meta charset="utf-8"/>\n'
    '<meta name="viewport" content="width=device-width, initial-scale=1"/>\n'
    f"<title>{title}</title>\n"
    f'<meta name="description" content="{desc}"/>\n'
    "<style>\n" + css + "\n</style>\n"
    "</head>\n"
    f'<body class="{body_class}">'
    + inner +
    "\n<script>window.__SITE_DATA__=" + data_json + ";</script>\n"
    "<script>\n" + js + "\n</script>\n"
    "</body>\n</html>\n"
)

dest = root / "public" / "replica" / "index.html"
dest.parent.mkdir(parents=True, exist_ok=True)
dest.write_text(out)
print(f"wrote {dest}  ({len(out):,} bytes)")
print(f"  title: {title}")
print(f"  css:   {css_href}  ({len(css):,} bytes)")
print(f"  body:  {len(inner):,} bytes markup")
print(f"  data:  {len(data['mixtapes'])} mixtapes, {len(data['releases'])} releases, {len(data['memories'])} memories")
