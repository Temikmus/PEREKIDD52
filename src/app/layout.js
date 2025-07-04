import { Geist, Geist_Mono } from "next/font/google";
import YandexMetrika from '@/components/YandexMetrika';
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// Корректный экспорт viewport (Next.js 14+)
export const viewport = {
    themeColor: "#0f172a",
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

export const metadata = {
    title: "АвтоВыкуп - срочный выкуп авто по всей РФ",
    description: "Максимальная цена, минимум хлопот – выкупим ваше авто за 30 минут. Бесплатная оценка, выезд специалиста, любые состояния.",
    metadataBase: new URL('https://auto-vykup-rf.ru/'),

    // Полная настройка иконок
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

    // OpenGraph для соцсетей
    openGraph: {
        title: "АвтоВыкуп - срочный выкуп авто по всей РФ",
        description: "Максимальная цена, минимум хлопот – выкупим ваше авто за 30 минут.",
        url: "https://auto-vykup-rf.ru/",
        siteName: "АвтоВыкуп",
        images: [
            {
                url: "/social-image.jpg",
                width: 1200,
                height: 630,
                alt: 'АвтоВыкуп - срочный выкуп авто',
            },
        ],
        locale: "ru_RU",
        type: "website",
    },

    // Twitter Card
    twitter: {
        card: "summary_large_image",
        title: "АвтоВыкуп - срочный выкуп авто по всей РФ",
        description: "Максимальная цена, минимум хлопот – выкупим ваше авто за 30 минут.",
        images: ["/social-image.jpg"],
    },

    // PWA настройки
    manifest: "/manifest.json",
    authors: [{ name: "АвтоВыкуп", url: "https://auto-vykup-rf.ru/" }],

    // Дополнительные мета-теги
    keywords: ["выкуп авто", "срочный выкуп автомобилей", "продать авто быстро", "оценка автомобиля"],
    alternates: {
        canonical: "https://auto-vykup-rf.ru/",
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
    return (
        <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`}>
        <head>
            {/* Существующие теги */}
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="icon" href="/icon-192x192.png" type="image/png" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#0f172a" />
            <YandexMetrika />
        </head>
        <body>{children}</body>
        </html>
    );
}