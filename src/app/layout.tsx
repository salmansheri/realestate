import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { MobileNavigation } from "@/components/mobile-navigation";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";

const font = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="h-screen max-w-[1000px] mx-auto px-[20px] flex flex-col">
              <Navigation />
              <MobileNavigation />
              {children}
            </main>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
