
import { getConfig } from './index';

const configContext = require.context('@configs', true, /^\.\/([a-zA-Z0-9_-]*)\.(js|json)$/);
const globalContext = require.context('@globals', true, /^\.\/([a-zA-Z0-9_-]*)\/(config\.json|routes\.js|store\.js)$/);
const moduleContext = require.context('@modules', true, /^\.\/([a-zA-Z0-9_-]*)\/(config\.json|routes\.js|store\.js)$/);
const vendorContext = require.context('@vendors', true, /^\.\/([a-zA-Z0-9_-]*)\/(([a-zA-Z0-9_-]*)\.js|([a-zA-Z0-9_-]*)\/([a-zA-Z0-9_-]*)\.js|([a-zA-Z0-9_-]*)\.vue)$/);

const configCache = (() => {
    const cacheData = {}; 
    configContext.keys().forEach(keyUrl => {
        const [, keyName] = keyUrl.split('/');
        cacheData[keyName] = configContext(keyUrl);
    });
    return cacheData;
})();

const getGolbals = (defaultModuleRouter) => {
    const golbalsConfig = getConfig(configCache, 'golbals.js');
    return golbalsConfig.moduelRouter || defaultModuleRouter;
}

const globalCache = getCache(globalContext);

const moduleCache = getCache(moduleContext);
const cache = Object.assign({}, globalCache, moduleCache);

const rootRoutes = [];
const childrenRoutes = [];
const modules = {};
const configs = {};

Object.keys(cache).forEach(key => {
    const routeConfig = cache[key]['routes.js'].default;
    if (cache[key]['config.json'].root) {
        rootRoutes.push(...getRouteConfigs(routeConfig));
    } else {
        childrenRoutes.push(...getRouteConfigs(routeConfig));
    }
    modules[key] = cache[key]['store.js'].default;
    configs[key] = cache[key]['config.json'];
});

const currentRoutes = rootRoutes.find(item => item.name === getGolbals('admin'));
currentRoutes.children = childrenRoutes;

const vendorCache = getCache(vendorContext);

function getCache(context) {
    let cache = {};
    context.keys().forEach(key => {
        const [, moduleName, fileName] = key.split('/');
        if (!cache[moduleName]) {
            cache[moduleName] = {
                [fileName]: context(key)
            };
        }  else {
            cache[moduleName][fileName] = context(key);
        }
    });
    return cache;
}

function getRouteConfigs(routeConfig) {
    if (Array.isArray(routeConfig)) {
        return routeConfig;
    }
    return [routeConfig];
}

export {
    rootRoutes,
    modules,
    configs,
    vendorCache,
    configCache
};
