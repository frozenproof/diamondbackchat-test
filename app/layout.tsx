import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { PromptProvider } from "@/components/providers/prompt-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DiamondBack 33",
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
            "bg-white dark:bg-[#000000]",
            "bg-white light:bg-[#48f7f7]"
          )}>
        <ThemeProvider 
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          storageKey="diamondbacc-theme"
        >
        <PromptProvider />
       {children}
       </ThemeProvider>
      </body>
      </html>
    </ClerkProvider>
  );
}
