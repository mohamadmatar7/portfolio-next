import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Container from "@/components/Container";
import { I18nProvider } from "@/i18n/i18n";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mohamad Matar - Portfolio",
  description: "Interactive & Full-Stack Developer Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <I18nProvider>
          <Navbar />
          <main className="pt-16">
            <Container>{children}</Container>
          </main>
        </I18nProvider>
      </body>
    </html>
  );
}
