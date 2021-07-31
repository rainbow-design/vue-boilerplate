<template>
  <div>
    <KForm :model="model" :rules="rules" ref="ruleForm">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="model.username"></KInput>
      </KFormItem>
      <KFormItem label="密码" prop="password">
        <KInput v-model="model.password" type="password"></KInput>
      </KFormItem>
      <button @click="submitForm('ruleForm')">去登录</button>
    </KForm>
  </div>
</template>
<script>
import KForm from './KForm.vue';
import KInput from './KInput.vue';
import KFormItem from './KFormItem.vue';
export default {
  components: {
    KForm,
    KInput,
    KFormItem,
  },
  data() {
    return {
      model: {
        username: 'tom',
        password: '123456',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
