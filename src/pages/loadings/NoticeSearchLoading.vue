<template lang="pug">

q-page.padding.flex.flex-center.page
  div.column.items-center.text-center
    span.loading-title Generating List
    span.loading-type {{_listtype.value.toUpperCase()}}
    span.minor for
    span.loading-division {{_division.value}} Application
    span.loading-value {{_searchvalue.value}}

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
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useCurrentPage } from 'stores/currentpage'
import { useListType } from 'stores/listtype'
import { useSearchValue } from 'stores/searchvalue'
import { useDivision } from 'stores/division'
import { useApplicationNo } from 'stores/applicationno'
import { useTableData } from 'stores/tabledata'
import { useOwnername } from 'stores/ownername'
import { useOwneraddress } from 'stores/owneraddress'

const router = useRouter()
// let _listsubject = useListSubject
let _listtype = useListType
let _currentpage = useCurrentPage
let _searchvalue = useSearchValue
let _division = useDivision
let _applicationno = useApplicationNo
let _tabledata = useTableData
let _ownername = useOwnername
let _owneraddress = useOwneraddress

const controller = new AbortController()

// const checkConnection = async () => {
//   const response = await api.get('/api/CheckConnection')
//   const data = connection.data || null
//   return data !== null ? data.result : null
// }

const getProgressFlow = async () => {
  try {
    let data = null

    if (_division.value === 'Building') {
      const response = await api.get('/api/GetProgressFlowBuilding/' + _searchvalue.value)
      data = response.data.length !== 0 ? response.data : null
    } else if (_division.value === 'Occupancy') {
      const response = await api.get('/api/GetProgressFlowOccupancy/' + _searchvalue.value)
      data = response.data.length !== 0 ? response.data : null
    } else if (_division.value === 'Signage') {
      // const response = await api.get('/api/GetProgressFlowOccupancy/' + _searchvalue.value)
      data = null
    } else if (_division.value === 'Electrical') {
      const response = await api.get('/api/GetProgressFlowElectrical/' + _searchvalue.value)
      data = response.data.length !== 0 ? response.data : null
    } else if (_division.value === 'Mechanical') {
      // const response = await api.get('/api/GetProgressFlowOccupancy/' + _searchvalue.value)
      data = null
    }

    if (data !== null) {
      _applicationno.value = _searchvalue.value
      _tabledata.value = data
    }
  } catch {
    updatePage('noconnection')
  }
}

const getOwnerDetails = async () => {
  let method = ''

  if (_division.value === 'Building') {
    method = 'Bldg'
  } else if (_division.value === 'Occupancy') {
    method = 'Occ'
  } else if (_division.value === 'Signage') {
    method = 'Sign'
  } else if (_division.value === 'Electrical') {
    method = 'Elec'
  } else if (_division.value === 'Mechanical') {
    method = 'Mech'
  }

  try {
    const connection = await api.get('/api/CheckConnection')
    const connData = connection.data || null
    const result = connData !== null ? connData.result : null

    if (result !== null) {
      const response = await api.get('/api/GetOwnerName' + method + '/' + _searchvalue.value, {
        signal: controller.signal,
      })

      const data = response.data.length !== 0 ? response.data : null

      if (data !== null) {
        const result = data || null

        if (result !== null) {
          const fname = data.result
          const mname = data.result2
          const lname = data.result3
          const addressresult = data.result4
          const ffname = fname.length === 0 ? lname : fname + ' ' + mname + '. ' + lname

          _applicationno.value = _searchvalue.value
          _ownername.value = ffname || '--No Name found on Database--'
          _owneraddress.value = addressresult || '--No Address found on Database--'
        }
      }
    } else {
      updatePage('noconnection')
    }
  } catch {
    updatePage('noconnection')
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
  await getOwnerDetails()
  await getProgressFlow()
  updatePage('noticecheck')
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
