

import Vue from "vue";
import "normalize.css";
import "./assets/styles/reset.css";

import vueDesignRouter from './router';
import vueDesignStore from './store';
import vueDesignHttp from './http';
import UIComponents from './UIComponents';

import to from './utils/to';
import { filtersCommit } from './utils';
import vendor from './vendor';

import App from '@/App';

import * as interceptors from '@/configs/interceptors';
import { rootRoutes, modules } from './utils/requireContext';


vendor(Vue);

const router = vueDesignRouter(Vue, {
    rootRoutes,
    interceptors
});

const store = vueDesignStore(Vue, {
    modules
});

const http = vueDesignHttp({
    interceptors 
});

class VueDesign extends Vue{
    constructor(options = {}) {
        console.log('run VueDesign ........');
        super({
            router,
            store,
            render: h => h(App),
            ...options
        });
    }
}

export default VueDesign;

export {
    router,
    store,
    http,
    to,
    filtersCommit,
    App,
    UIComponents
}