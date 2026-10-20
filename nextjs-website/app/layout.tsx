import type { Metadata, Viewport } from "next";
import { evolve, bricolage } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Palazzo Gualbes", template: "%s · Palazzo Gualbes" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" suppressHydrationWarning className={`${evolve.variable} ${bricolage.variable}`}>
      <body>{children}</body>
    </html>
  );
}
