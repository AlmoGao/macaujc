<!-- 历史记录 -->
<template>
    <div class="page-history">
        <img class="logo" src="@/assets/macaujc.png" alt="logo">
        <Top />
        <!-- main -->
        <Main />
    </div>
</template>


<script setup>
import Top from "@/components/Top.vue"
import Main from "./Main.vue"

</script>

<style lang="less" scoped>
.page-history {
    padding: 2rem 0;

    .logo {
        height: 8rem;
    }
}

@media screen and (max-width: 600px) {
    .page-history {
        .logo {
            margin-left: 4rem;
        }
    }
}
</style>