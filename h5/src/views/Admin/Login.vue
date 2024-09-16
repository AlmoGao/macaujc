<!-- 登录 -->
<template>
    <div class="page-admin-login">

        <div class="form">
            <div class="title">管理后台</div>
            <Field class="item" v-model="form.username" label="用户名" placeholder="请输入用户名" />
            <Field class="item" v-model="form.password" type="password" label="密码" placeholder="请输入密码" />
            <Field class="item" v-model="form.captcha" label="验证码" placeholder="请输入验证码">
                <template #button>
                    <img @click="getCode" v-if="captchaUrl" class="code" :src="captchaUrl" alt="code">
                </template>
            </Field>
            <Button @click="login" :loading="loading" class="item" type="primary">登录</Button>
        </div>

    </div>
</template>


<script setup>
import { Field, Button } from 'vant';
import { ref } from "vue"
import api from "@/api/index"
import store from "@/store"
import router from '@/router';


const loading = ref(false)
const captchaUrl = ref('')
const form = ref({
    username: '',
    password: '',
    captcha: '',
    captcha_id: '',
})

//  验证码
const getCode = () => {
    if (loading.value) return
    loading.value = true
    api._captcha().then(res => {
        form.value.captcha_id = res.captcha_id || ''
        if (res.captcha_image) {
            captchaUrl.value = `data:image/png;base64,${res.captcha_image}`
        }
    }).finally(() => {
        loading.value = false
    })
}
getCode()


// 登录
const login = () => {
    if (!form.value.username || !form.value.password || !form.value.captcha || !form.value.captcha_id) return
    if (loading.value) return
    loading.value = true
    api._login(form.value).then(res => {
        if (res && res.access_token) {
            store.commit('setToken', res.access_token)
            store.commit('setUserInfo', {
                username: form.value.username
            })
            setTimeout(() => {
                router.push({
                    name: 'amanager'
                })
            })
        }
    }).finally(() => {
        loading.value = false
        getCode()
    })
}
</script>

<style lang="less" scoped>
.page-admin-login {
    .form {
        padding: 20px;
        border-radius: 16px;
        border: 1px solid #e5e5e5;
        background-color: #f5f5f5;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);

        .title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .item {
            margin-bottom: 20px;
            width: 100%;
        }

        .code {
            height: 100%;
            width: auto;
            cursor: pointer;
        }
    }
}
</style>