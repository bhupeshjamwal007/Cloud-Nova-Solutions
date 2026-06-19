import "./globals.css";

export const metadata = {
  title: "Cloud Nova Solution",
  description: "Cloud Nova Solutions - Let's Build Something Extraordinary.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
