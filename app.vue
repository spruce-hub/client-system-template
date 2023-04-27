<template>
  <el-config-provider :locale="locale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </el-config-provider>
</template>
<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const locale = ref(zhCn)
</script>
<style lang="scss" scoped></style>
