import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/widgets";
import { Toaster } from "@/shared/ui";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpeechFlow",
  description: "SpeechFlow - analiza wypowiedzi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="flex-auto">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
