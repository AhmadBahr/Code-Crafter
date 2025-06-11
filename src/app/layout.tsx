import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/components/providers/convex-client-provider";
import { Toaster } from "sonner";
import { NavigationHeader } from "@/components/navigation-header";
import ErrorBoundary from "./(root)/_components/ErrorBoundary";
import { ToastProvider } from "./(root)/_components/ToastContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code Crafter - Online Code Editor",
  description: "A modern online code editor with real-time execution and collaboration features.",
  keywords: ["code editor", "online IDE", "programming", "collaboration", "real-time execution"],
  authors: [{ name: "Code Crafter Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ErrorBoundary>
            <ConvexClientProvider>
              <ToastProvider>
                <div className="h-full flex flex-col">
                  <NavigationHeader />
                  <main className="flex-1 h-full overflow-hidden">
                    {children}
                  </main>
                </div>
                <Toaster />
              </ToastProvider>
            </ConvexClientProvider>
          </ErrorBoundary>
        </body>
      </html>
    </ClerkProvider>
  );
}

// https://emkc.org/api/v2/piston/runtimes
