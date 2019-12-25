import Router from 'vue-router';

export default function vueDesignRouter(Vue, options = {}) {
    const { rootRoutes, interceptors } = options;
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
}
