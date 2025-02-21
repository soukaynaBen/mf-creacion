import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "MF Creacion",
  description: "Choose from an array of embroidered t-shirts, hoodies & more online at MFCreacion or upload your own images",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="en">
      <body
      >
        {children}
      </body>
    </html>)
}
