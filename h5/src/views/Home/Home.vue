<!-- 首页 -->
<template>
  <div class="page-home">
    <img class="logo" src="@/assets/macaujc.png" alt="logo">
    <Top />
    <!-- banner -->
    <Swipe class="my-swipe" :autoplay="3000" :show-indicators="false">
      <SwipeItem>
        <img src="@/assets/macaujc1.jpg" class="banner_item" alt="img">
      </SwipeItem>
      <SwipeItem>
        <img src="@/assets/macaujc2.jpg" class="banner_item" alt="img">
      </SwipeItem>
      <SwipeItem>
        <img src="@/assets/macaujc3.jpg" class="banner_item" alt="img">
      </SwipeItem>
      <SwipeItem>
        <img src="@/assets/macaujc4.jpg" class="banner_item" alt="img">
      </SwipeItem>
    </Swipe>
    <!-- main -->
    <Main />
  </div>
</template>


<script setup>
import Top from "@/components/Top.vue"
import { Swipe, SwipeItem } from 'vant';
import Main from "./Main.vue"

</script>

<style lang="less" scoped>
.page-home {
  padding: 2rem 0;

  .logo {
    height: 8rem;
  }

  .my-swipe {
    margin-top: 2rem;
    width: 100%;
    height: 30rem;

    .banner_item {
      width: 100%;
      height: 30rem;
      object-fit: cover;
    }
  }

}

@media screen and (max-width: 600px) {
  .page-home {
    .logo {
      margin-left: 4rem;
    }
  }
}
</style>