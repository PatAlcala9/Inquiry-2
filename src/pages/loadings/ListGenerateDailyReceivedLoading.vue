<template lang="pug">

q-page.padding.flex.flex-center.page
  div.column.items-center.text-center
    span.loading-title Generating List
    span.loading-type {{_listtype.value.toUpperCase()}}
    span.minor for
    span.loading-division {{_division.getValue}} Applications
    span.minor on
    span.loading-division {{properDate}}

    span.loading-division(v-if="percentage > 0") {{percentage}} %

    div.fit.column.items-center
      q-btn.button-back(rounded @click="gotoHome") Cancel

</template>

<script>
export default {
  preFetch({ redirect }) {
    const _currentpage = useCurrentPage()

    if (_currentpage.isNull) {
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
import { useListStatus } from 'stores/liststatus'
import { useListSumPaid } from 'stores/listsumpaid'
import { ref } from 'vue'
import { date } from 'quasar'
import { encrypt, decrypt } from 'assets/js/shield'

const router = useRouter()
// const quasar = useQuasar()

let _listtype = useListType
let _division = useDivision()
const _currentpage = useCurrentPage()
let _tabledata = useTableData
let _listyear = useListYear
let _listdate = useListDate
let _errormessage = useErrorMessage()
let _liststatus = useListStatus()
let _listsumpaid = useListSumPaid()

let statusList = []

let percentage = ref(0)
const properDate = date.formatDate(_listdate.value, 'MMMM DD, YYYY')
const formattedDate = date.formatDate(_listdate.value, 'YYYY~MM~DD')

const controller = new AbortController()

const getDailyReceived = async () => {
  let data

  const encryptedEndpoint = encrypt('CheckConnection')
  const replacedEndpoint = encryptedEndpoint.replaceAll('/', '~')
  const connection = await api.get('/api/' + replacedEndpoint, { signal: controller.signal })
  const conn = connection.data || null
  const result = conn !== null ? decrypt(conn.result) : null

  if (result !== null) {
    let encryptedEndpoint
    if (_division.isBuilding) {
      encryptedEndpoint = encrypt('GetDailyReceived')
    } else if (_division.isOccupancy) {
      encryptedEndpoint = encrypt('GetDailyReceivedOccupancy')
    } else if (_division.isSignage) {
      _errormessage.updateMessage('Error on Generating List')
      _errormessage.updateSubMessage('Signage Data is not found')
      updatePage('error')
      return
    } else if (_division.isElectrical) {
      encryptedEndpoint = encrypt('GetDailyReceivedElectrical')
    } else if (_division.isMechanical) {
      _errormessage.updateMessage('Error on Generating List')
      _errormessage.updateSubMessage('Mechanical Data is not found')
      updatePage('error')
      return
    } else {
      encryptedEndpoint = null
    }

    const replacedEndpoint = encryptedEndpoint.replaceAll('/', '~')
    const encryptedData = encrypt(formattedDate)
    const replacedData = encryptedData.replaceAll('/', '~')
    const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
    data = response.data.length !== 0 ? response.data : null

    if (data.result.length > 0) {
      _tabledata.value = data
      const tempApp = data.result
      _liststatus.$patch({ value: [] })
      _listsumpaid.$patch({ value: [] })

      for (let i = 0; i < tempApp.length; i++) {
        const application = tempApp[i]
        const decApp = decrypt(application)

        const stat = await getLatestStatus(decApp)
        _liststatus.addStatus(stat)
        const sum = await getSumPaid(decApp)
        _listsumpaid.addSum(sum)
      }

      updatePage('receivedlist')
    } else {
      const today = new Date()
      const searcheddate = new Date(properDate)
      const dayOfWeek = searcheddate.getDay()
      const dayOfYearToday = date.formatDate(today, 'DDD')
      const dayOfYearSearched = date.formatDate(searcheddate, 'DDD')

      _errormessage.updateMessage('Error on Generating List')

      if (dayOfWeek === 6) {
        _errormessage.updateSubMessage(properDate + ' is Saturday, OCBO is closed on weekends')
      } else if (dayOfWeek === 7) {
        _errormessage.updateSubMessage(properDate + ' is Sundate, OCBO is closed on weekends')
      } else if (dayOfYearToday === dayOfYearSearched) {
        _errormessage.updateSubMessage('No current received data found at this moment')
      } else if (dayOfYearToday < dayOfYearSearched) {
        _errormessage.updateSubMessage('Cannot generate data from the future')
      } else {
        _errormessage.updateSubMessage('Error')
      }
      updatePage('error')
    }
  } else {
    updatePage('noconnection')
  }
}

const getLatestStatus = async (application) => {
  let encryptedEndpoint
  if (_division.isBuilding) {
    encryptedEndpoint = encrypt('GetLatestStatusBuilding')
  } else if (_division.isOccupancy) {
    encryptedEndpoint = encrypt('GetLatestStatusOccupancy')
  } else if (_division.isElectrical) {
    encryptedEndpoint = encrypt('GetLatestStatusElectrical')
  } else {
    encryptedEndpoint = null
  }

  const replacedEndpoint = encryptedEndpoint.replaceAll('/', '~')
  const encryptedData = encrypt(application)
  const replacedData = encryptedData.replaceAll('/', '~')
  const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
  const data = response.data.length !== 0 ? response.data : null

  return decrypt(data.result)
}

const getSumPaid = async (application) => {
  let encryptedEndpoint
  if (_division.isBuilding) {
    encryptedEndpoint = encrypt('GetSumPaid')
  } else if (_division.isOccupancy) {
    encryptedEndpoint = encrypt('GetSumPaidOccupancy')
  } else if (_division.isElectrical) {
    encryptedEndpoint = encrypt('GetSumPaidElectrical')
  } else {
    encryptedEndpoint = null
  }

  const replacedEndpoint = encryptedEndpoint.replaceAll('/', '~')
  const encryptedData = encrypt(application)
  const replacedData = encryptedData.replaceAll('/', '~')
  const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
  const data = response.data.length !== 0 ? response.data : null
  const result = decrypt(data.result)

  return result !== '' ? result : 0
}

const countOPReleased = async () => {
  let filterArray
  if (_division.isBuilding) {
    filterArray = ['ORDER OF PAYMENT RELEASED', 'OR NUMBER VERIFIED', 'RECEIVED FOR PROCESSING', 'FOR BUILDING OFFICIAL APPROVAL', 'PERMIT APPROVE AND READY FOR RELEASE', 'PERMIT ALREADY RELEASE']
  } else if (_division.isOccupancy) {
    filterArray = [
      'ORDER OF PAYMENT RELEASE FOR BUREAU OF FIRE',
      'OCCUPANCY ORDER OF PAYMENT PAID',
      'OCCUPANCY OFFICIAL RECEIPT VALIDATED',
      'FOR OCCUPANCY PERMIT RECOMMENDING APPROVAL',
      'FOR OCUPANCY CERTIFICATE OF ELECTRICAL INSPECTION GENERATION',
      'FOR OCCUPANCY PERMIT GENERATION',
      'FOR OCCUPANCY RELEASING',
      'OCCUPANCY PERMIT RELEASED TO',
    ]
  } else if (_division.isElectrical) {
    filterArray = [
      'ELECTRICAL ORDERPAYMENT RELEASED',
      'FOR ELECTRICAL OFFICIAL RECEIPT VALIDATION',
      'FOR ELECTRICAL PERMIT APPROVAL',
      'FOR ELECTRICAL PERMIT RELEASING',
      /ELECTRICAL PERMIT RELEASED TO/,
      /ELECTRICAL PERMIT SENT TO/,
    ]
  }

  // const newArray = _liststatus.allStatusArray.filter((item) => filterArray.includes(item))
  const newArray = _liststatus.allStatusArray.filter((item) => filterArray.some((filter) => filter.test(item)))
  opReleasedCount.value = newArray.length
  // console.log('newarray', newArray)
  // console.log('oldarray', _liststatus.allStatusArray)
}

const gotoHome = () => {
  controller.abort()
  updatePage('/')
  // window.location.reload()
}

const updatePage = (page) => {
  _currentpage.updateValue(page)
  router.push(page)
}

const loadCurrentPage = () => {
  router.push(_currentpage.getValue)
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

@media screen and (min-width: 1023px)
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
