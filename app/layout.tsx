import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800"], 
  variable: "--font-inter",
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "AI Workbench",
  description: "Contemporary minimalist interface for AI collaboration",
  keywords: ["AI", "Workbench", "Chat", "Artifacts", "Collaboration"],
  authors: [{ name: "AI Workbench Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#FFFFFF",
  colorScheme: "light",
  robots: "index, follow",
  openGraph: {
    title: "AI Workbench",
    description: "Contemporary minimalist interface for AI collaboration",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Workbench",
    description: "Contemporary minimalist interface for AI collaboration",
  },
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//openrouter.ai" />
        
        {/* Prevent FOUC (Flash of Unstyled Content) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  document.documentElement.className = document.documentElement.className.replace(/\\blight\\b|\\bdark\\b/g, '') + ' ' + theme;
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      
      <body className="min-h-screen bg-white text-black antialiased font-sans">
        {/* Skip Navigation Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-black text-white rounded-2xl transition-all"
        >
          Skip to main content
        </a>
        
        {/* Main Content */}
        <main id="main-content" role="main">
          {children}
        </main>
        
        {/* Global Loading Indicator */}
        <div id="global-loading" className="hidden fixed top-4 right-4 z-50">
          <div className="px-4 py-2 bg-black/10 backdrop-blur-sm rounded-2xl text-sm text-black/70">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-black/20 border-t-black/70 rounded-full animate-spin" />
              Processing...
            </div>
          </div>
        </div>
        
        {/* Toast Container */}
        <div id="toast-container" className="fixed bottom-4 right-4 z-50 space-y-2"></div>
        
        {/* Development Helper */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 left-4 z-50">
            <div className="px-3 py-2 bg-black/5 backdrop-blur-sm rounded-2xl text-xs text-black/50">
              Dev Mode
            </div>
          </div>
        )}
        
        {/* Analytics Scripts */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Add your analytics scripts here */}
          </>
        )}
      </body>
    </html>
  );
}
