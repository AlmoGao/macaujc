<template>
    <div>
        <div ref="barChart" style="width: 100%; height: 500px;"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    props: {
        title: '',
        legend: [],
        seriesName: ''
    },
    mounted() {
        this.initChart();
    },
    beforeUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    },
    methods: {
        initChart() {
            const chartDom = this.$refs.barChart;
            this.chart = echarts.init(chartDom);
        },
        getOption(x, y) {
            return {
                title: {
                    text: '',
                },
                tooltip: {},
                legend: {
                    data: ['出现次数'],
                },
                xAxis: {
                    data: x,
                },
                yAxis: {},
                series: [
                    {
                        name: '',
                        type: 'bar',
                        data: y,
                        barWidth: 10,
                        label: {
                            show: true, // 显示标签
                            position: 'top', // 标签位置在顶部
                        },
                    },
                ],
                dataZoom: [
                    {
                        type: 'inside', // 内部滑动条
                        xAxisIndex: [0],
                        start: 0,
                        end: 30, // 初始显示范围（0%到50%）
                    },]
            };
        },
        updateData(x, y) {
            // x [a, b, c]
            // y [1, 2, 3]
            this.chart.setOption(this.getOption(x, y));
        },
    },
};
</script>

<style scoped>
/* 可根据需要调整样式 */
</style>