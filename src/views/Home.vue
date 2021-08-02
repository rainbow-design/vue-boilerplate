<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <router-link to="/about">前往 /about</router-link>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>
<script>
import HelloWorld from '@/components/HelloWorld';
import Image from '../assets/logo.png';
export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  data() {
    return {
      logo: Image,
    };
  },
};
</script>

<style lang="scss" scoped></style>
