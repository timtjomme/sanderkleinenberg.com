export type Show = {
  date: string; // ISO date
  dateLabel: string;
  title: string;
  venue: string;
  city: string;
  status: "upcoming" | "past";
};

// Source: Resident Advisor (ra.co/dj/sanderk), checked 31 August 2026.
// Update as new shows are confirmed — RA only lists the last couple of
// seasons of past events, not the full history.
export const shows: Show[] = [
  {
    date: "2026-12-12",
    dateLabel: "Sat 12 Dec 2026",
    title: "Winter of Love festival 2026",
    venue: "Thuishaven",
    city: "Amsterdam",
    status: "upcoming",
  },
  {
    date: "2026-09-26",
    dateLabel: "Sat 26 Sep 2026",
    title: "Paal Closing",
    venue: "Paal69",
    city: "Amsterdam",
    status: "upcoming",
  },
  {
    date: "2026-06-20",
    dateLabel: "Sat 20 Jun 2026",
    title: "Tide",
    venue: "Paal69",
    city: "Amsterdam",
    status: "past",
  },
  {
    date: "2026-05-24",
    dateLabel: "Sun 24 May 2026",
    title: "10 yrs of Pand 13 presents Samuel Deep & Sander Kleinenberg",
    venue: "Houtbaar Haarlem",
    city: "Amsterdam",
    status: "past",
  },
  {
    date: "2026-05-08",
    dateLabel: "Fri 8 May 2026",
    title: "IOOI presents: Sander Kleinenberg",
    venue: "Iocerouno",
    city: "Monterrey",
    status: "past",
  },
  {
    date: "2026-03-07",
    dateLabel: "Sat 7 Mar 2026",
    title: "Wooferland, Summer of Love & The Beginning pres. Het Wintercircus — 10 year anniversary at Thuishaven",
    venue: "Thuishaven",
    city: "Amsterdam",
    status: "past",
  },
  {
    date: "2025-11-08",
    dateLabel: "Sat 8 Nov 2025",
    title: "The Rave Game 2.0",
    venue: "Thuishaven",
    city: "Amsterdam",
    status: "past",
  },
  {
    date: "2025-10-04",
    dateLabel: "Sat 4 Oct 2025",
    title: "Summer of Love pres. Autumn Love Maassilo",
    venue: "Maassilo",
    city: "Rotterdam",
    status: "past",
  },
  {
    date: "2025-08-16",
    dateLabel: "Sat 16 Aug 2025",
    title: "Berlin presents Sander Kleinenberg",
    venue: "Carat's Cafe & Bar",
    city: "Brighton",
    status: "past",
  },
  {
    date: "2025-07-18",
    dateLabel: "Fri 18 Jul 2025",
    title: "Sander Kleinenberg",
    venue: "SILO",
    city: "New York City",
    status: "past",
  },
  {
    date: "2025-06-06",
    dateLabel: "Fri 6 Jun 2025",
    title: "Sander Kleinenberg with Sherif + Aledro",
    venue: "Magic Stick",
    city: "Detroit",
    status: "past",
  },
  {
    date: "2025-05-16",
    dateLabel: "Fri 16 May 2025",
    title: "Temple presents Sander Kleinenberg",
    venue: "TEMPLE",
    city: "Lisbon",
    status: "past",
  },
  {
    date: "2025-05-03",
    dateLabel: "Sat 3 May 2025",
    title: "Sander Kleinenberg + Fer Romano + Josta",
    venue: "Fünk",
    city: "Mexico City",
    status: "past",
  },
  {
    date: "2025-03-12",
    dateLabel: "Wed 12 Mar 2025",
    title: "SXM Festival 2025",
    venue: "Happy Bay Beach",
    city: "Saint Martin",
    status: "past",
  },
];

export const upcomingShows = shows
  .filter((s) => s.status === "upcoming")
  .sort((a, b) => a.date.localeCompare(b.date));

export const pastShows = shows
  .filter((s) => s.status === "past")
  .sort((a, b) => b.date.localeCompare(a.date));
