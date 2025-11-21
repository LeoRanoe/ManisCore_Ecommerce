import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from 'next/font/google';
import "./globals.css";
import { ProgressBarProvider } from "@/components/providers/ProgressBarProvider";
import { Toaster } from "sonner";

// Load Inter font using Next.js font optimization
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "ManisCore E-Commerce",
  description: "Premium E-Commerce Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for API domain if external */}
        <link rel="dns-prefetch" href="https://api.example.com" />
      </head>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>
          <ProgressBarProvider>
            {children}
            <Toaster 
              position="top-right"
              richColors
              closeButton
              duration={3000}
            />
          </ProgressBarProvider>
        </Suspense>
      </body>
    </html>
  );
}
