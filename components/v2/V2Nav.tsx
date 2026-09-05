import Link from "next/link";

const LINKS = [
  { href: "#next", label: "Next" },
  { href: "#ledger", label: "Ledger" },
  { href: "#radio", label: "Radio" },
  { href: "#releases", label: "Releases" },
  { href: "#sheet", label: "Flyers" },
];

export default function V2Nav() {
  return (
    <header className="v2-nav">
      <div className="v2-shell v2-nav-in">
        <Link href="/v2/" className="v2-nav-mark">
          <b>SK</b>
          <span>THE LEDGER</span>
        </Link>
        <span className="v2-nav-geo">52.3676° N, 4.9041° E — AMSTERDAM</span>
        <nav aria-label="Sections">
          <ul className="v2-nav-links">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
