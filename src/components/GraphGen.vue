<template lang="pug">

div
  v-chart.chart.container(:option="option")

</template>

<script setup>
import { use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide } from 'vue'

use([SVGRenderer, PieChart, TooltipComponent, LegendComponent])

provide(THEME_KEY)

// const props = defineProps(['colorful'])

const option = ref({
  // title: {
  //   text: 'Traffic Sources',
  //   left: 'center',
  // },
  // tooltip: {
  //   trigger: 'item',
  //   formatter: '{a} <br/>{b} : {c} ({d}%)',
  // },
  // legend: {
  //   orient: 'vertical',
  //   left: 'left',
  //   data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
  // },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['0%', '80%'],
      avoidLabelOverlap: false,
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads1' },
        { value: 300, name: 'Video Ads2' },
        { value: 300, name: 'Video Ads3' },
        { value: 300, name: 'Video Ads4' },
        { value: 300, name: 'Video Ads5' },
        { value: 300, name: 'Video Ads6' },
      ],
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        borderColor: 'rgba(255, 255, 255, 0.2 )',
        borderWidth: 1,
      },
      label: {
        fontFamily: 'Roboto',
        show: true,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
      },
      color: ['#1E2F3E', '#26394F', '#2A3D54', '#1F3A4B', '#2C4158'],
      emphasis: {
        itemStyle: {
          borderColor: 'rgba(219, 179, 58, 0.5)',
          borderWidth: 3,
        },
        label: {
          fontSize: 38,
          color: 'rgba(219, 179, 58, 0.9)',
        },
      },
    },
  ],
  // textStyle: {

  //   fontSize: 40,
  //   color: '#fdfdfd',
  //   textBorderColor: 'rgba(0, 0, 0, 0, 0.5)',
  // },
})
</script>

<style lang="sass" scoped>
.container
  position: relative

.chart
  height: 800px
  font-family: 'Roboto'

.logo
  position: absolute
  top: 50%
  left: 50%
</style>
