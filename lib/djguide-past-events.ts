import type { PastEvent } from "@/lib/ra-past-events";

// DJguide archive entries not already present in Resident Advisor or Partyflock.
// Imported 4 September 2026. DJguide's archive does not expose event artwork in its index.
export type DjguidePastEvent = PastEvent & { sourceName: "DJguide" };

export const djguidePastEvents: DjguidePastEvent[] = [
  {"date":"2007-08-28","title":"Mellow Moods 14 years","venue":"One Four","city":"Den Haag","country":"NL","sourceUrl":"https://www.djguide.nl/party.p/47037/mellow-moods-14-years?language=en","flyerFront":null,"sourceName":"DJguide"},
  {"date":"2008-08-24","title":"Creamfields","venue":"Open Air","city":"Halton, Cheshire","country":"UK","sourceUrl":"https://www.djguide.nl/party.p/55619/creamfields?language=en","flyerFront":null,"sourceName":"DJguide"},
  {"date":"2010-04-16","title":"Electronation @ Klinch","venue":"Melkweg","city":"Amsterdam","country":"NL","sourceUrl":"https://www.djguide.nl/party.p/79392/electronation-klinch?language=en","flyerFront":null,"sourceName":"DJguide"},
  {"date":"2011-02-12","title":"This Is Amsterdam","venue":"Melkweg","city":"Amsterdam","country":"NL","sourceUrl":"https://www.djguide.nl/party.p/91464/this-is-amsterdam?language=en","flyerFront":null,"sourceName":"DJguide"},
  {"date":"2011-07-16","title":"Loveland Festival Fight cancer Afterparty","venue":"Stalker","city":"Haarlem","country":"NL","sourceUrl":"https://www.djguide.nl/party.p/101320/loveland-festival-fight-cancer-afterparty?language=en","flyerFront":null,"sourceName":"DJguide"},
  {"date":"2011-10-28","title":"Jong & Los","venue":"Club Rex","city":"Hilversum","country":"NL","sourceUrl":"https://www.djguide.nl/party.p/106061/jong-los?language=en","flyerFront":null,"sourceName":"DJguide"},
  {"date":"2011-10-28","title":"Smirnoff Nightlife Exchange","venue":"Club Monza","city":"Utrecht","country":"NL","sourceUrl":"https://www.djguide.nl/party.p/106125/smirnoff-nightlife-exchange?language=en","flyerFront":null,"sourceName":"DJguide"},
  {"date":"2013-05-08","title":"Mark Knight / Tocadisco / S. Kleinenberg / S. Noferini @ Toolroom Knights vs Morumbi Nights","venue":"Bootshaus","city":"Köln","country":"DE","sourceUrl":"https://www.djguide.nl/party.p/134670/mark-knight-tocadisco-s.-kleinenberg-s.-noferini-toolroom-knights-vs-morumbi-nights?language=en","flyerFront":null,"sourceName":"DJguide"},
  {"date":"2014-06-08","title":"Promised Land Festival","venue":"De Groene Ster","city":"Leeuwarden","country":"NL","sourceUrl":"https://www.djguide.nl/party.p/167779/promised-land-festival?language=en","flyerFront":null,"sourceName":"DJguide"},
  {"date":"2014-08-22","title":"We R Sander Kleinenberg","venue":"Barbarossa","city":"Scheveningen","country":"NL","sourceUrl":"https://www.djguide.nl/party.p/173471/we-r-sander-kleinenberg?language=en","flyerFront":null,"sourceName":"DJguide"},
  {"date":"2015-04-10","title":"Daydream Festival 2015 - Dream With Your Eyes Open","venue":"De Meysterbergen","city":"Lommel","country":"BE","sourceUrl":"https://www.djguide.nl/party.p/167119/daydream-festival-2015-dream-with-your-eyes-open?language=en","flyerFront":null,"sourceName":"DJguide"},
  {"date":"2015-05-13","title":"Molenstraat Nijmegen Hemelvaart","venue":"Molenstraat","city":"Nijmegen","country":"NL","sourceUrl":"https://www.djguide.nl/party.p/198982/molenstraat-nijmegen-hemelvaart?language=en","flyerFront":null,"sourceName":"DJguide"},
  {"date":"2019-10-19","title":"Sam Feldt presents Heartfeldt Neon Jungle ADE","venue":"Temp.","city":"Amsterdam","country":"NL","sourceUrl":"https://www.djguide.nl/party.p/373831/sam-feldt-presents-heartfeldt-neon-jungle-ade?language=en","flyerFront":null,"sourceName":"DJguide"},
  {"date":"2024-08-24","title":"Valtifest","venue":"Kaap Amsterdam","city":"Amsterdam","country":"NL","sourceUrl":"https://www.djguide.nl/party.p/465295/valtifest?language=en","flyerFront":null,"sourceName":"DJguide"},
  {"date":"2025-01-24","title":"Bijna Zomer 2025 (Jan edition) with Paul Sparkes x Sander Kleinenberg x Brian S x Cris-H","venue":"Crane hotel Faralda","city":"Amsterdam","country":"NL","sourceUrl":"https://www.djguide.nl/party.p/514303/bijna-zomer-2025-jan-edition-with-paul-sparkes-x-sander-kleinenberg-x-brian-s-x-cris-h?language=en","flyerFront":null,"sourceName":"DJguide"},
  {"date":"2025-06-21","title":"WattrWorld","venue":"Boat - Sluis Haveneiland","city":"Amsterdam","country":"NL","sourceUrl":"https://www.djguide.nl/party.p/529320/wattrworld?language=en","flyerFront":null,"sourceName":"DJguide"},
  {"date":"2025-08-17","title":"Beach House","venue":"Paal69","city":"Zandvoort","country":"NL","sourceUrl":"https://www.djguide.nl/party.p/533957/beach-house?language=en","flyerFront":null,"sourceName":"DJguide"},
  {"date":"2025-10-04","title":"Never Too Late Club Dance Event Almelo","venue":"Metropool Almelo","city":"Almelo","country":"NL","sourceUrl":"https://www.djguide.nl/party.p/532096/never-too-late-club-dance-event-almelo?language=en","flyerFront":null,"sourceName":"DJguide"},
];
