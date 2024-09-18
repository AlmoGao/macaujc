<!-- 挑码助手 -->
<template>
    <div class="page-picker">
        <img class="logo" src="@/assets/macaujc.png" alt="logo">
        <Top />

        <div class="content">
            <div class="item">
                <div class="item_title">挑码结果</div>
                <div class="item_content">
                    <Num class="item_c_n" :num="a" v-for="a in getNums(showAll)" :key="a" />

                </div>
                <div class="item_btns">
                    <div class="btn" @click="copy">复制</div>
                    <div class="btn" @click="clear">清空</div>
                </div>
            </div>
            <div style="width:20px;height:1px"></div>
            <div class="item">
                <div class="item_title">挑码</div>

                <div class="item_block" style="padding-top:0">
                    <div class="item_block_btn" @click="danshuang = danshuang == 1 ? '' : 1"
                        :class="{ 'active_btn': danshuang == 1 }">单</div>
                    <div class="item_block_btn" @click="danshuang = danshuang == 2 ? '' : 2"
                        :class="{ 'active_btn': danshuang == 2 }">双</div>
                    <div class="item_block_btn hidden_btn"></div>
                    <div class="item_block_btn hidden_btn"></div>
                    <div class="item_block_btn" @click="bigsmall = bigsmall == 2 ? '' : 2"
                        :class="{ 'active_btn': bigsmall == 2 }">大</div>
                    <div class="item_block_btn" @click="bigsmall = bigsmall == 1 ? '' : 1"
                        :class="{ 'active_btn': bigsmall == 1 }">小</div>
                </div>

                <div class="item_block">
                    <div class="item_block_btn" @click="filterOption.hd = filterOption.hd ? false : true"
                        :class="{ 'active_btn': filterOption.hd }">合单</div>
                    <div class="item_block_btn" @click="filterOption.dd = filterOption.dd ? false : true"
                        :class="{ 'active_btn': filterOption.dd }">大单</div>
                    <div class="item_block_btn" @click="filterOption.xd = filterOption.xd ? false : true"
                        :class="{ 'active_btn': filterOption.xd }">小单</div>
                    <div class="item_block_btn" @click="filterOption.hda = filterOption.hda ? false : true"
                        :class="{ 'active_btn': filterOption.hda }">合大</div>
                    <div class="item_block_btn" @click="filterOption.wda = filterOption.wda ? false : true"
                        :class="{ 'active_btn': filterOption.wda }">尾大</div>
                    <div class="item_block_btn hidden_btn"></div>
                    <div class="item_block_btn" @click="filterOption.hss = filterOption.hss ? false : true"
                        :class="{ 'active_btn': filterOption.hss }">合双</div>
                    <div class="item_block_btn" @click="filterOption.dass = filterOption.dass ? false : true"
                        :class="{ 'active_btn': filterOption.dass }">大双</div>
                    <div class="item_block_btn" @click="filterOption.xss = filterOption.xss ? false : true"
                        :class="{ 'active_btn': filterOption.xss }">小双</div>
                    <div class="item_block_btn" @click="filterOption.hs = filterOption.hs ? false : true"
                        :class="{ 'active_btn': filterOption.hs }">合小</div>
                    <div class="item_block_btn" @click="filterOption.ws = filterOption.ws ? false : true"
                        :class="{ 'active_btn': filterOption.ws }">尾小</div>
                    <div class="item_block_btn hidden_btn"></div>
                </div>

                <div class="item_block">
                    <div class="item_block_btn" @click="filterOption.hb = filterOption.hb ? false : true"
                        :class="{ 'active_btn': filterOption.hb }">红波</div>
                    <div class="item_block_btn" @click="filterOption.lb = filterOption.lb ? false : true"
                        :class="{ 'active_btn': filterOption.lb }">蓝波</div>
                    <div class="item_block_btn" @click="filterOption.lvb = filterOption.lvb ? false : true"
                        :class="{ 'active_btn': filterOption.lvb }">绿波</div>
                    <div class="item_block_btn hidden_btn"></div>
                    <div class="item_block_btn hidden_btn"></div>
                    <div class="item_block_btn hidden_btn"></div>
                </div>

                <div class="item_block">
                    <div class="item_block_btn" @click="filterOption.redd = filterOption.redd ? false : true"
                        :class="{ 'active_btn': filterOption.redd }">红单</div>
                    <div class="item_block_btn" @click="filterOption.reds = filterOption.reds ? false : true"
                        :class="{ 'active_btn': filterOption.reds }">红双</div>
                    <div class="item_block_btn" @click="filterOption.blued = filterOption.blued ? false : true"
                        :class="{ 'active_btn': filterOption.blued }">蓝单</div>
                    <div class="item_block_btn" @click="filterOption.blues = filterOption.blues ? false : true"
                        :class="{ 'active_btn': filterOption.blues }">蓝双</div>
                    <div class="item_block_btn" @click="filterOption.greend = filterOption.greend ? false : true"
                        :class="{ 'active_btn': filterOption.greend }">绿单</div>
                    <div class="item_block_btn" @click="filterOption.greens = filterOption.greens ? false : true"
                        :class="{ 'active_btn': filterOption.greens }">绿双</div>
                </div>

                <div class="item_block">
                    <div class="item_block_btn" @click="filterOption.shu = filterOption.shu ? false : true"
                        :class="{ 'active_btn': filterOption.shu }">鼠</div>
                    <div class="item_block_btn" @click="filterOption.zhu = filterOption.zhu ? false : true"
                        :class="{ 'active_btn': filterOption.zhu }">猪</div>
                    <div class="item_block_btn" @click="filterOption.gou = filterOption.gou ? false : true"
                        :class="{ 'active_btn': filterOption.gou }">狗</div>
                    <div class="item_block_btn" @click="filterOption.ji = filterOption.ji ? false : true"
                        :class="{ 'active_btn': filterOption.ji }">鸡</div>
                    <div class="item_block_btn" @click="filterOption.hou = filterOption.hou ? false : true"
                        :class="{ 'active_btn': filterOption.hou }">猴</div>
                    <div class="item_block_btn" @click="filterOption.niu = filterOption.niu ? false : true"
                        :class="{ 'active_btn': filterOption.niu }">牛</div>
                    <div class="item_block_btn" @click="filterOption.yang = filterOption.yang ? false : true"
                        :class="{ 'active_btn': filterOption.yang }">羊</div>
                    <div class="item_block_btn" @click="filterOption.ma = filterOption.ma ? false : true"
                        :class="{ 'active_btn': filterOption.ma }">马</div>
                    <div class="item_block_btn" @click="filterOption.she = filterOption.she ? false : true"
                        :class="{ 'active_btn': filterOption.she }">蛇</div>
                    <div class="item_block_btn" @click="filterOption.long = filterOption.long ? false : true"
                        :class="{ 'active_btn': filterOption.long }">龙</div>
                    <div class="item_block_btn" @click="filterOption.tu = filterOption.tu ? false : true"
                        :class="{ 'active_btn': filterOption.tu }">兔</div>
                    <div class="item_block_btn" @click="filterOption.hu = filterOption.hu ? false : true"
                        :class="{ 'active_btn': filterOption.hu }">虎</div>
                </div>

                <div class="item_block">
                    <div class="item_block_btn" @click="filterOption.t0 = filterOption.t0 ? false : true"
                        :class="{ 'active_btn': filterOption.t0 }">0头</div>
                    <div class="item_block_btn" @click="filterOption.t1 = filterOption.t1 ? false : true"
                        :class="{ 'active_btn': filterOption.t1 }">1头</div>
                    <div class="item_block_btn" @click="filterOption.t2 = filterOption.t2 ? false : true"
                        :class="{ 'active_btn': filterOption.t2 }">2头</div>
                    <div class="item_block_btn" @click="filterOption.t3 = filterOption.t3 ? false : true"
                        :class="{ 'active_btn': filterOption.t3 }">3头</div>
                    <div class="item_block_btn" @click="filterOption.t4 = filterOption.t4 ? false : true"
                        :class="{ 'active_btn': filterOption.t4 }">4头</div>
                    <div class="item_block_btn hidden_btn"></div>
                    <div class="item_block_btn hidden_btn"></div>
                </div>

                <div class="item_block">
                    <div class="item_block_btn" @click="filterOption.w0 = filterOption.w0 ? false : true"
                        :class="{ 'active_btn': filterOption.w0 }">0尾</div>
                    <div class="item_block_btn" @click="filterOption.w1 = filterOption.w1 ? false : true"
                        :class="{ 'active_btn': filterOption.w1 }">1尾</div>
                    <div class="item_block_btn" @click="filterOption.w2 = filterOption.w2 ? false : true"
                        :class="{ 'active_btn': filterOption.w2 }">2尾</div>
                    <div class="item_block_btn" @click="filterOption.w3 = filterOption.w3 ? false : true"
                        :class="{ 'active_btn': filterOption.w3 }">3尾</div>
                    <div class="item_block_btn" @click="filterOption.w4 = filterOption.w4 ? false : true"
                        :class="{ 'active_btn': filterOption.w4 }">4尾</div>
                    <div class="item_block_btn" @click="filterOption.w5 = filterOption.w5 ? false : true"
                        :class="{ 'active_btn': filterOption.w5 }">5尾</div>
                    <div class="item_block_btn" @click="filterOption.w6 = filterOption.w6 ? false : true"
                        :class="{ 'active_btn': filterOption.w6 }">6尾</div>
                    <div class="item_block_btn" @click="filterOption.w7 = filterOption.w7 ? false : true"
                        :class="{ 'active_btn': filterOption.w7 }">7尾</div>
                    <div class="item_block_btn" @click="filterOption.w8 = filterOption.w8 ? false : true"
                        :class="{ 'active_btn': filterOption.w8 }">8尾</div>
                    <div class="item_block_btn" @click="filterOption.w9 = filterOption.w9 ? false : true"
                        :class="{ 'active_btn': filterOption.w9 }">9尾</div>
                    <div class="item_block_btn hidden_btn"></div>
                    <div class="item_block_btn hidden_btn"></div>
                </div>

            </div>
        </div>
    </div>
