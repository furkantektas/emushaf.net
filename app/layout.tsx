'use client';
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ThemeColorSetter from "./ui/theme-color-setter";
import { PreferencesProvider } from './context/preferences';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {


  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="emushaf.net" />
      </head>
      <body>
        <PreferencesProvider>
          <ThemeProvider attribute="class">{children}<ThemeColorSetter /></ThemeProvider>
        </PreferencesProvider>
      </body>
    </html>
  );
}
