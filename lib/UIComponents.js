import UIComponents from '@vendors/UIComponents';

export default function vueDesignUIComponents(Vue, otptions = {}) {
    Vue.use(UIComponents, options);
    return UIComponents;
};
