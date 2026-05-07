import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:       "NoorVenture — Halal Peer-to-Business Financing",
  description: "Shariah-compliant investment platform connecting investors and business owners through Musharakah (profit-loss sharing). Zero interest, maximum barakah.",
  keywords:    ["halal investment", "musharakah", "islamic finance", "business funding", "shariah compliant"],
  openGraph: {
    title:       "NoorVenture",
    description: "Halal Peer-to-Business Financing Platform",
    type:        "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
