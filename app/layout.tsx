import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"], 
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "AI Workbench",
  description: "Modern AI-powered workspace for developers and creators",
  keywords: ["AI", "Workbench", "Chat", "Development", "Productivity"],
  authors: [{ name: "AI Workbench Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#111827",
  colorScheme: "dark",
  robots: "index, follow",
  openGraph: {
    title: "AI Workbench",
    description: "Modern AI-powered workspace for developers and creators",
    type: "website",
    locale: "en_US",
    siteName: "AI Workbench",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Workbench",
    description: "Modern AI-powered workspace for developers and creators",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AI Workbench",
  },
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Meta tags for better mobile experience */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Preload critical resources */}
        <link rel="dns-prefetch" href="//openrouter.ai" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Prevent flash of unstyled content */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Ensure dark mode is applied immediately
                document.documentElement.classList.add('dark');
              })();
            `,
          }}
        />
      </head>
      
      <body className="min-h-screen bg-gray-900 text-white antialiased font-sans overflow-hidden">
        {/* Skip to main content for screen readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-blue-600 text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Skip to main content
        </a>
        
        {/* Main application container */}
        <div id="main-content" className="h-screen flex flex-col">
          {children}
        </div>
        
        {/* Global notifications container */}
        <div 
          id="notifications" 
          className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none"
          role="region" 
          aria-label="Notifications"
        >
          {/* Notifications will be rendered here */}
        </div>
        
        {/* Loading overlay */}
        <div 
          id="global-loading" 
          className="hidden fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex items-center gap-4">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-white font-medium">Loading...</span>
          </div>
        </div>
        
        {/* Development indicator */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 left-4 z-40 no-print">
            <div className="bg-yellow-600/20 border border-yellow-500/30 text-yellow-400 px-3 py-2 rounded-lg text-sm font-mono backdrop-blur-sm">
              DEV
            </div>
          </div>
        )}
        
        {/* Global styles for better UX */}
        <style jsx global>{`
          /* Improve mobile Safari experience */
          html {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          
          /* Prevent horizontal scroll on mobile */
          body {
            overflow-x: hidden;
          }
          
          /* Improve touch targets */
          button, 
          [role="button"], 
          input[type="submit"], 
          input[type="button"] {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            touch-action: manipulation;
          }
          
          /* Better focus indicators */
          *:focus-visible {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
          }
          
          /* Smooth scrolling */
          * {
            scroll-behavior: smooth;
          }
          
          @media (prefers-reduced-motion: reduce) {
            * {
              scroll-behavior: auto;
            }
          }
        `}</style>
      </body>
    </html>
  );
}
