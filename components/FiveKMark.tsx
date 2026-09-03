import Image from "next/image";

export default function FiveKMark({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/images/5k-original.png"
      alt="5K"
      width={624}
      height={604}
      priority={priority}
      className={`five-k-mark ${className}`}
    />
  );
}
