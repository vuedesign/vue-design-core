# vue-design-core

聚成
- vue
- vuex
- vue-router

自动加载
- { root } src/configs 文件夹中的配置文件
- { root } src/modules 业务模块
- { root } src/globals 公共模块
- { root } src/vendors 扩展：组件、指令、过滤器、mixin、插件、UI组件庫、工具
- { root } src/App.vue 组件入口

安装

```bash
npm install vue-design-core --save
```

使用

```js
import VueDesign from 'vue-design-core';

/* eslint-disable no-new */
new VueDesign().$mount('#app');
```

使用 router 中方法
```js
import { router } from 'vue-design-core';

router.push({
    name: 'xxx'
});

```

使用 store 中方法

```js
import { store } from 'vue-design-core';

store.commit('UPDATE', {});
store.dispatch('list', {});

```

自定义组件入口

```js
import VueDesign, { App } from 'vue-design-core';

/* eslint-disable no-new */
new VueDesign(
    render: h => h(App)
).$mount('#app');
```

获取 { root } src/configs 文件夹中的配置文件

- 获取单文件：config('文件名')
- 获取多文件：configs(['文件名1', '文件名2'， '文件名...'])

```js
import { config, configs } from 'vue-design-core';

const globals = config('globals.js');

const menu = config('menu.json');

const configsData = configs(['globals.js', 'menu.json']);

```