"use client";

import Image from "next/image";
import { useState } from "react";

const releases = [
  {
    title: "My Lexicon",
    artists: "Sander Kleinenberg × Helsloot",
    artwork: "/images/releases/my-lexicon-helsloot.jpg",
    href: "https://armada.lnk.to/MyLexiconHelslootWA",
    services: [
      { name: "Spotify", icon: "/images/services/spotify.svg", href: "https://open.spotify.com/track/4QrXptjPgVIdsDCoSp8nji" },
      { name: "Apple Music", icon: "/images/services/apple-music.svg", href: "https://music.apple.com/fi/album/1856508725?i=1856508726" },
      { name: "iTunes", icon: "/images/services/itunes.svg", href: "https://music.apple.com/fi/album/1856508725?i=1856508726&app=itunes" },
      { name: "YouTube Music", icon: "/images/services/youtube-music.svg", href: "https://music.youtube.com/watch?v=SD9GaEMBZJo" },
      { name: "Amazon Music", icon: "/images/services/amazon-music.svg", href: "https://music.amazon.com/tracks/B0G48JNNJH/" },
      { name: "Deezer", icon: "/images/services/deezer.svg", href: "https://www.deezer.com/track/3681229602" },
      { name: "Beatport", icon: "/images/services/beatport.svg", href: "https://www.beatport.com/release/my-lexicon/5656201" },
      { name: "Tidal", icon: "/images/services/tidal.svg", href: "https://tidal.com/track/477240289" },
    ],
  },
  {
    title: "My Lexicon",
    artists: "Sander Kleinenberg × T_Mo",
    artwork: "/images/releases/my-lexicon-tmo.jpg",
    href: "https://armada.lnk.to/MyLexiconTMO",
    services: [
      { name: "Spotify", icon: "/images/services/spotify.svg", href: "https://open.spotify.com/track/78oK40shzFPg5GEJUzoKrn" },
      { name: "Apple Music", icon: "/images/services/apple-music.svg", href: "https://music.apple.com/fi/album/1860649357?i=1860649358" },
      { name: "iTunes", icon: "/images/services/itunes.svg", href: "https://music.apple.com/fi/album/1860649357?i=1860649358&app=itunes" },
      { name: "YouTube Music", icon: "/images/services/youtube-music.svg", href: "https://music.youtube.com/watch?v=KEq-DnyKJT0" },
      { name: "Amazon Music", icon: "/images/services/amazon-music.svg", href: "https://music.amazon.com/tracks/B0G6FS4T5R/" },
      { name: "Deezer", icon: "/images/services/deezer.svg", href: "https://www.deezer.com/track/3710682342" },
      { name: "Beatport", icon: "/images/services/beatport.svg", href: "https://www.beatport.com/release/my-lexicon/5706835" },
      { name: "Tidal", icon: "/images/services/tidal.svg", href: "https://tidal.com/track/480981019" },
    ],
  },
  {
    title: "My Lexicon",
    artists: "Sander Kleinenberg × Leena Punks",
    artwork: "/images/releases/my-lexicon-leena-punks.jpg",
    href: "https://armada.lnk.to/MyLexiconLeenaPunks",
    services: [
      { name: "Spotify", icon: "/images/services/spotify.svg", href: "https://open.spotify.com/album/0TEb4sJglTysYRwi5GiKDi" },
      { name: "Apple Music", icon: "/images/services/apple-music.svg", href: "https://music.apple.com/fi/album/6797872302" },
      { name: "iTunes", icon: "/images/services/itunes.svg", href: "https://music.apple.com/fi/album/6797872302?app=itunes" },
      { name: "YouTube Music", icon: "/images/services/youtube-music.svg", href: "https://music.youtube.com/playlist?list=OLAK5uy_n6HOJ7dTxB4ksC5_p3unyf5rQUt5D94OY" },
      { name: "Amazon Music", icon: "/images/services/amazon-music.svg", href: "https://music.amazon.com/albums/B0HCW18RJL" },
      { name: "Deezer", icon: "/images/services/deezer.svg", href: "https://www.deezer.com/album/1045889822" },
      { name: "Beatport", icon: "/images/services/beatport.svg", href: "https://www.beatport.com/release/my-lexicon/5656201" },
      { name: "Tidal", icon: "/images/services/tidal.svg", href: "https://tidal.com/album/549101938" },
    ],
  },
  {
    title: "My Lexicon",
    artists: "Sander Kleinenberg × THEMBA × Kintar feat. Kyozo",
    artwork: "/images/releases/my-lexicon-themba-kintar.jpg",
    href: "https://armada.lnk.to/MyLexiconTKK",
    services: [
      { name: "Spotify", icon: "/images/services/spotify.svg", href: "https://open.spotify.com/track/2AOa2150EoUG5lTyL2TrPC" },
      { name: "Apple Music", icon: "/images/services/apple-music.svg", href: "https://music.apple.com/fi/album/1858244104?i=1858244105" },
      { name: "iTunes", icon: "/images/services/itunes.svg", href: "https://music.apple.com/fi/album/1858244104?i=1858244105&app=itunes" },
      { name: "YouTube Music", icon: "/images/services/youtube-music.svg", href: "https://music.youtube.com/watch?v=HiyW-ArJwoc" },
      { name: "Amazon Music", icon: "/images/services/amazon-music.svg", href: "https://music.amazon.com/tracks/B0G4WW2CP4/" },
      { name: "Deezer", icon: "/images/services/deezer.svg", href: "https://www.deezer.com/track/3693921802" },
      { name: "Beatport", icon: "/images/services/beatport.svg", href: "https://www.beatport.com/release/my-lexicon/5676641" },
      { name: "Tidal", icon: "/images/services/tidal.svg", href: "https://tidal.com/track/478610206" },
    ],
  },
  {
    title: "Cuts Deep",
    artists: "Sander Kleinenberg & THEMBA feat. taktd",
    artwork: "/images/releases/cuts-deep.jpg",
    href: "https://armada.lnk.to/CutsDeep",
    services: [
      { name: "Spotify", icon: "/images/services/spotify.svg", href: "https://open.spotify.com/track/5TxIv5M6Ov2ldbAJHL9FWr" },
      { name: "Apple Music", icon: "/images/services/apple-music.svg", href: "https://music.apple.com/fi/album/1845050514?i=1845050515" },
      { name: "iTunes", icon: "/images/services/itunes.svg", href: "https://music.apple.com/fi/album/1845050514?i=1845050515&app=itunes" },
      { name: "YouTube Music", icon: "/images/services/youtube-music.svg", href: "https://music.youtube.com/watch?v=vl4-TAtzdKY" },
      { name: "Amazon Music", icon: "/images/services/amazon-music.svg", href: "https://music.amazon.com/tracks/B0FVFH38RB/" },
      { name: "Deezer", icon: "/images/services/deezer.svg", href: "https://www.deezer.com/album/834973922" },
      { name: "Beatport", icon: "/images/services/beatport.svg", href: "https://www.beatport.com/release/cuts-deep/5484153" },
      { name: "Tidal", icon: "/images/services/tidal.svg", href: "https://tidal.com/track/465844724" },
    ],
  },
];

