import Vue from 'vue';

function create(ComponentName, options) {
  // 创建组件实例
  const vm = new Vue({
    render(h) {
      return h(ComponentName, { ...options });
    },
  }).$mount();

  // 获取组件实例
  const comp = vm.$children[0];
  // 追加至 body
  document.body.appendChild(vm.$el);

  // 清理函数
  comp.remove = () => {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  };

  // 返回组件实例
  return comp;
}

export { create };
