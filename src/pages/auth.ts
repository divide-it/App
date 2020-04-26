import LoginImage from '../resources/img/seo/login.png';

export default [
    {
        path: '/',
        exact: true,
        component: () => import('../components/login'),
        seo: {
            title: 'Auth',
            description: 'Basic Auth',
            image: LoginImage,
        },
    },
    {
        path: '/logout',
        exact: true,
        component: () => import('../components/logout'),
        seo: {
            title: 'Logging out...',
        },
    },
];
