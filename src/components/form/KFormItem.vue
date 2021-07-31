<template>
  <div class="form-item">
    <label v-if="label">{{ label }} </label>
    <slot></slot>
    <p v-if="errorMessage" class="red">{{ errorMessage }}</p>
  </div>
</template>
<script>
import Schema from 'async-validator';
import emitter from '@/mixins/emitter';
export default {
  componentName: 'FormItem',
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: '',
    },
    prop: String,
  },
  data() {
    return {
      errorMessage: '',
    };
  },
  created() {
    console.log(this.form);
  },
  mounted() {
    if (this.prop) {
      this.dispatch('Form', 'form.addField', [this]);
    }
    // 监听校验事件，并执行监听
    this.$on('validate', () => {
      this.validate();
    });
  },
  mixins: [emitter],
  methods: {
    validate() {
      // 执行组件校验
      // 1. 拿到校验规则
      const rules = this.form.rules[this.prop];

      // 2. 获取数据
      const value = this.form.model[this.prop];
      console.log('校验规则与数据', rules, value);

      //  3. 执行校验
      const desc = {
        [this.prop]: rules,
      };
      const schema = new Schema(desc);
      // 参数1是值,参数 2是错误对象数组
      // 返回的是 promise<boolean>
      return schema.validate(
        {
          [this.prop]: value,
        },
        errors => {
          if (errors) {
            // 有错误
            this.errorMessage = errors[0].message;
          } else {
            // 没有错误,清空错误信息
            this.errorMessage = '';
          }
        },
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.form-item {
  display: flex;
  justify-content: center;
}
.red {
  color: red;
}
</style>
