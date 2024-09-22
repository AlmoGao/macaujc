<!-- 澳门六合彩 -->
<template>
    <div class="bb">
        <div class="title" style="display: flex;align-items: center;justify-content: space-between;">
            <span>澳门六合彩</span>
            <Button type="danger" size="small" @click="openG">手动开奖</Button>
        </div>
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

    <!-- 手动开奖 -->
    <Dialog width="600" v-model:show="showG" title="手动开奖" show-cancel-button @confirm="confirmG">
        <div style="padding: 20px;">
            <div style="color:brown">开奖后1分钟会同步开奖数据，手动开奖请确认开奖期号</div>
            <br />
            <div>即将开奖的期号和时间：</div>
            <br />
            <div style="font-size: 18px;"><b>{{ currG.expect * 1 + 1 }}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>{{
                getOpenTime(currG.openTime) }}</b>
            </div>
            <br />
            <Field style="border:1px solid #e5e5e5;" v-model="openN" label=""
                placeholder="请输入开奖号码 如：01,02,03,04,05,06,07" />
        </div>
    </Dialog>
</template>

<script setup>
import api from "@/api"
import { ref } from "vue"
import { Dialog, Field, showToast, Button } from 'vant'

const show = ref(false)
const curr = ref({})
const live = ref('')
const lives = ref([])
const getItemLive = item => {
    const key = 'macaujc_' + item.expect
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
        key: 'macaujc_' + curr.value.expect,
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
    api._macaujchis().then(res => {
        list.value = res.data || []
    })
}
getData()



// 开奖
const showG = ref(false)
const currG = ref({})
const openN = ref('')
const openG = () => {
    showG.value = true
    api._macaujc2().then(res => {
        console.error(res)
        if (res && res[0]) {
            currG.value = res[0]
        }
    })
}
const arrs = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49']
const confirmG = () => {
    // 校验
    let pass = true
    let codes = openN.value.split(',')
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
    api._updateMacaujcCode({ code: openN.value }).then(res => {
        if (res.error) {
            showToast('开奖失败')
        } else {
            showToast('开奖成功')
        }
    })
}
const getOpenTime = t => {
    let date = new Date(t);
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
    // 获取各个时间部分
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以加1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // 返回格式化后的日期字符串
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

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

        .th {
            font-weight: bold;
        }
    }
}
</style>