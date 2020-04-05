import { vendorCache } from './utils/requireContext';
import { config } from './configs';
const plugins = config('plugins.js') || {};

export default function vendors(Vue) {
    Object.keys(vendorCache).forEach(key => {
        const item = vendorCache[key];
        switch(key) {
            case 'UIComponents':
                Vue.use(item['index.js'].default, plugins[key]);
                break;
            case 'components':
                setComponents(Vue, item);
                break;
            case 'directives':
                setDirectives(Vue, item);
                break;
            case 'filters': 
                setFilters(Vue, item);
                break;
            case 'mixin': 
                Vue.mixin(item['index.js'].default);
                break;
            case 'plugins': 
                setPlugins(Vue, item, plugins[key]);
                break;
        }
    });
}

function setComponents(Vue, components) {
    Object.keys(components).forEach(key => {
        const c = components[key].default;
        Vue.component(c.name, c);
    });
}

function setDirectives(Vue, cacheDirectives) {
    const directives = cacheDirectives['index.js'].default;
    Object.keys(directives).forEach(key => {
        Vue.directive(key, directives[key]);
    });
}

function setFilters(Vue, cacheFilters) {
    const filters = cacheFilters['index.js'].default;
    Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key]);
    });
}

function setPlugins(Vue, cachePlugins, options = {}) {
    Object.keys(cachePlugins).forEach(key => {
        Vue.use(cachePlugins[key].default, options);
    });
}
 