const SOCIALS = [
  { href: "https://soundcloud.com/sanderkleinenberg", label: "SoundCloud" },
  { href: "https://x.com/kleinenberg", label: "X" },
  { href: "https://www.facebook.com/sanderkleinenberg", label: "Facebook" },
  { href: "https://ra.co/dj/sanderk", label: "Resident Advisor" },
];

export default function Footer() {
  return (
    <footer className="relative">
      <div className="divider-glow absolute inset-x-0 top-0" />
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-mono text-[.72rem] uppercase tracking-[.1em] text-ink-dim">
          &copy; {new Date().getFullYear()} Sander Kleinenberg
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[.78rem] text-ink-dim">
          {SOCIALS.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-glow"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
