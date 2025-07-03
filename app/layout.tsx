import type { Metadata } from "next";
import { Zen_Kurenaido } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: '2025-立命祭 | 2025 Ritsumeisai',
    template: '%s | 2025立命祭',
  },
};

  {/*
  description:
    'K-Tech is a student-driven creative tech club exploring 3DCG, web development, AI, and media art. Join us to turn your passion into real-world innovation.',
  keywords: [
    'K-Tech',
    'Ritsumei',
    'Creative Technology',
    'Student Tech Club',
    '3DCG',
    'Web Development',
    'Machine Learning',
    'AI',
    'Media Art',
    'Data Science',
    'App Development',
    'Innovation',
    '立命館慶祥高等学校',
  ],
  metadataBase: new URL('https://www.keisho.tech/'),
  openGraph: {
    title: 'K-Tech | RitsumeikanKeisho K-Tech',
    description:
      'Explore cutting-edge creativity with K-Tech — where students turn ideas into impact through technology.',
    url: 'https://www.keisho.tech/',
    siteName: 'K-Tech',
    images: [
      {
        url: 'logo.png',
        width: 630,
        height: 630,
        alt: 'K-Tech Official Visual',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1
      }
  },
  alternates: {
    canonical: 'https://www.keisho.tech/',
    languages: {
      'ja-JP': 'https://www.keisho.tech/',
    },
  },
  */}

const zenKurenaido = Zen_Kurenaido({
  weight: "400",
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="K-Tech" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body
        className={`${zenKurenaido.className} antialiased bg-[var(--eeire_black)] text-[var(--ghost_white)]`}
      >
        {children}
      </body>
    </html>
  );
}
