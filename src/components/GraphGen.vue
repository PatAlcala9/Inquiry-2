<template lang="pug">


v-chart.chart.container(:option="option")
//- picture
//-   source(srcset="../assets/ocbologo.avif" type="image/avif")
//-   img.logo(src="../assets/ocbologo.webp" type="image/webp" alt="OCBO Logo")

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

const option = ref({
  // title: {
  //   text: 'Traffic Sources',
  //   left: 'center',
  // },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  // legend: {
  //   orient: 'vertical',
  //   left: 'left',
  //   data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
  // },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['10%', '80%'],
      avoidLabelOverlap: false,
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
      ],
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 2,
      },
      label: {
        fontFamily: 'Roboto',
        show: true,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
      },
      emphasis: {
        itemStyle: {
          borderColor: 'rgba(219, 179, 58, 0.5)',
          borderWidth: 9,
        },
        label: {
          fontSize: 38,
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
