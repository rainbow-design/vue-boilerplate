<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  componentName: 'Form',
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
    return {
      fields: [],
    };
  },

  created() {
    this.$on('form.addField', field => {
      if (field) {
        this.fields.push(field);
      }
    });
  },
  methods: {
    validate(cb) {
      if (!this.model) {
        console.warn('[Form Warn]model is required for validate to work!');
        return;
      }
      // * 健壮性
      // 结果是若干个 promise 数组
      console.log('tasks', this.fields);
      const tasks = this.fields
        .filter(item => item.prop)
        .map(item => item.validate());
      // 所有任务都通过才算校验通过
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    },
  },
};
</script>
<style lang="scss" scoped></style>
