import Script from 'next/script';
import "./globals.css";

export const metadata = {
  title: "Cloud Nova Solution",
  description: "Cloud Nova Solutions - Let's Build Something Extraordinary.",
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
