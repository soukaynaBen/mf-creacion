import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Header from "@/components/ui/Header";
import { SanityLive } from "@/sanity/lib/live";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<ClerkProvider dynamic>
        <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          <Header/>
          {children}
        </main>
        <SanityLive />
      </body>
    </html>
  </ClerkProvider>);
}
