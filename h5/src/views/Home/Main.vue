<!-- 主要内容区域 -->
<template>
    <div class="main_content">

        <div class="tabs">
            <div class="tab" v-for="i in 4" @click="changeTab(i)" :class="{ 'active_tab': active == i }"
                v-show="nameMap[i]">{{ nameMap[i]
                }}</div>
        </div>

        <!-- 当前 -->
        <div class="box">
            <div class="title">
                <div class="name">{{ nameMap[active] }}</div>
                <div class="info">第{{ Number(currData.expect) + 1 }}期 下期截至时间：<i>{{ getOpenTime(currData.openTime) }}</i>
                </div>
            </div>

            <div class="content">
                <div class="left">
                    <div class="n">{{ nameMap[active] }} &nbsp;&nbsp;&nbsp;&nbsp; 第 <span>{{ currData.expect }}</span> 期
                    </div>
                    <Nums style="margin: 4rem 0" :currCode="currCode" />
                </div>
                <div class="right">
                    <div class="times">
                        <div class="time">{{ currTime[0] }}</div>
                        <div class="time">{{ currTime[1] }}</div>
                        <span>:</span>
                        <div class="time">{{ currTime[2] }}</div>
                        <div class="time">{{ currTime[3] }}</div>
                        <span>:</span>
                        <div class="time">{{ currTime[4] }}</div>
                        <div class="time">{{ currTime[5] }}</div>
                    </div>

                    <div class="btns">
                        <div class="btn" @click="jump('history')">开奖验证</div>
                        <div class="btn" style="background-color: #C7231F;" @click="openLive(currData)">直播</div>
                    </div>
                    <div class="link" @click="jump('history')">开奖历史查询&nbsp;&nbsp; &gt;</div>
                </div>
            </div>
        </div>


        <!-- 列表 -->
        <div class="table">
            <div class="tr th">
                <div class="td">期号</div>
                <div class="td">开奖时间</div>
                <div class="td td-3">中奖号码</div>
                <div class="td">开奖回放</div>
            </div>
            <div class="tr" v-for="(item, i) in currList" :key="i">
                <div class="td">第 <span>{{ item.expect }}</span> 期</div>
                <div class="td">{{ item.openTime }}</div>
                <div class="td td-3">
                    <Nums style="transform: scale(0.8);" :currCode="getCurrentCode(item)" />
                </div>
                <div class="td">
                    <div class="btn" @click="openLive(item)">直播</div>
                </div>
            </div>
        </div>

        <!-- 直播 -->
        <Overlay :show="showVideo" @click="showVideo = false">
            <div class="video_wrapper" @click="showVideo = false" v-if="showVideo">
                <video @click.stop controls class="video_item" :src="videoSrc"></video>
            </div>
        </Overlay>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue"
import store from "@/store";
import Nums from "@/components/Nums.vue"
import router from "@/router";
import { Overlay, showToast } from 'vant';


// 视频
const showVideo = ref(false)
const videoSrc = ref('')
const lives = computed(() => store.state.lives || [])
const openLive = item => {
    let key = ''
    switch (active.value) {
        case 1:
            key = 'macaujc2'
            break
        case 2:
            key = 'macaujc'
            break
        case 3:
            key = 'macauj3'
            break
    }
    key += '_' + item.expect
    console.error(key)
    const target = lives.value.find(a => a.key == key)
    console.error(target)
    if (target) {
        videoSrc.value = target.val
        showVideo.value = true
        return
    }
    return showToast('暂无直播')
}
store.dispatch('updateLives')


const active = ref(1)
const nameMap = ref({
    1: '新澳门六合彩',
    // 2: '澳门六合彩',
    // 3: '香港六合彩',
    4: '新彩',
})

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

const currCode = computed(() => {
    if (!currData.value.openCode) return []
    return currData.value.openCode.split(',')
})
const getCurrentCode = item => {
    if (!item.openCode) return []
    return item.openCode.split(',')
}
const currData = computed(() => {
    let obj = {}
    switch (active.value) {
        case 1:
            obj = store.state.macaujc2 || {}
            break
        case 2:
            obj = store.state.macaujc || {}
            break
        case 3:
            obj = store.state.macaujc3 || {}
            break
        case 4:
            obj = store.state.plat || {}
            break
    }
    return obj
})


