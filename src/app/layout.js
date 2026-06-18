import "./globals.css";

export const metadata = {
  title: "Cloud Nova - Next.js",
  description: "Rebuilding from absolute scratch",
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
