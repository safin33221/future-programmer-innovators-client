import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* ✅ ONLY viewport export */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

/* ✅ CLEAN metadata (NO viewport, NO themeColor) */
export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: {
    default: "Future Programmer Innovators",
    template: "%s | Future Programmer Innovators",
  },
  description:
    "Future Programmer Innovators is a digital programming club for diploma students focusing on Web Development, App Development, Cybersecurity, Competitive Programming, and professional growth.",
  keywords: [
    "Programming Club",
    "Web Development",
    "App Development",
    "Cybersecurity",
    "Competitive Programming",
    "Future Programmer Innovators",
    "FPI",
    "Diploma Students",
    "Coding Club",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Future Programmer Innovators",
    description:
      "A modern digital coding club helping diploma students become world-class programmers.",
    url: "https://your-domain.com",
    siteName: "Future Programmer Innovators",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Future Programmer Innovators",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Future Programmer Innovators",
    description:
      "A modern digital coding club helping diploma students become world-class programmers.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  applicationName: "Future Programmer Innovators",
  category: "Education",
  alternates: {
    canonical: "https://your-domain.com",
  },
  other: {
    "schema:organization": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Future Programmer Innovators",
      url: "https://your-domain.com",
      logo: "https://your-domain.com/logo.png",
      sameAs: [
        "https://facebook.com/yourpage",
        "https://github.com/yourgithub",
      ],
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
