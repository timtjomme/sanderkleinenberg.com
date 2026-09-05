import Image from "next/image";
import { releases } from "@/lib/v2/releases";

export default function Releases() {
  return (
    <div className="v2-rel">
      {releases.map((release, index) => (
        <article className="v2-rel-row" key={release.href + index}>
          <span className="v2-rel-art">
            <Image
              src={release.artwork}
              alt={`${release.title} cover art`}
              fill
              sizes="72px"
            />
          </span>
          <div>
            <h3 className="v2-rel-t">{release.title}</h3>
            <p className="v2-rel-a">{release.artists}</p>
          </div>
          <div className="v2-rel-svc">
            {release.services.map((service) => (
              <a
                key={service.name}
                href={service.href}
                target="_blank"
                rel="noopener noreferrer"
                title={service.name}
                aria-label={`${release.title} on ${service.name}`}
              >
                <Image src={service.icon} alt="" width={16} height={16} />
              </a>
            ))}
          </div>
          <a
            className="v2-rel-go"
            href={release.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            ALL LINKS ↗
          </a>
        </article>
      ))}
    </div>
  );
}
