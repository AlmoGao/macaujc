<!-- 管理后台 -->
<template>
    <div class="page-admin-manager">

        <div class="header">
            <span>欢迎您：{{ userInfo.username }}</span>
            <span class="btn" @click="loginout">退出</span>
        </div>
        <div class="content">
            <div class="left">
                <div @click="jump(item)" class="link" :class="{ 'active_link': item.route == route.name }"
                    v-for="(item, i) in links" :key="i">{{ item.name }}</div>
            </div>
            <div class="right">
                <router-view />
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed } from "vue"
import store from "@/store"
import router from "@/router";
import { useRoute } from "vue-router"
import { showConfirmDialog } from "vant"

const loginout = () => {
    showConfirmDialog({
        title: '退出',
        message:
            '是否退出登录？',
    })
        .then(() => {
            store.commit('setToken', '')
            router.replace({
                name: 'alogin'
            })
        })
        .catch(() => { });
}

const route = useRoute()
const token = computed(() => store.state.token || '')
const userInfo = computed(() => store.state.userInfo || {})

const links = ref([
    { name: '星彩', route: 'aplat' },
    { name: '新澳门六合彩', route: 'an6c' },
    // { name: '澳门六合彩', route: 'a6c' },
    // { name: '澳门六合彩3分', route: 'a6c3' },
    { name: '攻略管理', route: 'acheats' },
    { name: '密码管理', route: 'aps' },
])
const jump = item => {
    router.push({
        name: item.route
    })
}

if (!token.value) {
    router.replace({
        name: 'alogin'
    })
}
</script>

<style lang="less" scoped>
.page-admin-manager {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;

    .header {
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #ddd;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 24px;

        .btn {
            cursor: pointer;
            user-select: none;
        }
    }

    .content {
        width: 100%;
        height: calc(100% - 40px);
        display: flex;
        align-items: stretch;

        .left {
            width: 200px;
            border-right: 1px solid #ddd;
            padding: 40px 10px 40px 20px;
            user-select: none;

            .link {
                font-size: 18px;
                margin-bottom: 18px;
                cursor: pointer;


                &:hover {
                    color: #999;
                }
            }

            .active_link {
                color: deepskyblue;
                font-weight: bold;
            }
        }

        .right {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
        }
    }
}
</style>