<!-- 新彩 -->
<template>
    <div class="bb">
        <div class="title">新彩</div>
        <div class="table">
            <div class="tr th">
                <div class="td">期号</div>
                <div class="td td-2">开奖时间</div>
                <div class="td td-2">中奖号码</div>
                <div class="td">操作</div>
            </div>
            <div class="tr" v-for="(item, i) in list" :key="i" :class="{ 'tr_b': new Date(item.openTime) > d }">
                <div class="td">{{ item.expect }}</div>
                <div class="td td-2">{{ item.openTime }}</div>
                <div class="td td-2">{{ item.openCode }}</div>
                <div class="td">
                    <span class="btn" @click="openDialog(item)">设置号码</span>
                </div>
            </div>
        </div>
    </div>

    <Dialog v-model:show="show" title="号码" show-cancel-button @confirm="confirm">
        <div style="border:1px solid #e5e5e5;margin:20px;">
            <Field v-model="code" label="" placeholder="请输入号码" />
        </div>
    </Dialog>
</template>

<script setup>
import api from "@/api"
import { ref } from "vue"
import { Dialog, Field, showToast } from 'vant'

const d = ref(new Date())
const arrs = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49']

const show = ref(false)
const curr = ref({})
const code = ref('')
const openDialog = (item) => {
    curr.value = item
    code.value = item.openCode
    show.value = true
}
const confirm = () => {
    // 校验
    let pass = true
    let codes = code.value.split(',')
    codes = Array.from(new Set(codes))
    if (codes.length != 7) {
        pass = false
    }
    codes.forEach(item => {
        if (!arrs.includes(item)) {
            pass = false
        }
    })
    if (!pass) {
        showToast('号码异常，请重新设置')
        return
    }
    api._updatePlat({
        expect: curr.value.expect,
        openCode: code.value
    }).then(res => {
        showToast('设置成功')
        getData()
    })
}


const list = ref([])
const getData = () => {
    api._platAll().then(res => {
        list.value = res || []
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
                word-break: break-all;

                .btn {
                    cursor: pointer;
                    color: green;
                    user-select: none;
                }
            }

            .td-2 {
                flex: 2;
            }
        }

        .tr_b {
            background-color: #e7f6f1;

            &:last-child {
                background-color: red;
            }
        }


        .th {
            font-weight: bold;
        }
    }
}
</style>