export default function LatestReleaseCoverflow() {
  const [activeIndex, setActiveIndex] = useState(2);
  const activeRelease = releases[activeIndex];

  const getPosition = (index: number) => {
    let offset = index - activeIndex;
    const half = Math.floor(releases.length / 2);
    if (offset > half) offset -= releases.length;
    if (offset < -half) offset += releases.length;
    return offset;
  };

  return (
    <div className="release-coverflow" aria-label="Latest releases">
      <div className="release-coverflow-rail">
        {releases.map((release, index) => (
          <a
            href={release.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`release-cover release-cover--${getPosition(index)}`}
            key={release.href}
            aria-label={index === activeIndex ? `Open ${release.title} by ${release.artists}` : `Show ${release.title} by ${release.artists}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={(event) => {
              if (index !== activeIndex) {
                event.preventDefault();
                setActiveIndex(index);
              }
            }}
            style={{ zIndex: 10 - Math.abs(getPosition(index)) }}
          >
            <span className="release-art">
              <Image src={release.artwork} alt={`${release.title} cover art`} width={440} height={440} sizes="(max-width: 700px) 68vw, 18vw" />
            </span>
          </a>
        ))}
      </div>
      <div className="release-current">
        <p className="release-number">{String(activeIndex + 1).padStart(2, "0")} / {String(releases.length).padStart(2, "0")}</p>
        <h3>{activeRelease.title}</h3>
        <p>{activeRelease.artists}</p>
        <div className="release-services" aria-label={`Listen to ${activeRelease.title}`}>
          {activeRelease.services.map((service) => (
            <a key={service.name} href={service.href} target="_blank" rel="noopener noreferrer" aria-label={`Listen on ${service.name}`} title={service.name}>
              {/* Local SVG service logos; the static export runs no image
                  optimizer, so next/image would gain nothing here. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={service.icon} alt="" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
