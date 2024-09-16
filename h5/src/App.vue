<template>
  <router-view />
</template>

<script setup>
import store from "./store";
import http from "@/api"

</script>

<style lang="less">
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
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
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
