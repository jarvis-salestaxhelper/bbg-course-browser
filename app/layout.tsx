import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BBG Course Library",
  description: "Brand Builders Group Course Browser — powered by Jarvis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen" style={{ backgroundColor: '#1a2332' }}>
        {/* Top Nav */}
        <nav style={{ backgroundColor: '#0f1825', borderBottom: '1px solid #2d3d54' }} className="sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-3 group">
                {/* Jarvis logomark */}
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, #c9a84c, #e0c070)', color: '#0f1825' }}>
                  J
                </div>
                <div>
                  <span className="text-white font-bold text-lg tracking-tight">BBG Course Library</span>
                  <span className="ml-2 text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: '#2d3d54', color: '#94a3b8' }}>
                    Jarvis
                  </span>
                </div>
              </Link>
              <div className="flex items-center gap-6">
                <Link href="/" className="text-sm hover:text-yellow-400 transition-colors" style={{ color: '#94a3b8' }}>
                  Courses
                </Link>
                <Link href="/summary" className="text-sm hover:text-yellow-400 transition-colors" style={{ color: '#94a3b8' }}>
                  Summary
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="mt-16 pb-8 text-center text-xs" style={{ color: '#4a5568' }}>
          BBG Course Library · Powered by Jarvis · {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
