"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PastEventArchive = dynamic(() => import("@/components/PastEventArchive"));

export default function ArchiveEasterEgg() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    let firstKeyAt = 0;

    const unlockWithFiveK = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const now = Date.now();

      if (key === "5") {
        firstKeyAt = now;
        return;
      }

      if (key === "k" && now - firstKeyAt < 1400) setUnlocked(true);
      firstKeyAt = 0;
    };

    window.addEventListener("keydown", unlockWithFiveK);
    return () => window.removeEventListener("keydown", unlockWithFiveK);
  }, []);

  if (unlocked) return <PastEventArchive />;

  return (
    <div className="archive-easter-egg">
      <button type="button" onClick={() => setUnlocked(true)} aria-label="Open hidden archive">
        5K
      </button>
    </div>
  );
}
