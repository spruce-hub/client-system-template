<template>
  <div id="__layout">
    <BaseHeader :top="top" :is-show="isShow" />
    <slot></slot>
    <BaseFooter />
  </div>
</template>
<script lang="ts" setup>
// 判断轮播图的高度，默认100vh，如果不是则页面inject('offsetTop')，参考seriesSelect.vue
const top = ref(0)
provide('offsetTop', top)
// 判断BaseHeader是否是粘性定位，如果不是则页面inject('isSticky')，参考seriesDetail.vue
const isShow = ref(false)
provide('isSticky', isShow)
</script>
<style lang="scss" scoped></style>
