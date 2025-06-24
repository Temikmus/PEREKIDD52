import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const viewport = {
    themeColor: "#0f172a",
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

export const metadata = {
    title: "АвтоВыкуп - срочный выкуп авто по всей РФ",
    description: "Максимальная цена, минимум хлопот – выкупим ваше авто за 30 минут. Бесплатная оценка, выезд специалиста, любые состояния.",
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://autobuyout.vercel.app'),

    // Иконки (пути из public/)
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
            { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
            { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
        ],
        shortcut: [
            { url: '/favicon.ico' }
        ]
    },

    openGraph: {
        title: "АвтоВыкуп - срочный выкуп авто по всей РФ",
        description: "Максимальная цена, минимум хлопот – выкупим ваше авто за 30 минут.",
        url: "/",
        siteName: "АвтоВыкуп",
        images: [
            {
                url: '/og-image.jpg', // Файл в public/og-image.jpg
                width: 1200,
                height: 630,
                alt: 'АвтоВыкуп - срочный выкуп авто',
            },
        ],
        locale: "ru_RU",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "АвтоВыкуп - срочный выкуп авто по всей РФ",
        description: "Максимальная цена, минимум хлопот – выкупим ваше авто за 30 минут.",
        images: ['/og-image.jpg'], // Файл в public/og-image.jpg
    },

    manifest: "/manifest.json",
    authors: [{ name: "АвтоВыкуп", url: "/" }],
    keywords: ["выкуп авто", "срочный выкуп автомобилей", "продать авто быстро", "оценка автомобиля"],
    alternates: {
        canonical: "/",
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
        },
    },
};

export default function RootLayout({ children }) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autobuyout.vercel.app';

    return (
        <html lang="ru">
        <head>
            {/* Динамические URL-адреса */}
            <link rel="canonical" href={baseUrl} />
            <meta property="og:url" content={baseUrl} />

            {/* PWA-настройки */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="apple-mobile-web-app-title" content="АвтоВыкуп" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="application-name" content="АвтоВыкуп" />
            <meta name="msapplication-TileColor" content="#0f172a" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        </body>
        </html>
    );
}