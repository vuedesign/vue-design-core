import { configCache } from './utils/requireContext';
import { getConfig } from './utils/index';

export function config(fileName) {
    return getConfig(configCache, fileName);
}

export function configs(fileNames) {
    if (!Array.isArray(fileNames)) {
        console.warn(`fileNames must be an array`);
        return;
    }
    const files = {};
    fileNames.forEach(fileName => {
        files[fileName] = config(fileName);
    });
    return files;
}
