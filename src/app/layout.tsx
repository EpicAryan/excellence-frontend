import type { Metadata } from "next";
import { Merienda, Averia_Serif_Libre } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import Providers from './providers'
import { LoaderWrapper } from "@/components";

const merienda = Merienda({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-merienda',
});

const averia = Averia_Serif_Libre({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-averia',
});

export const metadata: Metadata = {
  title: "Excellence",
  description: "Excellence is the way to study",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${merienda.variable} ${averia.variable}`}>
      <body
        className={averia.className}
      >
        <Providers>
           <LoaderWrapper>{children}</LoaderWrapper>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
