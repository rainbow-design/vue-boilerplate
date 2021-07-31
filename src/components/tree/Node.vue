<template>
  <li>
    <div @click="toggle">
      {{ model.title }}
      <span v-if="isFolder">[{{ open ? '-' : '+' }}]</span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <Node
        class="item"
        v-for="model in model.children"
        :model="model"
        :key="model.title"
      ></Node>
    </ul>
  </li>
</template>
<script>
export default {
  name: 'Node',
  props: {
    model: Object,
  },
  data: function() {
    return {
      open: false,
    };
  },
  computed: {
    isFolder: function() {
      return this.model.children && this.model.children.length;
    },
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    },
  },
};
</script>
