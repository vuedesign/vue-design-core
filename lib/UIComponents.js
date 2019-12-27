import UIComponents from '@vendors/UIComponents';

console.log('UIComponents', UIComponents);

export default function vueDesignUIComponents(Vue, options = {}) {
    Vue.use(UIComponents, options);
    return UIComponents;
};
