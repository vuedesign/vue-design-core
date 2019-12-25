/**
 * Created by n.see on 2018/10/25.
 */
import axios from 'axios';

const createAjax = (options = {}) => {
    const { baseURL } = options;
    const interceptors = options.interceptors || {};
    const instance = axios.create({
        baseURL: baseURL || ''
    });
    instance.interceptors.request.use(config => {
        // 在 interceptors.js 关闭时间戳注入
        // export const isTimestampDisabled = false;
        if (!interceptors.isTimestampDisabled) {
            injectionTimestamp(config);
        }
        if (interceptors.ajaxRequestSuccess) {
            return interceptors.ajaxRequestSuccess(config);
        }
        return config;
    }, error => {
        if (interceptors.ajaxRequestFailure) {
            return interceptors.ajaxRequestFailure(error);
        }
        return Promise.reject(error);
    });

    instance.interceptors.response.use(response => {
        if (interceptors.ajaxResponseSuccess) {
            return interceptors.ajaxResponseSuccess(response.data);
        }
        return response.data;
    }, error => {
        if (interceptors.ajaxResponseFailure) {
            return interceptors.ajaxResponseFailure(error);
        }
        return Promise.reject(error);
    });

    return instance;
};

/**
 * 在api请求时注入时间戳
 * @param config
 */
function injectionTimestamp(config) {
    const timestamp = new Date().getTime();
    if (config.params) {
        config.params = Object.assign({}, config.params, {
            timestamp
        });
    } else {
        config.params = {
            timestamp
        };
    }
}

const install = (Vue, options = {}) => {
    Vue.prototype.$ajax = createAjax(options);
    Vue.ajax = createAjax(options);
};

export default {
    install
};

export {
    createAjax
};
