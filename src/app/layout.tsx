import type { Metadata } from "next";
import { Overpass as Font } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const font = Font({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Expletive",
  description:
    "Detect strong language instantly - less than 2 seconds is all it takes.",
  icons: {
    icon: {
      rel: "icon",
      type: "image/png",
      url: "/favicon.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          font.variable,
        )}
      >
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
