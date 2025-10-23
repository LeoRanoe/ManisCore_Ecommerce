import type { Metadata } from "next";
import "./globals.css";
import { ProgressBarProvider } from "@/components/providers/ProgressBarProvider";
import { Toaster } from "sonner";

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
    <html lang="en">
      <body className="font-sans antialiased">
        <ProgressBarProvider>
          {children}
          <Toaster 
            position="top-right"
            richColors
            closeButton
            duration={3000}
          />
        </ProgressBarProvider>
      </body>
    </html>
  );
}
