import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const bricolage = Bricolage_Grotesque({ 
  subsets: ["latin"],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "Juicera | Future of Freshness",
  description: "A premium juice brand providing scrollytelling experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bricolage.variable} font-sans antialiased text-[#F5F5F5]`}>
        {children}
      </body>
    </html>
  );
}
