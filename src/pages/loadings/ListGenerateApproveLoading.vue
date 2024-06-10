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

      for (let i = 0; i < decData.result.length; i++) {
        const permit = await getApprovedPermitsDetails(decData.result[i])
        // console.log('permit', permit)
        permitList.push(permit)
      }

      let decPermitList = {}
      for (let i = 0; i < permitList.length; i++) {
        decPermitList = permitList.map(({ result }) => ({
          result: decrypt(result),
        }))
      }

      console.log('decPermitList', decPermitList)
      // const a = await getApprovedPermitsDetails(decData.result[0])
      // permitList.push(a)
      // console.log(decrypt(a.result))
      // console.log(decrypt(a.result2))
      // console.log(decrypt(a.result3))
      // console.log(decrypt(a.result4))
      // console.log(decrypt(a.result5))
      // console.log(decrypt(a.result6))
      // console.log(permitList)
      // console.log('permitList', permitList)

      // for (let i = 0; i < decData.result.length; i++) {}
      // const newObj = {
      //   result: permitList.result.map(d => d),
      //   result2: permitList.result2.map(d => d),
      //   result3: permitList.result3.map(d => d),
      //   result4: permitList.result4.map(d => d),
      //   result5: permitList.result5.map(d => d),
      //   result6: data.result2.map(d => d),
      //   result7: permitList.result6.map(d => d)
      // }

      // const newObj2 = {
      //   result: permitList.result.map(d => decrypt(d)),
      //   result2: permitList.result2.map(d => decrypt(d)),
      //   result3: permitList.result3.map(d => decrypt(d)),
      //   result4: permitList.result4.map(d => decrypt(d)),
      //   result5: permitList.result5.map(d => decrypt(d)),
      //   result6: data.result2.map(d => decrypt(d)),
      //   result7: permitList.result6.map(d => decrypt(d))
      // }

      // console.log('newObj', newObj)
      // console.log('newObj2', newObj2)

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
