<template>
  <router-view />
</template>

<script setup>
import store from "./store";
import http from "@/api"
import { onMounted } from "vue"

store.dispatch('updateMacaujc2')
// store.dispatch('updateMacaujc')
store.dispatch('updatePlat')
setTimeout(() => {
  http._cheats().then(res => {
    store.commit('setCheats', (res || []).reverse())
  })
}, 2000)

// 动态调整字体大小以响应窗口大小
let timeout = null
function setRemBasedOnWindow() {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    const w = document.body.clientWidth
    if (w > 1200) {
      document.documentElement.style.fontSize = '12px';
    } else {
      document.documentElement.style.fontSize = '1vw';
    }
  }, 500)
}

// 初始化设置
onMounted(() => {
  // 设置根元素的字体大小
  const w = document.body.clientWidth
  if (w > 1200) {
    document.documentElement.style.fontSize = '12px';
  } else {
    document.documentElement.style.fontSize = '1vw';
  }
  // 当窗口大小变化时调整字体大小
  window.addEventListener('resize', setRemBasedOnWindow);
})

</script>

<style lang="less">
.html {
  min-height: 30vh;
  overflow-y: auto;

  img {
    max-width: 100% !important;
    float: none !important;
  }
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  font-size: 14px;
  background-color: #fff;
  color: #333;
  width: 100%;
  margin: 0 auto;
  max-width: 1200px;
  overflow-x: hidden;
}

div {
  box-sizing: border-box;
  transition: all ease .2s, font-size ease 0s;
}

input {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  outline: none;
}
</style>
