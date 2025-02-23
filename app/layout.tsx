import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/shared/header";
import { config } from "@/config";
import Footer from "@/components/shared/footer";
import { ThemeProvider } from "@/components/shared/theme-provider";
import Banner from "@/components/shared/banner";

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
    images: config.ogImage,
  },

  robots: {
    follow: true,
    index: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: config.name,
    card: "summary_large_image",
    images: config.ogImage,
  },
  category: "Technology",
  keywords: ["devmd", "dev.to", "medium", "markdown", "ai", "blog", "blogging"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppinSans.variable} antialiased bg-background`}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Toaster position="top-center" richColors />
          <Header />
          {children}

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
