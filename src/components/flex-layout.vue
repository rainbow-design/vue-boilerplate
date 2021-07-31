<script>
export default {
  render(h) {
    return h(
      'div',
      {
        class: ['c-layout'],
      },
      this.$slots.default, // 子节点数组
    );
  },
};
</script>
