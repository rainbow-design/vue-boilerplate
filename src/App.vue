<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <FormTest></FormTest>
    <TreeTest></TreeTest>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from '@/views/HelloWorld';
import FormTest from '@/views/FormTest';
import TreeTest from '@/views/TreeTest';
import Image from './assets/logo.png';

export default {
  name: 'app',
  components: {
    HelloWorld,
    FormTest,
    TreeTest,
  },
  data() {
    return {
      logo: Image,
    };
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
