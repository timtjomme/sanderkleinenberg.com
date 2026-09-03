"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/tour/", label: "Live" },
  { href: "/#music", label: "Music" },
  { href: "/story/", label: "Archive" },
  { href: "/#visuals", label: "Visuals" },
  { href: "/booking/", label: "Book" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-shell flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-5">
        <Link
          href="/"
          className="site-wordmark"
        >
          <span>SANDER</span>
          <span>KLEINENBERG</span>
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[.72rem] uppercase tracking-[.12em]">
            {LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={
                      active
                        ? "text-signal"
                        : "text-ink-dim transition-colors hover:text-ink"
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
