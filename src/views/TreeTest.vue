<template>
  <div id="app">
    <ul>
      <Node class="item" :model="treeData"></Node>
    </ul>
  </div>
</template>
<script>
import { Node } from '@/components/tree';
export default {
  name: 'app',
  components: { Node },
  data() {
    return {
      treeData: {
        title: 'Web全栈架构师',
        children: [
          {
            title: 'Java架构师',
          },
          {
            title: 'JS⾼高级',
            children: [
              {
                title: 'ES6',
              },
              {
                title: '动效',
              },
            ],
          },
          {
            title: 'Web全栈',
            children: [
              {
                title: 'Vue训练营',
                expand: true,
                children: [
                  {
                    title: '组件化',
                  },
                  {
                    title: '源码',
                  },
                  {
                    title: 'docker部署',
                  },
                ],
              },
              {
                title: 'React',
                children: [
                  {
                    title: 'JSX',
                  },
                  {
                    title: '虚拟DOM',
                  },
                ],
              },
              {
                title: 'Node',
              },
            ],
          },
        ],
      },
    };
  },
};
</script>
<style lang="scss" scoped>
ul li {
  list-style: square;
}
</style>
