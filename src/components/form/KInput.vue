<template>
  <div>
    <!-- 自定义组件要实现 v-model 需要自己实现 :value 与 :input -->
    <!-- $attrs 存储的是 非 props 的部分 -->
    <input v-bind="$attrs" :value="value" @input="onInput" />
  </div>
</template>
<script>
export default {
  inheritAttrs: false, // 避免顶层容器继承属性
  componentName: 'FormInput',
  props: {
    value: {
      type: String,
      default: '',
    },
  },

  computed: {
    parentFormItem() {
      let parent = this.$parent;
      while (parent && parent.$options.componentName !== 'FormItem') {
        parent = parent.$parent;
      }
      return parent;
    },
  },

  methods: {
    onInput(e) {
      this.$emit('input', e.target.value);
      // 通知 FormItem 校验
      //  TODO 隔代不够健壮
      this.parentFormItem.$emit('validate');
    },
  },
};
</script>
<style lang="scss" scoped></style>