const currentTime = ref(new Date())
let interval = null
onMounted(() => {
    let reqCount = 0
    interval = setInterval(() => {
        currentTime.value = new Date()
        if (currTime.value[0] == '-') {
            reqCount++
            if (reqCount >= 10) {
                getData()
                reqCount = 0
            }
        }
    }, 1000)
})
onBeforeUnmount(() => {
    interval && clearInterval(interval)
})
const currTime = computed(() => {
    if (!currData.value.openTime) return ['-', '-', '-', '-', '-', '-']
    // 目标时间
    const targetTime = new Date(currData.value.openTime);
    targetTime.setTime(targetTime.getTime() + 24 * 60 * 60 * 1000);
    // 计算时间差，单位为毫秒
    const timeDiff = targetTime - currentTime.value;
    // 如果当前时间超过目标时间，返回 ['-','-','-','-','-','-']
    if (timeDiff <= 0) {
        return ['-', '-', '-', '-', '-', '-'];
    }
    // 转换时间差为秒数
    const totalSeconds = Math.floor(timeDiff / 1000);
    // 计算小时、分钟和秒
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    // 格式化为两位数并转换为数组形式
    const hh = String(hours).padStart(2, '0').split('');
    const mm = String(minutes).padStart(2, '0').split('');
    const ss = String(seconds).padStart(2, '0').split('');
    // 返回数组形式 [h,h,m,m,s,s]
    return [...hh, ...mm, ...ss];
})
const currList = computed(() => {
    let obj = {}
    switch (active.value) {
        case 1:
            obj = store.state.macaujc2his || []
            break
        case 2:
            obj = store.state.macaujchis || []
            break
        case 3:
            obj = store.state.macaujc3his || []
            break
        case 4:
            obj = store.state.platHis || []
            break
    }
    return obj
})


const dispatchMap = {
    1: 'updateMacaujc2',
    2: 'updateMacaujc',
    3: 'updateMacaujc3',
    4: 'updatePlat'
}
const getData = () => {
    store.dispatch(dispatchMap[active.value])
}
getData()

const changeTab = i => {
    if (i == 3) return showToast('敬请期待')
    active.value = i
    getData()
}

const jump = name => {
    router.push({
        name: name
    })
}
</script>

<style lang="less" scoped>
.main_content {
    padding-top: 2rem;

    .tabs {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .tab {
            padding: 1rem 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #111;
            font-weight: bold;
            font-size: 18px;
            background-color: #DED9D9;
            margin-right: 2rem;
            cursor: pointer;
            border-radius: 2px;
        }

        .active_tab {
            background-color: #1A3D96;
            color: #eee;
        }
    }

    .box {
        box-shadow: 0 0 3px 3px #ddd;
        margin: 2rem 3px;

        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: rgb(26, 61, 150);
            font-weight: bold;
            padding: 1rem;
            border-bottom: 1px solid rgb(26, 61, 150);


            .name {
                font-size: 18px;
            }
        }

        .content {
            padding: 2rem;
            display: flex;
            align-items: flex-start;
            flex-wrap: wrap;
            justify-content: center;

            .left {
                .n {
                    span {
                        color: brown;
                    }
                }


            }

            .right {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin: 0 8rem;

                .times {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 22px;
                    font-weight: bold;

                    .time {
                        padding: 1rem;
                        border: 1px solid #ddd;
                        border-radius: 3px;
                        margin: 0 0.5rem;
                    }
                }

                .btns {
                    margin-top: 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .btn {
                        padding: 1rem 2rem;
                        margin: 0 0.5rem;
                        background-color: #E0AB28;
                        color: #fff;
                        font-weight: bold;
                        cursor: pointer;
                        border-radius: 3px;
                    }
                }

                .link {
                    margin-top: 1rem;
                    cursor: pointer;
                }
            }
        }
    }

    .table {
        border: 1px solid #ddd;

        .tr {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ddd;
            flex-wrap: wrap;

            .td {
                flex: 1;
                padding: 1rem;
                display: flex;
                align-items: center;
                justify-content: center;

                span {
                    color: brown;
                }

                .btn {
                    background-color: #BB2620;
                    padding: 0.5rem 2rem;
                    color: #fff;
                    cursor: pointer;
                    border-radius: 2px;
                }
            }

            .td-3 {
                flex: 3;
            }
        }

        .th {
            background-color: #eee;

            .td {
                font-weight: bold;
            }
        }
    }
}

@media screen and (max-width: 600px) {
    .main_content {
        padding: 2rem 1rem;

        .num_text {
            font-size: 4rem !important;
        }

        .tabs {
            .tab {
                font-size: 12px;
                margin-right: 1rem;
                padding: 2rem 3rem;
            }
        }
    }
}
</style>

<style lang="less">
.video_wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .video_item {
        width: 80vw;
        height: 40vw;
        background-color: #000;
        border-radius: 6px;
    }
}
</style>