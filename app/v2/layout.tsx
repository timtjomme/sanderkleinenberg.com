import type { Metadata } from "next";
import "./v2.css";

export const metadata: Metadata = {
  title: "Sander Kleinenberg — The Ledger",
  description:
    "An alternative direction: twenty-eight years of dance floors, counted.",
};

export default function V2Layout({ children }: LayoutProps<"/v2">) {
  return <div className="v2-root">{children}</div>;
}