</template>


<script setup>
import Top from "@/components/Top.vue"
import Num from "@/components/Num.vue"
import { ref, computed } from "vue"
import { numColorMap, numAniMap } from "./numMap"
import { copyText } from "@/tools/utils"
import { showToast } from "vant"

const fullArr = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49])

// 单双
const danshuang = ref('') // 1-单 2-双
const danshuangAll = computed(() => {
    if (!danshuang.value) return []
    if (danshuang.value == 2) return fullArr.value.filter(a => a % 2 == 0)
    if (danshuang.value == 1) return fullArr.value.filter(a => a % 2 != 0)
    return []
})

// 大小
const bigsmall = ref('') // 1-大 2-小
const bigsmallAll = computed(() => {
    if (!bigsmall.value) return []
    if (bigsmall.value == 2) return fullArr.value.filter(a => a >= 25)
    if (bigsmall.value == 1) return fullArr.value.filter(a => a < 25)
    return []
})

const filterAll = computed(() => { // 大小单双
    let arr = []
    if (danshuang.value && bigsmall.value) {
        danshuangAll.value.forEach(a => {
            const v = bigsmallAll.value.find(b => b == a)
            if (v) {
                arr.push(v)
            }
        })
    } else if (danshuang.value) {
        arr = danshuangAll.value
    } else if (bigsmall.value) {
        arr = bigsmallAll.value
    }
    return arr
})

