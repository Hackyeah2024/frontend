import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/widgets";
import { Toaster } from "@/shared/ui";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" dir="ltr">
        <body className={`${inter.className} antialiased`}>
          <Header />
          <main className="flex-auto">{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
