import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter, Roboto_Slab } from "next/font/google";
import { site } from "@/lib/runners/site";
import "./runners.css"; // pre-compiled Tailwind output — source is runners.tailwind.css (npm run css:runners)

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: "Run Free. Never Run Alone. | My Guardian Link for Runners",
  alternates: { canonical: "/runners/" },
  description:
    "My Guardian Link helps runners send their identity, GPS location, and urgent need for help when they cannot safely call, speak, or explain — plus everyday check-ins, reporting, and roadside assistance.",
  openGraph: {
    title: "Run Free. Never Run Alone. | My Guardian Link",
    description:
      "Protection, connection, and coordination for runners — before, during, and after the run. Set up in about 10 minutes.",
    type: "website",
    url: "/runners/",
    siteName: "My Guardian Link",
  },
  // Square brand icon preview (opengraph-image.png / twitter-image.png in this folder)
  twitter: { card: "summary" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10233a",
};

export default function RunnersLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlowCondensed.variable} ${robotoSlab.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Enable scroll-reveal styles before first paint; without JS everything stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('reveal-on')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
