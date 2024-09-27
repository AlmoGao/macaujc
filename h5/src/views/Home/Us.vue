<!-- 联系我们 -->
<template>
    <div class="page-us">
        <img class="logo" src="@/assets/macaujc.png" alt="logo">
        <Top />
        <div class="us">
            <div class="item" v-for="(item, i) in list" :key="i" @click="clickItem(item)">
                <span>{{ item.title }}</span>
                <Icon style="margin-left: 20px" name="arrow" />
            </div>
        </div>
    </div>

    <!-- 新增 -->
    <Dialog width="80%" v-model:show="show" :title="title" :show-cancel-button="false">
        <div style="padding: 20px;max-height: 70vh;overflow-y: auto;">
            <h2>{{ currItem.title }}</h2>
            <br />
            <div class="html" v-html="currItem.content"></div>
        </div>
    </Dialog>
</template>


<script setup>
import Top from "@/components/Top.vue"
import api from "@/api/index"
import store from "@/store"
import { computed, ref } from "vue"
import { Icon, Dialog } from 'vant'


const show = ref(false)
const currItem = ref()
const clickItem = item => {
    currItem.value = item
    show.value = true
}

const list = computed(() => store.state.cheats || [])
api._cheats().then(res => {
    store.commit('setCheats', (res || []).reverse())
})
</script>

<style lang="less" scoped>
.page-us {
    padding: 2rem 0;

    .logo {
        height: 8rem;
    }

    .us {
        padding: 4rem;

        .item {
            font-size: 20px;
            padding: 1.6rem 2rem 1.6rem 0;
            cursor: pointer;
            border-bottom: 1px solid #ccc;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
}

@media screen and (max-width: 600px) {
    .page-us {
        .logo {
            margin-left: 4rem;
        }
    }
}
</style>