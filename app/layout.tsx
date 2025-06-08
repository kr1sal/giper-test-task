import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Test Tasks for giper.fm",
  description: "Just another test tasks for giper.fm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
