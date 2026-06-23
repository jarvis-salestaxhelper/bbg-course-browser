import type { Metadata } from "next";
import "./globals.css";
import SiteFrame from "@/components/SiteFrame";

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
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
