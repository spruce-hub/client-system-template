<template>
  <el-image v-bind="props" preview-teleported>
    <template #placeholder>
      <img src="/img/placeholder.png" alt="雷士照明" class="s-img-placeholder" />
    </template>
    <template #error>
      <img src="/img/placeholder.png" alt="雷士照明" class="s-img-placeholder" />
    </template>
  </el-image>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    src: string
    alt?: string
    loading?: 'eager' | 'lazy'
    fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
    previewSrcList?: string[] | null
  }>(),
  {
    loading: 'lazy',
    alt: '雷士照明',
    fit: 'cover',
    previewSrcList: null,
  }
)
</script>
<style lang="scss">
.s-img-placeholder {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
