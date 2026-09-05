import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SoundCloudPlayerProvider } from "@/components/SoundCloudPlayer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sander Kleinenberg",
  description:
    "Sander Kleinenberg — the next chapter, built on the moments.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <SoundCloudPlayerProvider>
          <Nav />
          <main className="site-main flex-1">{children}</main>
          <Footer />
        </SoundCloudPlayerProvider>
      </body>
    </html>
  );
}
