export default function PlaceholderImage({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center border border-dashed border-line-strong bg-surface p-6 text-center ${className}`}
    >
      <p className="font-mono text-[.7rem] uppercase tracking-[.08em] text-ink-dim">
        {label}
      </p>
    </div>
  );
}
