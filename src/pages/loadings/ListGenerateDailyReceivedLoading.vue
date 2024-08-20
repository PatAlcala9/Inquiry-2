<template lang="pug">

q-page.flex.flex-center.page(padding)
  div.loading-screen
    span.loading-title Generating List
    span.loading-type {{_listtype.getValue.toUpperCase()}}
    span.minor for
    span.loading-division {{_division.getValue}} Applications
    span.minor on
    span.loading-division {{properDate}}

    span.loading-division(v-if="percentage > 0") {{percentage}} %

    div.fit.column.items-center
      q-btn.button-back2(rounded @click="gotoHome") Cancel

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
import { useListOPCount } from 'stores/listopcount'
import { useListPermitCount } from 'stores/listpermitcount'
import { ref } from 'vue'
import { date, useQuasar } from 'quasar'
import { encrypt, decrypt, encryptXCha, decryptXCha } from 'assets/js/shield'
import { hash } from 'assets/js/OCBO'

const router = useRouter()
const quasar = useQuasar()

const _listtype = useListType()
const _division = useDivision()
const _currentpage = useCurrentPage()
const _tabledata = useTableData()
const _listyear = useListYear()
const _listdate = useListDate()
const _errormessage = useErrorMessage()
const _liststatus = useListStatus()
const _listsumpaid = useListSumPaid()
const _listopcount = useListOPCount()
const _listpermitcount = useListPermitCount()

let statusList = []

let percentage = ref(0)
const properDate = date.formatDate(_listdate.getValue, 'MMMM DD, YYYY')
const formattedDate = date.formatDate(_listdate.getValue, 'YYYY~MM~DD')

const controller = new AbortController()

const getDailyReceived = async () => {
  let data

  const encryptedEndpoint = encrypt('CheckConnection')
  const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')
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

    const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')
    const encryptedData = encrypt(formattedDate)
    const replacedData = encryptedData.replace(/\//g, '~')
    const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
    data = response.data.length !== 0 ? response.data : null

    if (data.result.length > 0) {
      _tabledata.updateTable(data)
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
      } else if (dayOfWeek === 0) {
        _errormessage.updateSubMessage(properDate + ' is Sunday, OCBO is closed on weekends')
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

  const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')
  const encryptedData = encrypt(application)
  const replacedData = encryptedData.replace(/\//g, '~')
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

  const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')
  const encryptedData = encrypt(application)
  const replacedData = encryptedData.replace(/\//g, '~')
  const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
  const data = response.data.length !== 0 ? response.data : null
  const result = decrypt(data.result)

  return result !== '' ? result : 0
}

const countOPReleased = async () => {
  let filterArray = []
  let newArray = []

  if (_division.isBuilding) {
    filterArray = ['ORDER OF PAYMENT RELEASED', 'OR NUMBER VERIFIED', 'RECEIVED FOR PROCESSING', 'FOR BUILDING OFFICIAL APPROVAL', 'PERMIT APPROVE AND READY FOR RELEASE', 'PERMIT ALREADY RELEASE']
    newArray = _liststatus.allStatusArray.filter((item) => filterArray.includes(item))
  } else if (_division.isOccupancy) {
    filterArray = [
      /ORDER OF PAYMENT RELEASE FOR BUREAU OF FIRE/,
      /OCCUPANCY ORDER OF PAYMENT PAID/,
      /OCCUPANCY OFFICIAL RECEIPT VALIDATED/,
      /FOR OCCUPANCY PERMIT RECOMMENDING APPROVAL/,
      /FOR OCUPANCY CERTIFICATE OF ELECTRICAL INSPECTION GENERATION/,
      /FOR OCCUPANCY PERMIT GENERATION/,
      /FOR OCCUPANCY RELEASING/,
      /OCCUPANCY PERMIT RELEASED TO/,
    ]
    newArray = _liststatus.allStatusArray.filter((item) => filterArray.some((filter) => filter.test(item)))
  } else if (_division.isElectrical) {
    filterArray = [
      /ELECTRICAL ORDERPAYMENT RELEASED/,
      /FOR ELECTRICAL OFFICIAL RECEIPT VALIDATION/,
      /FOR ELECTRICAL PERMIT APPROVAL/,
      /FOR ELECTRICAL PERMIT RELEASING/,
      /ELECTRICAL PERMIT RELEASED TO/,
      /ELECTRICAL PERMIT SENT TO/,
    ]
    newArray = _liststatus.allStatusArray.filter((item) => filterArray.some((filter) => filter.test(item)))
  }
  return newArray.length
}

const countPermitRelease = async () => {
  let result = 0

  if (_division.isBuilding) {
    result = _liststatus.allStatusArray.filter((stat) => stat === 'PERMIT ALREADY RELEASE').length
  } else if (_division.isOccupancy) {
    result = _liststatus.allStatusArray.filter((stat) => /OCCUPANCY PERMIT RELEASED TO/.test(stat)).length
  } else if (_division.isElectrical) {
    result = _liststatus.allStatusArray.filter((stat) => /ELECTRICAL PERMIT RELEASED TO/.test(stat) || /ELECTRICAL PERMIT SENT TO/.test(stat)).length
  } else {
    result = 0
  }

  return result
}

const gotoHome = () => {
  controller.abort()
  updatePage('/')
  // window.location.reload()
}

const updatePage = (page) => {
  quasar.sessionStorage.setItem(hash('page'), encryptXCha(page))
  router.push(page)
}

const loadCurrentPage = () => {
  const currentPage = quasar.sessionStorage.hasItem(hash('page')) ? quasar.sessionStorage.getItem(hash('page')) : '/'
  const decryptedPage = decryptXCha(currentPage)
  router.push(decryptedPage)
}

;(async () => {
  loadCurrentPage()
  await getDailyReceived()
  _listopcount.updateValue(await countOPReleased())
  _listpermitcount.updateValue(await countPermitRelease())
})()
</script>

<style lang="sass" scoped>

.loading-title
  font-family: 'Roboto'
  font-weight: bold
  font-size: 1.8rem

.loading-type
  font-size: 1.8rem
  font-family: 'Roboto'

.minor
  padding: 1.2rem

.loading-division
  font-size: 1.8rem
  font-family: 'Roboto'
  font-weight: bold

.loading-value
  margin-top: 2rem
  font-size: 2.2rem
  font-family: 'Roboto'
  font-weight: bold
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