const clear = () => {
    for (let key in filterOption.value) {
        filterOption.value[key] = false
    }
    danshuang.value = ''
    bigsmall.value = ''
}
const copy = () => {
    copyText(getNums(showAll.value))
    showToast('已复制')
}


// 筛选项
const filterOption = ref({
    hd: false,
    dd: false,
    xd: false,
    hda: false,
    wda: false,

    hss: false,
    dass: false,
    xss: false,
    hs: false,
    ws: false,

    hb: false,
    lb: false,
    lvb: false,

    redd: false,
    reds: false,
    blued: false,
    blues: false,
    greend: false,
    greens: false,

    shu: false,
    zhu: false,
    gou: false,
    ji: false,
    hou: false,
    niu: false,
    yang: false,
    ma: false,
    she: false,
    long: false,
    tu: false,
    hu: false,

    t0: false,
    t1: false,
    t2: false,
    t3: false,
    t4: false,

    w0: false,
    w1: false,
    w2: false,
    w3: false,
    w4: false,
    w5: false,
    w6: false,
    w7: false,
    w8: false,
    w9: false,
})
const showAll = computed(() => { // 结果
    let isFilter = false
    for (let key in filterOption.value) {
        if (filterOption.value[key]) {
            isFilter = true
        }
    }
    if (danshuang.value || bigsmall.value) {
        isFilter = true
    }
    if (!isFilter) return []
    const arr = (!danshuang.value && !bigsmall.value) ? fullArr.value : filterAll.value
    let rs = []
    // 合单
    if (filterOption.value.hd) {
        rs.push(...arr.filter(a => a % 2 != 0))
    }
    // 大单
    if (filterOption.value.dd) {
        rs.push(...arr.filter(a => a % 2 != 0 && a >= 25))
    }
    // 小单
    if (filterOption.value.xd) {
        rs.push(...arr.filter(a => a % 2 != 0 && a < 25))
    }
    // 合大
    if (filterOption.value.hda) {
        rs.push(...arr.filter(a => {
            let v = 0
            if (a < 10) {
                v = a
            } else {
                v = parseInt(a / 10) + (a % 10)
            }
            return v > 6
        }))
    }
    // 尾大
    if (filterOption.value.wda) {
        rs.push(...arr.filter(a => {
            return (a % 10) >= 5
        }))
    }
    // 合双
    if (filterOption.value.hss) {
        rs.push(...arr.filter(a => a % 2 == 0))
    }
    // 大双
    if (filterOption.value.dass) {
        rs.push(...arr.filter(a => a % 2 == 0 && a >= 25))
    }
    // 小双
    if (filterOption.value.xss) {
        rs.push(...arr.filter(a => a % 2 == 0 && a < 25))
    }
    // 合小
    if (filterOption.value.hs) {
        rs.push(...arr.filter(a => {
            let v = 0
            if (a < 10) {
                v = a
            } else {
                v = parseInt(a / 10) + (a % 10)
            }
            return v <= 6
        }))
    }
    // 尾小
    if (filterOption.value.ws) {
        rs.push(...arr.filter(a => {
            return (a % 10) < 5
        }))
    }
    // 红波
    if (filterOption.value.hb) {
        rs.push(...numColorMap.hb)
    }
    // 蓝波
    if (filterOption.value.lb) {
        rs.push(...numColorMap.lb)
    }
    // 绿波
    if (filterOption.value.lvb) {
        rs.push(...numColorMap.lvb)
    }
    // 红单
    if (filterOption.value.redd) {
        rs.push(...numColorMap.hb.filter(a => a % 2 != 0))
    }
    // 红双
    if (filterOption.value.reds) {
        rs.push(...numColorMap.hb.filter(a => a % 2 == 0))
    }
    // 蓝单
    if (filterOption.value.blued) {
        rs.push(...numColorMap.lb.filter(a => a % 2 != 0))
    }
    // 蓝双
    if (filterOption.value.blues) {
        rs.push(...numColorMap.lb.filter(a => a % 2 == 0))
    }
    // 绿单
    if (filterOption.value.greend) {
        rs.push(...numColorMap.lvb.filter(a => a % 2 != 0))
    }
    // 蓝双
    if (filterOption.value.greens) {
        rs.push(...numColorMap.lvb.filter(a => a % 2 == 0))
    }
    // 生肖
    if (filterOption.value.shu) { rs.push(...numAniMap.shu) }
    if (filterOption.value.zhu) { rs.push(...numAniMap.zhu) }
    if (filterOption.value.gou) { rs.push(...numAniMap.gou) }
    if (filterOption.value.ji) { rs.push(...numAniMap.ji) }
    if (filterOption.value.hou) { rs.push(...numAniMap.hou) }
    if (filterOption.value.niu) { rs.push(...numAniMap.niu) }
    if (filterOption.value.yang) { rs.push(...numAniMap.yang) }
    if (filterOption.value.ma) { rs.push(...numAniMap.ma) }
    if (filterOption.value.she) { rs.push(...numAniMap.she) }
    if (filterOption.value.long) { rs.push(...numAniMap.long) }
    if (filterOption.value.tu) { rs.push(...numAniMap.tu) }
    if (filterOption.value.hu) { rs.push(...numAniMap.hu) }

    // 头
    if (filterOption.value.t0) { rs.push(...arr.filter(a => a < 10)) }
    if (filterOption.value.t1) { rs.push(...arr.filter(a => a >= 10 && a < 20)) }
    if (filterOption.value.t2) { rs.push(...arr.filter(a => a >= 20 && a < 30)) }
    if (filterOption.value.t3) { rs.push(...arr.filter(a => a >= 30 && a < 40)) }
    if (filterOption.value.t4) { rs.push(...arr.filter(a => a >= 40 && a < 50)) }

    // 尾
    if (filterOption.value.w0) { rs.push(...arr.filter(a => a % 10 == 0)) }
    if (filterOption.value.w1) { rs.push(...arr.filter(a => a % 10 == 1)) }
    if (filterOption.value.w2) { rs.push(...arr.filter(a => a % 10 == 2)) }
    if (filterOption.value.w3) { rs.push(...arr.filter(a => a % 10 == 3)) }
    if (filterOption.value.w4) { rs.push(...arr.filter(a => a % 10 == 4)) }
    if (filterOption.value.w5) { rs.push(...arr.filter(a => a % 10 == 5)) }
    if (filterOption.value.w6) { rs.push(...arr.filter(a => a % 10 == 6)) }
    if (filterOption.value.w7) { rs.push(...arr.filter(a => a % 10 == 7)) }
    if (filterOption.value.w8) { rs.push(...arr.filter(a => a % 10 == 8)) }
    if (filterOption.value.w9) { rs.push(...arr.filter(a => a % 10 == 9)) }

    rs = Array.from(new Set(rs)).sort((a, b) => a - b)
    return rs.length ? rs : arr
})

