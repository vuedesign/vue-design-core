

import Vue from "vue";
import "normalize.css";
import "../assets/styles/reset.css";

import vueDesignRouter from './router';
import vueDesignStore from './store';
import vueDesignHttp from './http';
import { config } from './configs';
import vendor from './vendor';
import App from '@/App';
import { rootRoutes, modules } from './utils/requireContext';

vendor(Vue);

const interceptors = config('interceptors.js');

const router = vueDesignRouter(Vue, {
    rootRoutes,
    interceptors
});

const store = vueDesignStore(Vue, {
    modules
});

const http = vueDesignHttp(Vue, {
    interceptors 
});

const defaultOptions = {
    router,
    store,
    render: h => h(App)
};

class VueDesign extends Vue {
    constructor(options = {}) {
        console.log('run VueDesign ........');
        super(Object.assign(defaultOptions, options));
    }
}

export {
    router,
    store,
    http,
    App
}

export default VueDesign;
