export type Service = { name: string; icon: string; href: string };
export type Release = {
  title: string;
  artists: string;
  artwork: string;
  href: string;
  services: Service[];
};

const s = (name: string, icon: string, href: string): Service => ({ name, icon, href });

export const releases: Release[] = [
  {
    title: "My Lexicon",
    artists: "Sander Kleinenberg × Leena Punks",
    artwork: "/images/releases/my-lexicon-leena-punks.jpg",
    href: "https://armada.lnk.to/MyLexiconLeenaPunks",
    services: [
      s("Spotify", "/images/services/spotify.svg", "https://open.spotify.com/album/0TEb4sJglTysYRwi5GiKDi"),
      s("Apple Music", "/images/services/apple-music.svg", "https://music.apple.com/fi/album/6797872302"),
      s("YouTube Music", "/images/services/youtube-music.svg", "https://music.youtube.com/playlist?list=OLAK5uy_n6HOJ7dTxB4ksC5_p3unyf5rQUt5D94OY"),
      s("Amazon Music", "/images/services/amazon-music.svg", "https://music.amazon.com/albums/B0HCW18RJL"),
      s("Deezer", "/images/services/deezer.svg", "https://www.deezer.com/album/1045889822"),
      s("Beatport", "/images/services/beatport.svg", "https://www.beatport.com/release/my-lexicon/5656201"),
      s("Tidal", "/images/services/tidal.svg", "https://tidal.com/album/549101938"),
    ],
  },
  {
    title: "My Lexicon",
    artists: "Sander Kleinenberg × T_Mo",
    artwork: "/images/releases/my-lexicon-tmo.jpg",
    href: "https://armada.lnk.to/MyLexiconTMO",
    services: [
      s("Spotify", "/images/services/spotify.svg", "https://open.spotify.com/track/78oK40shzFPg5GEJUzoKrn"),
      s("Apple Music", "/images/services/apple-music.svg", "https://music.apple.com/fi/album/1860649357?i=1860649358"),
      s("YouTube Music", "/images/services/youtube-music.svg", "https://music.youtube.com/watch?v=KEq-DnyKJT0"),
      s("Amazon Music", "/images/services/amazon-music.svg", "https://music.amazon.com/tracks/B0G6FS4T5R/"),
      s("Deezer", "/images/services/deezer.svg", "https://www.deezer.com/track/3710682342"),
      s("Beatport", "/images/services/beatport.svg", "https://www.beatport.com/release/my-lexicon/5706835"),
      s("Tidal", "/images/services/tidal.svg", "https://tidal.com/track/480981019"),
    ],
  },
  {
    title: "My Lexicon",
    artists: "Sander Kleinenberg × THEMBA × Kintar feat. Kyozo",
    artwork: "/images/releases/my-lexicon-themba-kintar.jpg",
    href: "https://armada.lnk.to/MyLexiconTKK",
    services: [
      s("Spotify", "/images/services/spotify.svg", "https://open.spotify.com/track/2AOa2150EoUG5lTyL2TrPC"),
      s("Apple Music", "/images/services/apple-music.svg", "https://music.apple.com/fi/album/1858244104?i=1858244105"),
      s("YouTube Music", "/images/services/youtube-music.svg", "https://music.youtube.com/watch?v=HiyW-ArJwoc"),
      s("Amazon Music", "/images/services/amazon-music.svg", "https://music.amazon.com/tracks/B0G4WW2CP4/"),
      s("Deezer", "/images/services/deezer.svg", "https://www.deezer.com/track/3693921802"),
      s("Beatport", "/images/services/beatport.svg", "https://www.beatport.com/release/my-lexicon/5676641"),
      s("Tidal", "/images/services/tidal.svg", "https://tidal.com/track/478610206"),
    ],
  },
  {
    title: "My Lexicon",
    artists: "Sander Kleinenberg × Helsloot",
    artwork: "/images/releases/my-lexicon-helsloot.jpg",
    href: "https://armada.lnk.to/MyLexiconHelslootWA",
    services: [
      s("Spotify", "/images/services/spotify.svg", "https://open.spotify.com/track/4QrXptjPgVIdsDCoSp8nji"),
      s("Apple Music", "/images/services/apple-music.svg", "https://music.apple.com/fi/album/1856508725?i=1856508726"),
      s("YouTube Music", "/images/services/youtube-music.svg", "https://music.youtube.com/watch?v=SD9GaEMBZJo"),
      s("Amazon Music", "/images/services/amazon-music.svg", "https://music.amazon.com/tracks/B0G48JNNJH/"),
      s("Deezer", "/images/services/deezer.svg", "https://www.deezer.com/track/3681229602"),
      s("Beatport", "/images/services/beatport.svg", "https://www.beatport.com/release/my-lexicon/5656201"),
      s("Tidal", "/images/services/tidal.svg", "https://tidal.com/track/477240289"),
    ],
  },
  {
    title: "Cuts Deep",
    artists: "Sander Kleinenberg & THEMBA feat. taktd",
    artwork: "/images/releases/cuts-deep.jpg",
    href: "https://armada.lnk.to/CutsDeep",
    services: [
      s("Spotify", "/images/services/spotify.svg", "https://open.spotify.com/track/5TxIv5M6Ov2ldbAJHL9FWr"),
      s("Apple Music", "/images/services/apple-music.svg", "https://music.apple.com/fi/album/1845050514?i=1845050515"),
      s("YouTube Music", "/images/services/youtube-music.svg", "https://music.youtube.com/watch?v=vl4-TAtzdKY"),
      s("Amazon Music", "/images/services/amazon-music.svg", "https://music.amazon.com/tracks/B0FVFH38RB/"),
      s("Deezer", "/images/services/deezer.svg", "https://www.deezer.com/album/834973922"),
      s("Beatport", "/images/services/beatport.svg", "https://www.beatport.com/release/cuts-deep/5484153"),
      s("Tidal", "/images/services/tidal.svg", "https://tidal.com/track/465844724"),
    ],
  },
];
