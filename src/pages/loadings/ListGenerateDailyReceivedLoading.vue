<template lang="pug">
q-page.padding.flex.flex-center.page
  div.column.items-center.text-center
    span.loading-title Generating List
    span.loading-type {{_listtype.value.toUpperCase()}}
    span.minor for
    span.loading-division {{_division.value}} Applications
    span.loading-division for the year {{_listyear.value}}

    span(v-if="percentage > 0").loading-division {{percentage}} %

    div(class="fit column items-center")
      q-btn(rounded class="button" @click="gotoHome") Cancel
</template>

<script>
export default {
  preFetch({ redirect }) {
    let _currentpage = useCurrentPage

    if (_currentpage.value === undefined) {
      redirect({ path: '/' })
    }
  },
}
</script>

<script setup>
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useListType } from 'stores/listtype'
import { useDivision } from 'stores/division'
import { useCurrentPage } from 'stores/currentpage'
import { useTableData } from 'stores/tabledata'
import { useListYear } from 'stores/listyear'
import { useListDate } from 'stores/listdate'
import { ref } from 'vue'

const router = useRouter()
let _listtype = useListType
let _division = useDivision
let _currentpage = useCurrentPage
let _tabledata = useTableData
let _listyear = useListYear
let _listdate = useListDate

let percentage = ref(0)

const controller = new AbortController()

const getDailyReceivedElectrical = async () => {
  let data = null

  if (_division.value === 'Building') {
    const response = await api.get('/api/GetDailyReceived/' + _listdate.value)
    data = response.data.length !== 0 ? response.data : null
  } else if (_division.value === 'Occupancy') {
    const response = await api.get('/api/GetDailyReceivedOccupancy/' + _listdate.value)
    data = response.data.length !== 0 ? response.data : null
  } else if (_division.value === 'Signage') {
    // const response = await api.get('/api/GetDailyReceivedElectrical/' + _listdate.value)
    data = response.data.length !== 0 ? response.data : null
  } else if (_division.value === 'Electrical') {
    const response = await api.get('/api/GetDailyReceivedElectrical/' + _listdate.value)
    data = response.data.length !== 0 ? response.data : null
  } else if (_division.value === 'Mechanical') {
    // const response = await api.get('/api/GetDailyReceivedElectrical/' + _listdate.value)
    data = response.data.length !== 0 ? response.data : null
  }

  if (data !== null) {
    _tabledata.value = data
    updatePage('receivedlist')
  }
}

const gotoHome = () => {
  controller.abort()
  // // updatePage('/')
  window.location.reload()
}

const updatePage = (page) => {
  _currentpage.value = page
  router.push(page, () => {})
}

const loadCurrentPage = () => {
  router.push(_currentpage.value, () => {})
}

;(async () => {
  loadCurrentPage()
  await getDailyReceivedElectrical()
})()
</script>

<style lang="sass" scoped>

.loading-title
  font-size: 2.3rem
  font-family: 'PoppinsBold'

.loading-type
  font-size: 1.8rem
  font-family: 'Poppins'

.minor
  padding: 2rem

.loading-division
  font-size: 2rem
  font-family: 'PoppinsBold'

.loading-value
  margin-top: 2rem
  font-size: 2.4rem
  font-family: 'PoppinsBold'
  color: yellow

@media screen and (min-width: 900px)
  .loading-title
    font-size: 3rem

  .loading-type
    font-size: 2.2rem

  .minor
    font-size: 1.8rem
    padding: 2rem

  .loading-division
    font-size: 2.8rem

  .loading-value
    margin-top: 3rem
    font-size: 3.1rem
</style>
