<template>
    <div>
        <div ref="pieChart" style="width: 100%; height: 500px;"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    props: {
        title: ''
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
            const chartDom = this.$refs.pieChart;
            this.chart = echarts.init(chartDom);
        },
        getOption(data) {
            return {
                title: {
                    text: '',
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    formatter: (name) => {
                        const item = data.find((d) => d.name === name);
                        return `${name}: ${item.value}`; // 显示名称和对应的值
                    },
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['50%', '70%'], // 设置为圆环，内半径为 40%，外半径为 70%
                        data: data,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        },
                    },
                ],
            };
        },
        updateData(arr) {
            // const newData = [
            //     { value: 1200, name: '搜索引擎' },
            //     { value: 600, name: '直接访问' },
            //     { value: 500, name: '邮件营销' },
            //     { value: 400, name: '联盟广告' },
            //     { value: 200, name: '视频广告' },
            // ];
            this.chart.setOption(this.getOption(arr));
        },
    },
};
</script>

<style scoped>
/* 可根据需要调整样式 */
</style>