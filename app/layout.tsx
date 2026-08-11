import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import {
  AnnouncementBar,
  SiteFooter,
  SiteHeader,
} from "@/components/layout/site-shell";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "AlafiaMart — Dietary-first health & wellness",
    template: "%s · AlafiaMart",
  },
  description:
    "Verified gluten-free, low-GI & NAFDAC-checked products, delivered same-day across Lagos, Abuja and Ibadan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${jakarta.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <CartProvider>
          <AnnouncementBar />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
