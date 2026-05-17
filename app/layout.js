import { Bebas_Neue, Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Revline — Showroom de Supercars",
  description: "Le showroom virtuel premium pour supercars d'exception",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${bebasNeue.variable} ${barlowCondensed.variable} ${barlow.variable} antialiased`}
      >
        <Cursor />
        {children}
      </body>
    </html>
  );
}
