import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ArrowRight, Copy, FileText, Wand2 } from "lucide-react";
import Header from "@/components/shared/header";
import { config } from "@/config";
import Footer from "@/components/shared/footer";

const poppinSans = Poppins({
  weight: "400",
  variable: "--font-poppins-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: config.name,
  description: config.description,

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: config.url,
    siteName: config.name,
    title: config.name,
    description: config.description,
    images: [
      {
        url: `${config.logo}`,
        width: 1200,
        height: 630,
        alt: config.name,
      },
    ],
  },
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppinSans.variable} antialiased`}
      >
        <Toaster position="top-center" richColors />
        <Header />
        {children}

        <Footer />
      </body>
    </html>
  );
}
