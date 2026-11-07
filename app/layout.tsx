import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BazarSight — Bangladesh Retail Intelligence",
  description: "Retail demand planning and inventory intelligence for Bangladesh.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Browser extensions such as Grammarly may add attributes before React hydrates.
  return <html lang="en" suppressHydrationWarning><body suppressHydrationWarning>{children}</body></html>;
}
