/** @type {import('next').NextConfig} */
const nextConfig = {
    // Фикс для статики на кастомном домене
    assetPrefix: process.env.NODE_ENV === 'production' ? 'https://www.auto-vykup-rf.ru' : undefined,

    // Опционально: принудительное сжатие статики (если проблемы с WOFF2)
    compress: false,

    // Заголовки для CORS
    async headers() {
        return [
            {
                source: "/_next/static/(.*)",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
                ],
            },
        ];
    },
};

export default nextConfig;