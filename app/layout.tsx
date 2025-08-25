import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Workbench",
  description: "Modern AI-powered workspace for developers and creators",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#0b0b0f",
  colorScheme: "dark",
  appleWebApp: { 
    capable: true, 
    statusBarStyle: "black-translucent", 
    title: "AI Workbench" 
  },
  openGraph: { 
    title: "AI Workbench", 
    description: "Modern AI-powered workspace", 
    type: "website", 
    siteName: "AI Workbench", 
    locale: "en_US" 
  },
  twitter: { 
    card: "summary_large_image", 
    title: "AI Workbench", 
    description: "Modern AI-powered workspace" 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable}`} suppressHydrationWarning>
      <head>
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('dark');`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#0b0b0f] text-gray-100 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Skip to content
        </a>

        <div className="grid grid-cols-[280px_minmax(0,1fr)] grid-rows-[56px_minmax(0,1fr)] h-dvh">
          <header className="col-span-2 row-[1] flex items-center px-4 border-b border-white/10 bg-black/40 backdrop-blur">
            <div className="font-medium text-white/90">AI Workbench</div>
            <div className="ml-auto flex items-center gap-2 text-white/60">
              {/* Action icons */}
            </div>
          </header>

          <aside className="row-[2] border-r border-white/10 bg-black/30 overflow-y-auto">
            <div className="p-3 text-xs uppercase tracking-wide text-white/40">Chats</div>
          </aside>

          <main id="main" className="row-[2] overflow-hidden bg-[#0b0b0f]">
            <div className="h-full w-full overflow-y-auto">{children}</div>
          </main>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-4 left-4 z-40">
            <div className="bg-yellow-600/20 border border-yellow-500/30 text-yellow-300 px-2 py-1 rounded-md text-xs font-mono">
              DEV
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
