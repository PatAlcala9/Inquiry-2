<template lang="pug">

q-page.padding.flex.flex-center.page
  div.column.items-center.text-center
    span.loading-title Generating List
    span.loading-type {{_listtype.value.toUpperCase()}}
    span.minor for
    span.loading-division {{_division.value}} Applications
    span.loading-division for the year {{_listyear.value}}

    span.loading-division(v-if="percentage > 0") {{percentage}} %

    div.fit.column.items-center
      q-btn.button(rounded @click="gotoHome") Cancel

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
import { ref } from 'vue'

const router = useRouter()
let _listtype = useListType
let _division = useDivision
let _currentpage = useCurrentPage
let _tabledata = useTableData
let _listyear = useListYear

let percentage = ref(0)

const controller = new AbortController()

let applicationNoList = []
const getListofApplicationReleasedByYear = async () => {
  const response = await api.get('/api/GetListofApplicationReleasedByYear/' + _listyear.value, { signal: controller.signal })
  const data = response.data.length !== 0 ? response.data : null

  if (data !== null) {
    applicationNoList = data

    for (let item in data) {
      await getDataofApplicationRelease(data[item].result)

      percentage.value = Math.round((parseInt(item) / data.length) * 100)
    }

    _tabledata.value = tempTable
    updatePage('approvelist')
  }
}

let occupancyIDList = []
const getListofOccupancyApplicationReleasedByYear = async () => {
  const response = await api.get('/api/GetListofOccupancyApplicationReleasedByYear/' + _listyear.value, { signal: controller.signal })
  const data = response.data.length !== 0 ? response.data : null

  if (data !== null) {
    occupancyIDList = data

    for (let item in data) {
      await getDataofOccupancyApplicationRelease(data[item].result)

      percentage.value = Math.round((parseInt(item) / data.length) * 100)
    }

    _tabledata.value = tempTable
    updatePage('approvelist')
  }
}

let electricalIDList = []
const getListofElectricalApplicationReleasedByYear = async () => {
  const response = await api.get('/api/GetListofElectricalApplicationReleasedByYear/' + _listyear.value, { signal: controller.signal })
  const data = response.data.length !== 0 ? response.data : null

  if (data !== null) {
    electricalIDList = data

    for (let item in data) {
      await getDataofElectricalApplicationRelease(data[item].result)

      percentage.value = Math.round((parseInt(item) / data.length) * 100)
    }

    _tabledata.value = tempTable
    updatePage('approvelist')
  }
}

let tempTable = []
const getDataofApplicationRelease = async (item) => {
  const response = await api.get('/api/GetDataofApplicationRelease/' + item)
  const data = response.data.length !== 0 ? response.data : null
  // console.log('data:', data)
  if (data !== null) {
    for (let item of data) {
      // console.log('item:', item)
      tempTable.push(item)
    }
  }
}

const getDataofOccupancyApplicationRelease = async (item) => {
  const response = await api.get('/api/GetDataofOccupancyApplicationRelease/' + item)
  const data = response.data.length !== 0 ? response.data : null
  // console.log('data:', data)
  if (data !== null) {
    for (let item of data) {
      // console.log('item:', item)
      tempTable.push(item)
    }
  }
}

const getDataofElectricalApplicationRelease = async (item) => {
  const response = await api.get('/api/GetDataofElectricalApplicationRelease/' + item)
  const data = response.data.length !== 0 ? response.data : null
  // console.log('data:', data)
  if (data !== null) {
    for (let item of data) {
      // console.log('item:', item)
      tempTable.push(item)
    }
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

  if (_division.value === 'Building') {
  }

  switch (_division.value) {
    case 'Building':
      await getListofApplicationReleasedByYear()

    case 'Occupancy':
      await getListofOccupancyApplicationReleasedByYear()

    case 'Electrical':
      await getListofElectricalApplicationReleasedByYear()
  }
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
