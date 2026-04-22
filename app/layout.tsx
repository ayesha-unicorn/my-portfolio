import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monika Sinha | .NET Developer",
  description: ".NET Developer with 5.5 years of experience in ASP.NET, .NET Core, MVC & RPA",
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