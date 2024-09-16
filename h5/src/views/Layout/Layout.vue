<!-- 页面容器 -->
<template>
    <div class="page-layout">
        <router-view />
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const bottomRoute = ['home', 'markets', 'assets', 'my']
const showBottom = computed(() => {
    return bottomRoute.includes(route.name)
})
</script>

<style lang="less">
.page-layout {
    height: 100%;
    overflow-y: auto;
}
</style>