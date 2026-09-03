import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes a plain `out/` folder that can be
  // uploaded to any host over FTP — no Node process on the server.
  output: "export",
  // No image optimizer without a server, so `next/image` serves the files as-is.
  images: { unoptimized: true },
  // Emit `verhaal/index.html` rather than `verhaal.html`, so Apache/nginx resolve
  // clean URLs without extra rewrite rules.
  trailingSlash: true,
};

export default nextConfig;
