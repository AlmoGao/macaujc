<!-- 走势 -->
<template>
    <div class="page-tend">
        <img class="logo" src="@/assets/macaujc.png" alt="logo">
        <Top />

        <div class="tabs">
            <div class="tab" v-for="i in 4" @click="changeTab(i)" :class="{ 'active_tab': active == i }"
                v-show="nameMap[i]">{{ nameMap[i]
                }}</div>
        </div>

        <!-- 切换 -->
        <div></div>

        <!-- 特碼出現次數 -->
        <div class="block">
            <div class="title">特码出现次数</div>
            <div class="chatrs_block">
                <bar ref="t1" :key="'t1'" />
            </div>
        </div>

        <!-- 特碼波色出現次數 -->
        <div class="block">
            <div class="title">特码波色出现次数</div>
            <div class="chatrs_block">
                <pie ref="t2" :key="'t2'" />
            </div>
        </div>

        <!-- 特碼尾出現次數 -->
        <div class="block">
            <div class="title">特码尾出现次数</div>
            <div class="chatrs_block">
                <bar ref="t3" :key="'t3'" />
            </div>
        </div>

        <!-- 特碼波段次數 -->
        <div class="block">
            <div class="title">特码波段次数</div>
            <div class="chatrs_block">
                <bar ref="t4" :key="'t4'" />
            </div>
        </div>

        <!-- 特肖出現次數 -->
        <div class="block">
            <div class="title">特肖出现次数</div>
            <div class="chatrs_block">
                <pie ref="t5" :key="'t5'" />
            </div>
        </div>

        <!-- 正碼數字出現次數 -->
        <div class="block">
            <div class="title">正码数字出现次数</div>
            <div class="chatrs_block">
                <bar ref="t6" :key="'t6'" />
            </div>
        </div>

        <!-- 正碼波色出現次數 -->
        <div class="block">
            <div class="title">正码波色出现次数</div>
            <div class="chatrs_block">
                <pie ref="t7" :key="'t7'" />
            </div>
        </div>

        <!-- 正碼尾出現次數 -->
        <div class="block">
            <div class="title">正码尾出现次数</div>
            <div class="chatrs_block">
                <bar ref="t8" :key="'t8'" />
            </div>
        </div>

        <!-- 正碼波段次數 -->
        <div class="block">
            <div class="title">正码波段次数</div>
            <div class="chatrs_block">
                <bar ref="t9" :key="'t9'" />
            </div>
        </div>

        <!-- 正碼生肖出現次數 -->
        <div class="block">
            <div class="title">正码生肖出现次数</div>
            <div class="chatrs_block">
                <pie ref="t10" :key="'t10'" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Top from "@/components/Top.vue"
import bar from "./tu/bar.vue"
import pie from "./tu/pie.vue"
import { ref, computed, onMounted } from "vue"
import store from "@/store"
import { numColorMap, numAniMap, getAniText } from "./numMap"
import { showToast } from "vant"

const active = ref(1)
const nameMap = ref({
    1: '新澳门六合彩',
    // 2: '澳门六合彩',
    // 3: '香港六合彩',
    4: '星彩',
})
const changeTab = i => {
    if (i == 3) return showToast('敬请期待')
    active.value = i
    setTimeout(() => {
        setDatas()
    }, 0)
}

const macaujc2his = computed(() => store.state.macaujc2his || [])
const macaujchis = computed(() => store.state.macaujchis || [])
const platHis = computed(() => store.state.platHis || [])
const datas = computed(() => {
    let d = []
    switch (active.value) {
        case 1:
            d = macaujc2his.value
            break
        case 2:
            d = macaujchis.value
            break
        case 4:
            d = platHis.value
            break
    }
    return d.slice(0, 100)
})

const t1 = ref()
const t2 = ref()
const t3 = ref()
const t4 = ref()
const t5 = ref()
const t6 = ref()
const t7 = ref()
const t8 = ref()
const t9 = ref()
const t10 = ref()

