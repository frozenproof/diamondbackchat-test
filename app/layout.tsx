import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { PromptProvider } from "@/components/providers/prompt-provider";
import { LoadingMainPage } from "@/components/uihelper/loading-wait";
import { Suspense } from "react";
import { SocketProvider } from "@/components/providers/socket-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const dynamicParams = true 
export const maxDuration = 5
export const metadata: Metadata = {
  title: "Euphoria",
  description: "Everything you need , by Cattus",
  icons: "icon8.ico"
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
            <Suspense
              fallback={
                <LoadingMainPage />
              }
            >
              <ThemeProvider 
                attribute="class"
                defaultTheme="light"
                enableSystem={true}
                storageKey="diamondbacc-theme"
              >
                <link rel="icon" href="/icon.ico" sizes="any" />
                <SocketProvider>
                  <PromptProvider />
                    {children}
                </SocketProvider>
                </ThemeProvider>
            </Suspense>
      </body>
      </html>
    </ClerkProvider>
  );
}
