<!-- 攻略 -->
<template>
    <div class="bb">
        <div class="title">
            <span>攻略</span>
            <div style="flex: 1"></div>
            <Button style="margin-left:20px" type="success" size="small" @click="add">创建攻略</Button>
        </div>

        <div class="table" style="border: 1px solid #ccc">
            <div class="tr">
                <div class="td">ID</div>
                <div class="td" style="flex: 5;">标题</div>
                <div class="td">操作</div>
            </div>

            <div class="tr" v-for="(item, i) in list" :key="i">
                <div class="td">{{ item.id }}</div>
                <div class="td" style="flex: 5;">{{ item.title }}</div>
                <div class="td" style="display: flex;align-items: center;">
                    <div class="btn" style="color: brown;" @click="editItem(item)">编辑</div>
                    <div class="btn" style="color: tomato;" @click="deleteItem(item)">删除</div>
                </div>
            </div>
        </div>
    </div>

    <!-- 新增 -->
    <Dialog width="800" v-model:show="show" :title="title" show-cancel-button @close="closeDialog"
        @confirm="confirmAdd">
        <div style="padding: 20px;">
            <br />
            <Field style="border:1px solid #e5e5e5;margin-bottom:8px;" v-model="form.title" label=""
                placeholder="请输入标题" />
            <div ref="divRef" style="height: 600px" />
        </div>
    </Dialog>
</template>

<script setup>
import api from "@/api"
import { Dialog, Field, showToast, Button, showConfirmDialog } from 'vant'
import { AiEditor } from "aieditor";
import "aieditor/dist/style.css"
import { ref } from 'vue'


const show = ref(false)
const title = ref('新增攻略')
const form = ref({
    id: '',
    title: '',
    content: ''
})
const add = () => {
    show.value = true
    form.value = {
        id: '',
        title: '',
        content: ''
    }
    title.value = '新增攻略'
    setTimeout(() => {
        contentBox.value = new AiEditor({
            element: divRef.value,
            placeholder: "请输入内容...",
            content: '',
        })
    }, 500)
}

// 编辑
const editItem = item => {
    show.value = true
    form.value = item
    title.value = '编辑攻略'
    setTimeout(() => {
        contentBox.value = new AiEditor({
            element: divRef.value,
            placeholder: "请输入内容...",
            content: form.value.content,
        })
    }, 500)
}

const confirmAdd = () => {
    form.value.content = contentBox.value.getHtml()
    console.error(form.value)
    if (form.value.id) {
        api._updateCheat(form.value).then(res => {
            showToast('修改成功')
            getList()
        })
    } else {
        api._createCheat(form.value).then(res => {
            showToast('新增成功')
            getList()
        })
    }

}
const closeDialog = () => {
    if (contentBox.value) contentBox.value.destroy()
}


// 删除
const deleteItem = item => {
    showConfirmDialog({
        title: '删除',
        message:
            '确认删除这条攻略吗？',
    })
        .then(() => {
            api._deleteCheat({ id: item.id }).then(res => {
                showToast('已删除')
                getList()
            })
        })
        .catch(() => { });
}


const divRef = ref()
const contentBox = ref()

const list = ref([])
const getList = () => {
    api._cheats().then(res => {
        list.value = res.reverse()
    })
}
getList()
</script>

<style lang="less" scoped>
.bb {
    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .table {
        border: 1px solid #eee;

        .tr {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #eee;

            .td {
                flex: 1;
                flex-shrink: 0;
                padding: 20px;

                .btn {
                    cursor: pointer;
                    margin: 0 10px;
                }
            }
        }
    }
}
</style>