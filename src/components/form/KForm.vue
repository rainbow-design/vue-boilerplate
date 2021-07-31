<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  provide() {
    return {
      form: this, // 传递 form 实例给后代，比如 FormItem 用来校验
    };
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {
    validate(cb) {
      // TODO: 不够健壮
      // 结果是若干个 promise 数组
      const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate());
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    },
  },
};
</script>
<style lang="scss" scoped></style>
