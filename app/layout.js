import { Space_Grotesk } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Career Development Platform",
  description:
    "AI-powered platform for resume building, interview preparation, and career guidance.",
  icons: {
    icon: "/CDPnew.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${spaceGrotesk.className} min-h-screen flex flex-col`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />

            <main className="flex-1">
              {children}
            </main>

            <footer className="border-t bg-muted/40 py-8">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                <p>
                  © 2026 Code Development Platform. All rights reserved.
                </p>

                <p className="mt-2">
                  Contact us at{" "}
                  <a
                    href="mailto:abc@gmail.com"
                    className="font-medium hover:underline"
                  >
                    abc@gmail.com
                  </a>
                </p>
              </div>
            </footer>

            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}