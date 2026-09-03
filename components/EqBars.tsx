const HEIGHTS = [
  35, 60, 25, 80, 45, 70, 30, 90, 50, 20, 65, 40, 75, 30, 55, 85, 45, 25,
];

export default function EqBars() {
  return (
    <div aria-hidden="true" className="flex h-14 items-end gap-1">
      {HEIGHTS.map((h, i) => (
        <span
          key={i}
          className="eq-bar flex-1 rounded-t-sm"
          style={{
            height: `${h}%`,
            animationDelay: `${(i % 6) * 0.12}s`,
            background: "linear-gradient(to top, var(--orange), var(--amber))",
          }}
        />
      ))}
    </div>
  );
}