const getNums = arr => {
    return arr.map(a => {
        if (a < 10) return '0' + a
        return a.toString()
    })
}
</script>

<style lang="less" scoped>
.page-picker {
    padding: 2rem 0;

    .logo {
        height: 8rem;
    }

    .content {
        padding: 2rem 0;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;

        .item {
            min-width: 350px;
            flex: 1;

            .item_title {
                border-left: 4px solid #1a3d96;
                padding-left: 1rem;
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 2rem;
            }

            .item_content {
                width: 100%;
                min-height: 30rem;
                border-radius: 1rem;
                border: 1px solid #aaa;
                padding: 2rem;
                display: flex;
                align-items: flex-start;
                flex-wrap: wrap;
                justify-content: flex-start;
                align-content: flex-start;

                .item_c_n {
                    margin: 0 1rem 1rem 0;
                }
            }

            .item_block {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-between;
                padding: 1rem 0 0 0;
                border-bottom: 1px solid #aaa;

                .item_block_btn {
                    padding: 0.5rem 0;
                    width: 15%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 0.5rem;
                    border: 1px solid #aaa;
                    cursor: pointer;
                    margin-bottom: 1rem;
                }

                .active_btn {
                    background-color: #1A3D96;
                    color: #fff;
                }

                .hidden_btn {
                    opacity: 0;
                }
            }

            .item_btns {
                margin-top: 2rem;
                display: flex;
                align-items: center;
                justify-content: flex-end;

                .btn {
                    padding: 1rem 2rem;
                    margin-left: 2rem;
                    border-radius: 1rem;
                    border: 1px solid #aaa;
                    cursor: pointer;
                }
            }
        }
    }

}

@media screen and (max-width: 600px) {
    .page-picker {
        .content {
            padding: 2rem
        }
    }
}
</style>