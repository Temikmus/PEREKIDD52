"use client"; // Важно: это клиентский компонент

import { useEffect } from 'react';

export default function YandexMetrika() {
    useEffect(() => {
        // Проверяем, что код выполняется только на клиенте
        if (typeof window !== 'undefined') {
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
            })
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(103105334, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true
            });
        }
    }, []);

    return (
        <noscript>
            <div>
                <img
                    src="https://mc.yandex.ru/watch/103105334"
                    style={{ position: 'absolute', left: '-9999px' }}
                    alt=""
                />
            </div>
        </noscript>
    );
}