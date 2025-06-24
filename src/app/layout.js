import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Настройка шрифтов с fallback
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: 'swap',
    fallback: ['system-ui', 'Arial']
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: 'swap',
    fallback: ['monospace']
});

export const viewport = {
    themeColor: "#0f172a",
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

const baseUrl = 'https://www.auto-vykup-rf.ru';

export const metadata = {
    title: "АвтоВыкуп - срочный выкуп авто по всей РФ",
    description: "Максимальная цена, минимум хлопот – выкупим ваше авто за 30 минут. Бесплатная оценка, выезд специалиста, любые состояния.",
    metadataBase: new URL(baseUrl),

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
                url: '/og-image.jpg',
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
        images: ['/og-image.jpg'],
    },

    manifest: "/manifest.json",
    authors: [{ name: "АвтоВыкуп", url: baseUrl }],
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
    return (
        <html lang="ru" suppressHydrationWarning>
        <head>
            {/* Preconnect и dns-prefetch */}
            <link rel="dns-prefetch" href={baseUrl} />
            <link rel="preconnect" href={baseUrl} crossOrigin="anonymous" />

            {/* Предзагрузка критических ресурсов */}
            <link rel="preload" href="/_next/static/css/app/globals.css" as="style" />
            <link rel="preload" href={`${baseUrl}/_next/static/chunks/main.js`} as="script" />

            {/* Базовые мета-теги */}
            <meta charSet="utf-8" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

            {/* Канонические URL */}
            <link rel="canonical" href={baseUrl} />
            <meta property="og:url" content={baseUrl} />

            {/* Fallback стили */}
            <style>{`
          @font-face {
            font-family: 'System Fallback';
            src: local('Arial');
            size-adjust: 105%;
          }
          .font-fallback {
            font-family: 'System Fallback', sans-serif;
          }
        `}</style>

            {/* PWA мета-теги */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="apple-mobile-web-app-title" content="АвтоВыкуп" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="application-name" content="АвтоВыкуп" />
            <meta name="msapplication-TileColor" content="#0f172a" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Fallback для отключенного JS */}
        <noscript>
            <div className="font-fallback" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                textAlign: 'center',
                zIndex: 9999
            }}>
                Для полной работы сайта включите JavaScript в настройках браузера
            </div>
        </noscript>

        {children}

        {/* Скрипт обработки ошибок */}
        <script dangerouslySetInnerHTML={{
            __html: `
            window.addEventListener('error', function(e) {
              if (e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK') {
                console.error('Failed to load resource:', e.target.src || e.target.href);
                // Можно добавить повторную попытку загрузки
              }
            }, true);
            
            // Проверка загрузки основных скриптов
            setTimeout(function() {
              if (!window.__NEXT_DATA__) {
                document.body.innerHTML += '<div style="position:fixed;bottom:0;left:0;right:0;background:red;color:white;padding:10px;text-align:center;">Ошибка загрузки приложения. Пожалуйста, перезагрузите страницу.</div>';
              }
            }, 5000);
          `
        }} />
        </body>
        </html>
    );
}