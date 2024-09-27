<!-- 号码组合 -->
<template>
    <div class="nums">
        <div class="num" :class="['num_' + i]" v-for="(num, i) in showCode" :key="num">
            <Num :num="num" />
            <div class="num_text">{{ getAniText(num) }}</div>
        </div>
    </div>
</template>

<script setup>
import Num from "./Num.vue"
import { getAniText } from "@/views/Home/numMap"
import { ref, computed } from "vue"

const props = defineProps({
    currCode: {
        type: Array,
        default: () => []
    },
    openning: {
        type: Boolean,
        default: false
    }
})

const showCodes = ref(['--', '--', '--', '--', '--', '--', '--'])
const showCode = computed(() => {
    if (props.openning) return showCodes.value
    return props.currCode
})

if (props.openning) {
    props.currCode.forEach((item, i) => {
        setTimeout(() => {
            showCodes.value[i] = item
        }, (i + 1) * 3000)
    })
}
</script>

<style lang="less" scoped>
.nums {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    .num {
        margin: 0 0.2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

    }

    .num_text {
        margin-top: 0.5rem;
        font-size: 2rem;
    }

    .num_6 {
        margin-left: 2rem;
        position: relative;

        &::after {
            content: '+';
            font-size: 4rem;
            color: #E71606;
            position: absolute;
            left: -2.2rem;
            top: 0.5rem;
        }
    }
}

@media screen and (max-width: 600px) {
    .nums {
        .num_text {
            font-size: 5rem;
        }
    }
}
</style>