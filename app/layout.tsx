import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { viVN } from "@clerk/localizations";
import { Head } from "next/document";
import { cn } from "@/lib/utils";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DiamondBack",
  description: "Cattus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
//      localization={viVN}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={
          cn(
            font.className,
            "bg-white dark:bg-[#915757]",
            "bg-white light:bg-[#48f7f7]"
          )}>
        <ThemeProvider 
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          storageKey="diamondbacc-theme"
        >
       {children}
       </ThemeProvider>
      </body>
      </html>
    </ClerkProvider>
  );
}
