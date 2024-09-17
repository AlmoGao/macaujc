<!-- 首页 -->
<template>
  <div class="page-home">
    <img class="logo" src="@/assets/macaujc.png" alt="logo">
    <Top />
  </div>
</template>


<script setup>
import Top from "@/components/Top.vue"
</script>

<style lang="less" scoped>
.page-home {
  padding: 2rem 0;

  .logo {
    height: 8rem;
  }

}
</style>