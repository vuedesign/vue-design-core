import Vue from 'vue';
import { getConfig } from './index';

const configContext = require.context('@configs', true, /^\.\/([a-zA-Z0-9_-]*)\.(js|json)$/);
const globalContext = require.context('@globals', true, /^\.\/([a-zA-Z0-9_-]*)\/(config\.json|routes\.js|store\.js|index\.js)$/);
const moduleContext = require.context('@modules', true, /^\.\/([a-zA-Z0-9_-]*)\/(config\.json|routes\.js|store\.js|index\.js)$/);
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
const componentCache = {};

Object.keys(cache).forEach(key => {
    const cacheKey = cache[key];
    const routesJs = cacheKey['routes.js'];
    const configJson = cacheKey['config.json'];
    const storeJs = cacheKey['store.js'];
    const indexJs = cacheKey['index.js'];
    const routeConfig = (() => {
        if (!routesJs) {
            if (indexJs) {
                componentCache[key] = indexJs;
            }
            return [];
        }
        return routesJs.default;
    })();
    const isRoot = (() => {
        if (!configJson) {
            return true;
        }
        return configJson.root;
    })();
    if (isRoot) {
        rootRoutes.push(...getRouteConfigs(routeConfig));
    } else {
        childrenRoutes.push(...getRouteConfigs(routeConfig));
    }
    const storeData = (() => {
        if (!storeJs) {
            return {};
        }
        return storeJs.default;
    })();
    modules[key] = storeData;
    configs[key] = configJson;
});

const currentRoutes = rootRoutes.find(item => item.name === getGolbals('admin'));

if (currentRoutes && currentRoutes.children) {
    currentRoutes.children = childrenRoutes;
}

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
    configCache,
    componentCache
};
