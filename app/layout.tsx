import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ReduxProvider } from "./redux/provider";
import { ThemeProvider } from "next-themes"; 

export const metadata: Metadata = {
  title: {
    template: "%s | Next.js Starter Kit",
    default: "Next.js Starter Kit - Modern Dashboard with Redux",
  },
  description:
    "A comprehensive Next.js 16 starter kit with Redux Toolkit, dashboard components, user management, and modern architecture.",
  keywords: ["Next.js", "React", "Redux", "Dashboard", "Starter Kit", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "Your Name" }],
  creator: "Next.js Starter Kit",
  publisher: "Next.js Starter Kit",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Next.js Starter Kit - Modern Dashboard with Redux",
    description:
      "A comprehensive Next.js 16 starter kit with Redux Toolkit, dashboard components, and user management.",
    siteName: "Next.js Starter Kit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Starter Kit - Modern Dashboard with Redux",
    description:
      "A comprehensive Next.js 16 starter kit with Redux Toolkit, dashboard components, and user management.",
    creator: "@yourhandle",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen font-sans ">
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"         // default to dark mode
            enableSystem={false}       // optional, system mode off for demo
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
