<template>
  <div>
    <KForm :model="model" :rules="rules" ref="ruleForm">
      <FlexLayout>
        <KFormItem label="用户名" prop="username">
          <div>
            <KInput v-model="model.username"></KInput>
          </div>
        </KFormItem>
      </FlexLayout>
      <div>
        <KFormItem label="密码" prop="password">
          <div>
            <KInput v-model="model.password" type="password"></KInput>
          </div>
        </KFormItem>
      </div>
      <KFormItem>
        <button @click="submitForm('ruleForm')">去登录</button>
      </KFormItem>
    </KForm>
  </div>
</template>
<script>
import KForm from './form/KForm.vue';
import KInput from './form/KInput.vue';
import KFormItem from './form/KFormItem.vue';
import FlexLayout from './flex-layout.vue';
export default {
  components: {
    KForm,
    KInput,
    KFormItem,
    FlexLayout,
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
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度在6个字符', trigger: 'blur' },
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
