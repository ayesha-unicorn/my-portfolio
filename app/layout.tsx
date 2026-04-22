import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monika Sinha | Full Stack Developer",
  description: "Full Stack Developer with 5 years of experience building modern web applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}