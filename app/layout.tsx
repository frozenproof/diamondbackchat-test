import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { viVN } from "@clerk/localizations";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Uwu",
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
      <html lang="en">
        <body className={font.className}>
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
