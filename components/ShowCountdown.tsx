"use client";

import { useEffect, useState } from "react";

function daysRemaining(date: string) {
  const eventStart = new Date(`${date}T00:00:00+02:00`).getTime();
  return Math.max(0, Math.ceil((eventStart - Date.now()) / 86_400_000));
}

export default function ShowCountdown({ date }: { date: string }) {
  const [days, setDays] = useState(() => daysRemaining(date));

  useEffect(() => {
    const refresh = () => setDays(daysRemaining(date));
    const timer = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(timer);
  }, [date]);

  return <span>{days === 0 ? "TODAY" : `${days} DAYS TO GO`}</span>;
}
