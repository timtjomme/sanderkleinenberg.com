"use client";

import { deepestMixtapes } from "@/lib/deepest-mixtapes";
import { useSoundCloudPlayer } from "@/components/SoundCloudPlayer";

/**
 * The mixtape run as a numeric index — 67 numbers, no artwork, no cards.
 * Playback rides the site-wide SoundCloud provider, so the dock keeps working
 * exactly as it does on the main site.
 */
export default function Radio() {
  const player = useSoundCloudPlayer();
  const current = player.track;

  const active = deepestMixtapes.find((tape) => tape.href === current?.href);

  return (
    <div className="v2-radio">
      <div className="v2-radio-now">
        <p className="v2-radio-now-l">
          {player.isPlaying ? "On air" : active ? "Cued" : "Off air"}
        </p>
        <h3 className="v2-radio-now-t">
          {active ? `Mixtape #${active.number}` : "Pick a number"}
        </h3>
        <p className="v2-radio-now-s">
          The Deepest Mixtape in the Universe — {deepestMixtapes.length} editions,
          counting down from #{deepestMixtapes[0].number}. Every one of them
          still up on SoundCloud.
        </p>
        {player.artworkUrl && (
          <div className="v2-radio-art">
            {/* Remote SoundCloud artwork: a plain <img> keeps this off the
                next/image remote-pattern allowlist, same as the shared dock. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={player.artworkUrl} alt="" />
          </div>
        )}
        <dl className="v2-radio-facts">
          <div><dt>Editions</dt><dd>{deepestMixtapes.length}</dd></div>
          <div><dt>Highest</dt><dd>#{deepestMixtapes[0].number}</dd></div>
          <div><dt>Home</dt><dd><a href="https://soundcloud.com/sanderkleinenberg" target="_blank" rel="noopener noreferrer">SoundCloud ↗</a></dd></div>
        </dl>
      </div>

      <div className="v2-tapes" role="group" aria-label="The Deepest Mixtapes">
        {deepestMixtapes.map((tape) => {
          const on = tape.href === current?.href;
          return (
            <button
              key={tape.number}
              type="button"
              className="v2-tape"
              data-on={on}
              aria-label={`Play The Deepest Mixtape #${tape.number}`}
              onClick={() =>
                on && player.isPlaying
                  ? player.pause()
                  : player.play({
                      href: tape.href,
                      title: `The Deepest Mixtape #${tape.number}`,
                      subtitle: "Sander Kleinenberg",
                    })
              }
            >
              {tape.number}
            </button>
          );
        })}
      </div>
    </div>
  );
}
