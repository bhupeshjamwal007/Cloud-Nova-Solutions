import Script from 'next/script';
import "./globals.css";

export const metadata = {
  metadataBase: new URL('https://cloudnova-solution.com'),
  title: {
    default: "Cloud Nova Solution | Web & App Development",
    template: "%s | Cloud Nova Solution"
  },
  description: "Let's Build Something Extraordinary. Expert web, mobile app, and custom software development solutions.",
  keywords: ["Cloud Nova Solution", "Web Development", "Mobile App Development", "Custom Software", "Next.js", "React", "Tech Agency"],
  authors: [{ name: "Cloud Nova Solutions" }],
  creator: "Cloud Nova Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cloudnova-solution.com",
    title: "Cloud Nova Solution | Web & App Development",
    description: "Let's Build Something Extraordinary. Expert web, mobile app, and custom software development solutions.",
    siteName: "Cloud Nova Solution",
    images: [
      {
        url: "https://cloudnova-solution.com/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Cloud Nova Solution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud Nova Solution | Web & App Development",
    description: "Let's Build Something Extraordinary. Expert web, mobile app, and custom software development solutions.",
    images: ["https://cloudnova-solution.com/opengraph.png"],
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
