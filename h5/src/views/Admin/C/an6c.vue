<!-- 新澳门六合彩 -->
<template>
    <div class="bb">
        <div class="title">新澳门六合彩</div>
        <div class="table">
            <div class="tr th">
                <div class="td">期号</div>
                <div class="td td-2">开奖时间</div>
                <div class="td td-2">中奖号码</div>
                <div class="td td-2">直播地址</div>
                <div class="td">操作</div>
            </div>
            <div class="tr" v-for="(item, i) in list" :key="i">
                <div class="td">{{ item.expect }}</div>
                <div class="td td-2">{{ item.openTime }}</div>
                <div class="td td-2">{{ item.openCode }}</div>
                <div class="td td-2">{{ getItemLive(item) || '--' }}</div>
                <div class="td">
                    <span class="btn" @click="openDialog(item)">设置直播地址</span>
                </div>
            </div>
        </div>
    </div>
    <Dialog v-model:show="show" title="直播地址" show-cancel-button @confirm="confirm">
        <div style="border:1px solid #e5e5e5;margin:20px;">
            <Field v-model="live" label="" placeholder="请输入直播地址" />
        </div>
    </Dialog>
</template>

<script setup>
import api from "@/api"
import { ref } from "vue"
import { Dialog, Field, showToast } from 'vant'

const show = ref(false)
const curr = ref({})
const live = ref('')
const lives = ref([])
const getItemLive = item => {
    const key = 'macaujc2_' + item.expect
    const target = lives.value.find(a => a.key == key)
    if (target) return target.val
    return ''
}
const getLives = () => {
    api._lives().then(res => {
        lives.value = res || []
    })
}
getLives()
const openDialog = (item) => {
    curr.value = item
    live.value = getItemLive(item)
    show.value = true
}
const confirm = () => {
    api._updateLives({
        key: 'macaujc2_' + curr.value.expect,
        value: live.value
    }).then(res => {
        showToast('设置成功')
        getLives()
    })
}

const list = ref([])
const getData = () => {
    // api._macaujc2().then(res => {
    //     console.error('---', res)
    // })
    api._macaujc2his().then(res => {
        list.value = res.data || []
    })
}
getData()
</script>

<style lang="less" scoped>
.bb {
    .title {
        margin-bottom: 20px;
    }

    .table {
        width: 100%;
        border-top: 1px solid #e5e5e5;
        border-left: 1px solid #e5e5e5;

        .tr {
            display: flex;
            align-items: stretch;
            font-size: 16px;

            .td {
                flex: 1;
                padding: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px solid #e5e5e5;
                border-right: 1px solid #e5e5e5;

                .btn {
                    cursor: pointer;
                    color: green;
                }
            }

            .td-2 {
                flex: 2;
            }
        }

        .th {
            font-weight: bold;
        }
    }
}
</style>