import SplashImage from '../resources/img/seo/home-splash-screen.png';
import CSSGlobalLocalImage from '../resources/img/seo/css-global-local.png';

export default [
    {
        path: '/typescript-counter',
        exact: true,
        component: () => import('../components/typescript-counter'),
        seo: {
            title: 'TypeScript Counter',
            description: 'TypeScript Counter',
            image: CSSGlobalLocalImage,
        },
    },
];
