<template lang="pug">

q-page.flex.flex-center.page(padding)
  div.column.items-center.text-center
    span.loading-title Generating List
    span.loading-type {{_listtype.getValue.toUpperCase()}}
    span.minor for
    span.loading-division {{_division.getValue}} Applications

    span.loading-division(v-if="_listyear.getValue !== 0") for the year {{_listyear.getValue}}
    span.loading-division(v-else) for {{dateDisplay}}

    span.loading-division(v-if="percentage > 0") {{percentage}} %

    div.fit.column.items-center
      q-btn.button(rounded @click="gotoHome") Cancel

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
import { ref } from 'vue'
import { date } from 'quasar'
import { encrypt, decrypt } from 'src/assets/js/shield'

const router = useRouter()
const _listtype = useListType()
const _division = useDivision()
const _currentpage = useCurrentPage()
let _tabledata = useTableData
const _listyear = useListYear()
const _listdate = useListDate()

let percentage = ref(0)
const dateDisplay = date.formatDate(_listdate.getValue, 'MMMM YYYY')

const controller = new AbortController()

const getApprovedPermitsDetails = async (id) => {
  const encryptedEndpoint = encrypt('GetApprovedPermitsDetails')
  const replacedEndpoint = encryptedEndpoint.replaceAll('/', '~')
  const encryptedData = encrypt(id)
  const replacedData = encryptedData.replaceAll('/', '~')
  const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
  const data = response.data.length !== 0 ? response.data : null

  return data
}

let applicationNoList = []
const getListofApplicationReleasedByYear = async () => {
  const response = await api.get('/api/GetListofApplicationReleasedByYear/' + _listyear.getValue, { signal: controller.signal })
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
  const response = await api.get('/api/GetListofOccupancyApplicationReleasedByYear/' + _listyear.getValue, { signal: controller.signal })
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
  const response = await api.get('/api/GetListofElectricalApplicationReleasedByYear/' + _listyear.getValue, { signal: controller.signal })
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
      tempTable.push(item)
    }
  }
}

const getApplicationByDivision = async () => {
  const encryptedEndpoint = encrypt('CheckConnection')
  const replacedEndpoint = encryptedEndpoint.replaceAll('/', '~')
  const connection = await api.get('/api/' + replacedEndpoint, { signal: controller.signal })
  const conn = connection.data || null
  const result = conn !== null ? decrypt(conn.result) : null

  if (result !== null) {
    let encryptedEndpoint
    let encryptedData
    if (_division.isBuilding) {
      if (_listyear.isNull) {
        encryptedEndpoint = encrypt('GetApprovedPermits')
        encryptedData = encrypt(_listdate.getValue)
      } else {
        encryptedEndpoint = encrypt('GetApprovedPermits')
        encryptedData = encrypt(_listyear.getValue)
      }
    } else if (_division.isOccupancy) {
      if (_listyear.isNull) {
        encryptedEndpoint = encrypt('GetApprovedPermitsByMonthOccupancy')
        encryptedData = encrypt(_listdate.getValue)
      } else {
        encryptedEndpoint = encrypt('GetApprovedPermitsByYearOccupancy')
        encryptedData = encrypt(_listyear.getValue)
      }
    } else if (_division.isSignage) {
      _errormessage.updateMessage('Error on Generating List')
      _errormessage.updateSubMessage('Signage Data is not found')
      updatePage('error')
      return
    } else if (_division.isElectrical) {
      if (_listyear.isNull) {
        encryptedEndpoint = encrypt('GetApprovedPermitsByMonthElectrical')
        encryptedData = encrypt(_listdate.getValue)
      } else {
        encryptedEndpoint = encrypt('GetApprovedPermitsByYearElectrical')
        encryptedData = encrypt(_listyear.getValue)
      }
    } else if (_division.isMechanical) {
      _errormessage.updateMessage('Error on Generating List')
      _errormessage.updateSubMessage('Mechanical Data is not found')
      updatePage('error')
      return
    } else {
      encryptedEndpoint = null
    }

    const replacedEndpoint = encryptedEndpoint.replaceAll('/', '~')
    const replacedData = encryptedData.replaceAll('/', '~')
    const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
    const data = response.data.length !== 0 ? response.data : null

    if (data.result.length > 0) {
      const permitList = []
      const decData = {
        result: data.result.map((item) => decrypt(item)),
        result2: data.result2.map((item) => decrypt(item)),
      }
      console.table(decData.result)
      console.table(decData.result2)
      // console.log(decData.result)
      // console.log(decData.result2)

      for (let i = 0; i < decData.result.length; i++) {
        const permit = await getApprovedPermitsDetails(decData.result[i])
        permitList.push(permit)
      }

      // console.log('permitList', permitList)

      let decPermitList = {}
      const tempResult = []
      const tempResult2 = []
      const tempResult3 = []
      const tempResult4 = []
      const tempResult5 = []
      const tempResult6 = []
      for (let i = 0; i < permitList.length; i++) {
        tempResult.push(decrypt(permitList[i].result))
        tempResult2.push(decrypt(permitList[i].result2))
        tempResult3.push(decrypt(permitList[i].result3))
        tempResult4.push(decrypt(permitList[i].result4))
        tempResult5.push(decrypt(permitList[i].result5))
        tempResult6.push(decrypt(permitList[i].result6))
      }
      decPermitList['result'] = tempResult
      decPermitList['result2'] = tempResult2
      decPermitList['result3'] = tempResult3
      decPermitList['result4'] = tempResult4
      decPermitList['result5'] = tempResult5
      decPermitList['result6'] = tempResult6

      console.log(decPermitList)

      // const tempApp = data.result
      // _liststatus.$patch({ value: [] })
      // _listsumpaid.$patch({ value: [] })

      // for (let i = 0; i < tempApp.length; i++) {
      //   const application = tempApp[i]
      //   const decApp = decrypt(application)

      //   const stat = await getLatestStatus(decApp)
      //   _liststatus.addStatus(stat)
      //   const sum = await getSumPaid(decApp)
      //   _listsumpaid.addSum(sum)
      // }
      updatePage('/')
      // updatePage('receivedlist')
    } else {
      _errormessage.updateMessage('Error on Generating List')
      _errormessage.updateSubMessage('Error')
      updatePage('error')
    }
  } else {
    updatePage('noconnection')
  }
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
  await getApplicationByDivision()
})()
</script>
