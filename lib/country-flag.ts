const countryCodes: Record<string, string> = {
  Argentina: "AR", Australia: "AU", BE: "BE", Belgium: "BE", Brazil: "BR", Bulgaria: "BG",
  Canada: "CA", China: "CN", Colombia: "CO", "Costa Rica": "CR", Croatia: "HR", "Czech Republic": "CZ",
  DE: "DE", Egypt: "EG", France: "FR", Germany: "DE", Greece: "GR", Hungary: "HU", Indonesia: "ID",
  Ireland: "IE", Israel: "IL", Italy: "IT", Japan: "JP", Lebanon: "LB", Lithuania: "LT", Luxembourg: "LU",
  Malaysia: "MY", Mexico: "MX", NL: "NL", Netherlands: "NL", Pakistan: "PK", Panama: "PA", Peru: "PE",
  Poland: "PL", Portugal: "PT", "Puerto Rico": "PR", Romania: "RO", Russia: "RU", "Saint Martin": "SX",
  Serbia: "RS", Singapore: "SG", "South Korea": "KR", Spain: "ES", Switzerland: "CH", Turkey: "TR", UK: "GB",
  Ukraine: "UA", "United Arab Emirates": "AE", "United Kingdom": "GB", "United States of America": "US",
};

export function countryFlag(country?: string) {
  const code = country && countryCodes[country];
  return code ? String.fromCodePoint(...[...code].map((letter) => 127397 + letter.charCodeAt(0))) : null;
}
