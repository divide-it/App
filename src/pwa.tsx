import pwaIcon192 from './resources/img/pwa-icon-192x192.png';
import pwaIcon512 from './resources/img/pwa-icon-512x512.png';
/* eslint-disable @typescript-eslint/camelcase */

export default {
    name: 'DivIt',
    short_name: 'DivIt',

    // Possible values ltr(left to right)/rtl(right to left)
    dir: 'ltr',

    // language: Default en-US
    lang: 'pt-BR',

    // Orientation of web-app possible:
    // eslint-disable-next-line max-len
    // any, natural, landscape, landscape-primary, landscape-secondary, portrait, portrait-primary, portrait-secondary
    orientation: 'portrait',
    start_url: '/',
    background_color: '#fff',
    theme_color: '#fff',
    display: 'standalone',
    description: 'Uma solução robusta para divisão de pagamentos',
    icons: [
        {
            src: '/path-to-pwa-icon-size-192x192.png',
            sizes: '192x192',
        },
        {
            src: '/path-to-pwa-icon-size-512x512.png',
            sizes: '512x512',
        },
    ],
};
