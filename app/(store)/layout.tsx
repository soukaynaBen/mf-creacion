import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Header from "@/components/ui/Header";
import { SanityLive } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import DisableDraftMode from "@/components/DisableDraftMode";
import { VisualEditing } from "next-sanity";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<ClerkProvider dynamic>
        <html lang="en" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {(await draftMode()).isEnabled && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
        <main>
          <Header/>
          {children}
        </main>
        <SanityLive />
      </body>
    </html>
  </ClerkProvider>);
}
