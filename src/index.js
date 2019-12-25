

import "normalize.css";
import "./assets/styles/reset.css";
import createRouter from './core/router';
import createStore from './core/store';
import to from './core/to';
import pluginAjax, { createAjax } from './core/ajax';
import { filtersCommit } from './core/utils';
import vendor from './core/vendor';
import App from '@/App';
import UIComponents from '@vendors/UIComponents';
import * as interceptors from '@/configs/interceptors';

const ajax = createAjax({ interceptors });

class VueDesign {
    constructor(options = {}) {
        console.log('run VueDesign ........');
        this.options = options;
        this.vueOptions = {
            render: this.options.render || (h => h(App))
        };
        Object.assign(this.vueOptions, this.getOtherOptions(this.options))
        if (!this.options.Vue) {
            console.warn('not found Vue');
            return;
        } else {
            this.Vue = this.options.Vue
        }
        if (this.options.VueRouter) {
            this.addRouter(this.options.VueRouter);
        }
        if (this.options.Vuex) {
            this.addStore(this.options.Vuex);
        }
        this.Vue.config.productionTip = false; 
        this.installDefaultPlugins();
        vendor(this.Vue);
        let self = this;
        this.options.verdors && this.options.verdors(self.fnUse(self));
        this.run();
    }

    getOtherOptions(options) {
        let newOptions = {};
        Object.keys(options).forEach(key => {
            if (!['VueRouter', 'Vuex', 'Vue'].includes(key)) {
                newOptions[key] = options[key];
            } 
        });
        return newOptions;
    }

    run() {
        this.vue = new this.Vue(this.vueOptions);
    }
    $mount(arg) {
        return this.vue.$mount(arg);
    }
    installDefaultPlugins() {
        this.use(pluginAjax, {
            interceptors
        });
    }

    addRouter(Router) {
        this.router = createRouter(this.Vue, Router);
        Object.assign(this.vueOptions, {
            router: this.router
        });
        return this;
    }

    addStore(Vuex) {
        this.store = createStore(this.Vue, Vuex);
        Object.assign(this.vueOptions, {
            store: this.store
        });
        VueDesign.store = this.store;
        VueDesign.commit = this.store.commit;
        return this;
    }

    fnUse(self) {
        return (...args) => {
            self.Vue.use(...args);
            return self;
        }
    }

    use(...args) {
        this.Vue.use(...args);
        return this;
    }

}

export default VueDesign;

export {
    to,
    filtersCommit,
    ajax,
    App,
    UIComponents
}