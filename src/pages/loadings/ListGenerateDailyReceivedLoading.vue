<template lang="pug">

q-page.padding.flex.flex-center.page
  div.column.items-center.text-center
    span.loading-title Generating List
    span.loading-type {{_listtype.value.toUpperCase()}}
    span.minor for
    span.loading-division {{_division.value}} Applications
    span.minor on
    span.loading-division {{properDate}}

    span.loading-division(v-if="percentage > 0") {{percentage}} %

    div.fit.column.items-center
      q-btn.button-back(rounded @click="gotoHome") Cancel

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
import { useErrorMessage } from 'stores/errormessage'
import { useErrorSubMessage } from 'stores/errorsubmessage'
import { ref } from 'vue'
import { date } from 'quasar'

const router = useRouter()
// const quasar = useQuasar()

let _listtype = useListType
let _division = useDivision
let _currentpage = useCurrentPage
let _tabledata = useTableData
let _listyear = useListYear
let _listdate = useListDate
let _errormessage = useErrorMessage
let _errorsubmessage = useErrorSubMessage

let percentage = ref(0)
const properDate = date.formatDate(_listdate.value, 'MMMM DD, YYYY')
const formattedDate = date.formatDate(_listdate.value, 'YYYY~MM~DD')

const controller = new AbortController()

const getDailyReceived = async () => {
  let data

  if (_division.value === 'Building') {
    const response = await api.get('/api/GetDailyReceived/' + formattedDate)
    data = response.data.length !== 0 ? response.data : null
  } else if (_division.value === 'Occupancy') {
    const response = await api.get('/api/GetDailyReceivedOccupancy/' + _listdate.value)
    data = response.data.length !== 0 ? response.data : null
  } else if (_division.value === 'Signage') {
    _errormessage.value = "Error on Generating List"
    _errorsubmessage.value = "Signage Data is not found"
    updatePage('error')
  } else if (_division.value === 'Electrical') {
    const response = await api.get('/api/GetDailyReceivedElectrical/' + _listdate.value)
    data = response.data.length !== 0 ? response.data : null
  } else if (_division.value === 'Mechanical') {
    _errormessage.value = "Error on Generating List"
    _errorsubmessage.value = "Mechanical Data is not found"
    updatePage('error')
  }

  if (data.result.length > 0) {
    _tabledata.value = data
    updatePage('receivedlist')
  } else {
    _errormessage.value = "Error on Generating List"
    _errorsubmessage.value = "No Received Data found on " + properDate + " at the moment"
    updatePage('error')
  }
}

const gotoHome = () => {
  controller.abort()
  updatePage('/')
  // window.location.reload()
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
  await getDailyReceived()
})()
</script>

<style lang="sass" scoped>

.loading-title
  font-family: 'LexendBold'
  font-size: 1.8rem

.loading-type
  font-size: 1.8rem
  font-family: 'Lexend'

.minor
  padding: 1.2rem

.loading-division
  font-size: 1.8rem
  font-family: 'LexendBold'

.loading-value
  margin-top: 2rem
  font-size: 2.2rem
  font-family: 'LexendBold'
  color: $yellow

@media screen and (min-width: 900px)
  .loading-title
    font-size: 2rem

  .loading-type
    font-size: 1.8rem

  .minor
    font-size: 1.4rem

  .loading-division
    font-size: 2rem

  .loading-value
    margin-top: 3rem
    font-size: 2.6rem
</style>
