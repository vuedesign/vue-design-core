import { componentCache } from './utils/requireContext';

export default function components(Vue) {
    Object.keys(componentCache).forEach(key => {
        const component = componentCache[key].default;
        Vue.component(key, component);
    });
};
