import SplashImage from '../resources/img/seo/home-splash-screen.png';

export default [
    {
        path: '/',
        exact: true,
        component: () => import('../components/splash'),
        seo: {
            title: 'Home',
            description: 'Divit home',
            image: SplashImage,
        },
    },
];
