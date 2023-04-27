<template>
  <div class="c-img-transition">
    <SImg :src="src" :alt="alt" :preview-src-list="[src]" />
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  src: string
  alt?: string
}>()
</script>
<style lang="scss">
.c-img-transition {
  overflow: hidden;
  .el-image {
    width: 100%;
    height: 200px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: all 0.3s;
    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>