const setDatas = () => {
    const tes = [] // 特码
    const zes = [] // 正码
    const dd = datas.value.map(item => {
        item.codes = item.openCode.split(',')
        if (item.codes && item.codes[0]) {
            tes.push(item.codes[6])
            zes.push(item.codes[0], item.codes[1], item.codes[2], item.codes[3], item.codes[4], item.codes[5])
        }
        return item
    })
    // 特码出现次数
    const obj1 = {}
    tes.forEach(v => {
        if (obj1[v]) {
            obj1[v] += 1
        } else {
            obj1[v] = 1
        }
    })
    // 将对象转换为数组并按值排序
    const sortedEntries1 = Object.entries(obj1).sort(([, valueA], [, valueB]) => valueB - valueA);
    // 生成按值排序的数组和对应的键数组
    const values1 = sortedEntries1.map(([, value]) => value);
    const keys1 = sortedEntries1.map(([key]) => key);
    t1.value.updateData(keys1, values1)

    // 特碼波色出現次數
    const obj21 = { value: 0, name: '绿波' }
    const obj22 = { value: 0, name: '蓝波' }
    const obj23 = { value: 0, name: '红波' }
    tes.forEach(n => {
        if (numColorMap.hb.includes(Number(n))) {
            obj23.value += 1
        }
        if (numColorMap.lb.includes(Number(n))) {
            obj22.value += 1
        }
        if (numColorMap.lvb.includes(Number(n))) {
            obj21.value += 1
        }
    })
    const arr2 = [obj21, obj22, obj23].sort((a, b) => b.value - a.value)
    t2.value.updateData(arr2)

    // 特码尾出现次数
    const obj3 = {}
    tes.forEach(n => {
        const v = n % 10
        if (obj3[v]) {
            obj3[v] += 1
        } else {
            obj3[v] = 1
        }
    })
    // 将对象转换为数组并按值排序
    const sortedEntries3 = Object.entries(obj3).sort(([, valueA], [, valueB]) => valueB - valueA);
    // 生成按值排序的数组和对应的键数组
    const values3 = sortedEntries3.map(([, value]) => value);
    const keys3 = sortedEntries3.map(([key]) => key);
    t3.value.updateData(keys3, values3)

    // 特码波段次数
    const obj4 = {
        '1-10': 0,
        '11-20': 0,
        '21-30': 0,
        '31-40': 0,
        '41-49': 0
    }
    tes.forEach(n => {
        const v = Number(n)
        if (v <= 10) {
            obj4['1-10'] += 1
        } else if (v <= 20) {
            obj4['11-20'] += 1
        } else if (v <= 30) {
            obj4['21-30'] += 1
        } else if (v <= 40) {
            obj4['31-40'] += 1
        } else {
            obj4['41-49'] += 1
        }
    })
    // 将对象转换为数组并按值排序
    const sortedEntries4 = Object.entries(obj4).sort(([, valueA], [, valueB]) => valueB - valueA);
    // 生成按值排序的数组和对应的键数组
    const values4 = sortedEntries4.map(([, value]) => value);
    const keys4 = sortedEntries4.map(([key]) => key);
    t4.value.updateData(keys4, values4)

    // 特肖出现次数
    const arr5 = []
    for (let key = 1; key <= 12; key++) {
        arr5.push({
            value: 0,
            name: getAniText(key),
        })
    }
    tes.forEach(n => {
        const name = getAniText(Number(n))
        const target = arr5.find(a => a.name == name)
        target.value++
    })
    t5.value.updateData(arr5.sort((a, b) => b.value - a.value))


    // 正码数字出现次数
    const obj6 = {}
    zes.forEach(v => {
        if (obj6[v]) {
            obj6[v] += 1
        } else {
            obj6[v] = 1
        }
    })
    // 将对象转换为数组并按值排序
    const sortedEntries6 = Object.entries(obj6).sort(([, valueA], [, valueB]) => valueB - valueA);
    // 生成按值排序的数组和对应的键数组
    const values6 = sortedEntries6.map(([, value]) => value);
    const keys6 = sortedEntries6.map(([key]) => key);
    t6.value.updateData(keys6, values6)



    // 正码波色出现次数
    const obj71 = { value: 0, name: '绿波' }
    const obj72 = { value: 0, name: '蓝波' }
    const obj73 = { value: 0, name: '红波' }
    zes.forEach(n => {
        if (numColorMap.hb.includes(Number(n))) {
            obj73.value += 1
        }
        if (numColorMap.lb.includes(Number(n))) {
            obj72.value += 1
        }
        if (numColorMap.lvb.includes(Number(n))) {
            obj71.value += 1
        }
    })
    const arr7 = [obj71, obj72, obj73].sort((a, b) => b.value - a.value)
    t7.value.updateData(arr7)



    // 正码尾出现次数
    const obj8 = {}
    zes.forEach(n => {
        const v = n % 10
        if (obj8[v]) {
            obj8[v] += 1
        } else {
            obj8[v] = 1
        }
    })
    // 将对象转换为数组并按值排序
    const sortedEntries8 = Object.entries(obj8).sort(([, valueA], [, valueB]) => valueB - valueA);
    // 生成按值排序的数组和对应的键数组
    const values8 = sortedEntries8.map(([, value]) => value);
    const keys8 = sortedEntries8.map(([key]) => key);
    t8.value.updateData(keys8, values8)


    // 正码波段次数
    const obj9 = {
        '1-10': 0,
        '11-20': 0,
        '21-30': 0,
        '31-40': 0,
        '41-49': 0
    }
    zes.forEach(n => {
        const v = Number(n)
        if (v <= 10) {
            obj9['1-10'] += 1
        } else if (v <= 20) {
            obj9['11-20'] += 1
        } else if (v <= 30) {
            obj9['21-30'] += 1
        } else if (v <= 40) {
            obj9['31-40'] += 1
        } else {
            obj9['41-49'] += 1
        }
    })
    // 将对象转换为数组并按值排序
    const sortedEntries9 = Object.entries(obj9).sort(([, valueA], [, valueB]) => valueB - valueA);
    // 生成按值排序的数组和对应的键数组
    const values9 = sortedEntries9.map(([, value]) => value);
    const keys9 = sortedEntries9.map(([key]) => key);
    t9.value.updateData(keys9, values9)



    // 正码生肖出现次数
    const arr10 = []
    for (let key = 1; key <= 12; key++) {
        arr10.push({
            value: 0,
            name: getAniText(key),
        })
    }
    zes.forEach(n => {
        const name = getAniText(Number(n))
        const target = arr10.find(a => a.name == name)
        target.value++
    })
    t10.value.updateData(arr10.sort((a, b) => b.value - a.value))
}

onMounted(() => {
    setTimeout(() => {
        changeTab(1)
    }, 300)
})
</script>

<style lang="less" scoped>
.page-tend {
    padding: 2rem 0;

    .logo {
        height: 8rem;
    }


    .tabs {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-top: 20px;

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

    .block {
        .title {
            color: #000;
            font-size: 20px;
            font-weight: bold;
            padding: 10px 0 6px 0;
        }

        border-bottom: 10px solid #ECECEC
    }
}

@media screen and (max-width: 600px) {
    .page-tend {
        padding: 2rem;

        .logo {
            margin-left: 2rem;
        }
    }
}
</style>