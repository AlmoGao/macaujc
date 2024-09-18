<!-- 数字 -->
<template>
    <div class="num" :style="{ backgroundImage: `url(${numMap[props.num]})` }">
        {{ props.num }}
    </div>
</template>

<script setup>
import { ref } from "vue"
import ball_r from "@/assets/ball_r.png"
import ball_g from "@/assets/ball_g.png"
import ball_b from "@/assets/ball_b.png"

const props = defineProps({
    num: {
        type: String,
        default: '01'
    }
})

const numMap = ref({
    '01': ball_r,
    '02': ball_r,
    '03': ball_b,
    '04': ball_b,
    '05': ball_g,
    '06': ball_g,
    '07': ball_r,
    '08': ball_r,
    '09': ball_b,
    '10': ball_b,
    '11': ball_g,
    '12': ball_r,
    '13': ball_r,
    '14': ball_b,
    '15': ball_b,
    '16': ball_g,
    '17': ball_g,
    '18': ball_r,
    '19': ball_r,
    '20': ball_b,
    '21': ball_g,
    '22': ball_g,
    '23': ball_r,
    '24': ball_r,
    '25': ball_b,
    '26': ball_b,
    '27': ball_g,
    '28': ball_g,
    '29': ball_r,
    '30': ball_r,
    '31': ball_b,
    '32': ball_g,
    '33': ball_g,
    '34': ball_r,
    '35': ball_r,
    '36': ball_b,
    '37': ball_b,
    '38': ball_g,
    '39': ball_g,
    '40': ball_r,
    '41': ball_b,
    '42': ball_b,
    '43': ball_g,
    '44': ball_g,
    '45': ball_r,
    '46': ball_r,
    '47': ball_b,
    '48': ball_b,
    '49': ball_g,
})
</script>

<style lang="less" scoped>
.num {
    background-size: 100% 100%;
    width: 5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #111;
    font-weight: bold;
    font-size: 2.6rem;
}

@media screen and (max-width: 600px) {
    .num {
        width: 8rem;
        height: 8rem;
        font-size: 4rem;
    }
}
</style>