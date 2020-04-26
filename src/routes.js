import AuthRoutes from './pages/auth';
import SplashScreen from './pages/splash';
import Guest from './pages/guest';

export default class Routes {
    // eslint-disable-next-line
  apply(routeHandler) {
        const routes = [...AuthRoutes, ...SplashScreen, ...Guest];

        routeHandler.hooks.initRoutes.tapPromise('AppRoutes', async () => {
            routeHandler.addRoutes(routes);
        });
    }
}
