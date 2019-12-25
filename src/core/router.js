import { rootRoutes } from './requireContext';
import * as interceptors from '@/configs/interceptors';

export default function vueDesignRouter(Vue, Router) {
    Vue.use(Router);
    const router = new Router({
        mode: 'history',
        routes: [
            ...rootRoutes
        ]
    });

    router.beforeEach((to, from, next) => {
        if (interceptors.routerBeforeEach) {
            interceptors.routerBeforeEach({ to, from, next });
        } else {
            next();
        }
    });

    router.beforeResolve((to, from, next) => {
        if (interceptors.routerBeforeResolve) {
            interceptors.routerBeforeResolve({ to, from, next });
        } else {
            next();
        }
    });

    router.afterEach((to, from) => {
        if (interceptors.routerAfterEach) {
            interceptors.routerAfterEach({ to, from });
        }
    });
    
    return router;
};
