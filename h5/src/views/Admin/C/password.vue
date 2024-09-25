<!-- 密码管理 -->
<template>
    <div class="page-pass">
        <div>修改密码</div>

        <div class="form">
            <Field class="item" v-model="form.old_password" label="旧密码" type="password" placeholder="请输入旧密码" />
            <Field class="item" v-model="form.new_password" label="新密码" type="password" placeholder="请输入新密码" />
            <Field class="item" v-model="form.new_password2" label="确认密码" type="password" placeholder="请输入确认密码" />

            <Button class="btn" type="primary" :loading="loading" :disabled="!form.old_password || !form.new_password"
                @click="submit">提交</Button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { Field, Button, showToast } from "vant"
import http from '@/api/index'

const form = ref({
    username: 'admin',
    old_password: '',
    new_password: '',
    new_password2: ''
})

const loading = ref(false)
const submit = () => {
    if (form.value.new_password != form.value.new_password2) return showToast('两次密码不一致')
    loading.value = true
    http._updatePassword(form.value).then(res => {
        showToast('修改成功')
        form.value = {
            username: 'admin',
            old_password: '',
            new_password: '',
            new_password2: ''
        }
    }).finally(() => {
        loading.value = false
    })
}
</script>

<style lang="less" scoped>
.form {
    width: 800px;
    padding: 32px 20px;

    .item {
        margin-bottom: 24px
    }

    .btn {
        width: 100%;
    }
}
</style>