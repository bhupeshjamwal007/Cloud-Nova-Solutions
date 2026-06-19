import Script from 'next/script';
import "./globals.css";

export const metadata = {
  metadataBase: new URL('https://cloudnova-solution.com'),
  title: {
    default: "Cloud Nova Solution",
    template: "%s | Cloud Nova Solution"
  },
  description: "Let's Build Something Extraordinary. We offer top-tier web development, mobile app development, and custom software solutions.",
  keywords: ["Cloud Nova Solution", "Web Development", "Mobile App Development", "Custom Software", "Next.js", "React", "Tech Agency"],
  authors: [{ name: "Cloud Nova Solutions" }],
  creator: "Cloud Nova Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cloudnova-solution.com",
    title: "Cloud Nova Solution",
    description: "Let's Build Something Extraordinary. We offer top-tier web development, mobile app development, and custom software solutions.",
    siteName: "Cloud Nova Solution",
    // Next.js App Router automatically looks for an opengraph-image.png in the app directory,
    // but you can define it here if you have a specific URL.
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud Nova Solution",
    description: "Let's Build Something Extraordinary. Expert web and mobile app development.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Script - Replace 'ca-pub-YOUR_PUBLISHER_ID_HERE' with your actual AdSense ID */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID_HERE"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
