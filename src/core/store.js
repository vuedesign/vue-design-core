/**
 * Created by wujian on 2018/3/18.
 */
import { modules } from './requireContext';

export default function vueDesignStore(Vue, Vuex) {
    Vue.use(Vuex);
    return new Vuex.Store({
        namespace: true,
        state: {},
        mutations: {},
        getters: {},
        modules
    });
}
