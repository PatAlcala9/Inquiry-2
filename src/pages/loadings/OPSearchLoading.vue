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

// let occupancyid = 0
// const getIDByOccupancyApplication = async () => {
//   try {
//     const response = await api.get('/api/GetIDByOccupancyApplication/' + _searchvalue.value)
//     const data = response.data.length !== 0 ? response.data : null
//     occupancyid = data.result || 0
//   } catch {
//     occupancyid = 0
//   }
// }

// let electricalid = 0
// const getIDByElectricalApplication = async () => {
//   try {
//     const response = await api.get('/api/GetIDByElectricalApplication/' + _searchvalue.value)
//     const data = response.data.length !== 0 ? response.data : null
//     electricalid = data.result || 0
//   } catch {
//     electricalid = 0
//   }
// }

const getOrderofPayment = async () => {
  let response

  try {
    const connection = await api.get('/api/CheckConnection')
    const data = connection.data || null
    const result = data !== null ? data.result : null

    if (result !== null) {
      if (_division.value === 'Building') {
        response = await api.get('/api/GetOrderofPayment/' + _searchvalue.value, {
          signal: controller.signal,
        })
      } else if (_division.value === 'Occupancy') {
        await getIDByOccupancyApplication()
        response = await api.get('/api/CheckOccupancy/' + occupancyid, {
          signal: controller.signal,
        })
      } else if (_division.value === 'Signage') {
        // response = await api.get('/api/CheckSignage/' + searched, {
        //   signal: controller.signal,
        // })
        return
      } else if (_division.value === 'Electrical') {
        await getIDByElectricalApplication()
        response = await api.get('/api/CheckElectrical/' + electricalid, {
          signal: controller.signal,
        })
      } else if (_division.value === 'Mechanical') {
        // response = await api.get('/api/CheckMechanical/' + searched, {
        //   signal: controller.signal,
        // })
        return
      } else if (_division.value === 'Unidentified') {
        _errormessage.value = 'Invalid Search'
        updatePage('searcherror')
        return
      }

      const data = response.data.length !== 0 ? response.data : null

      if (data !== null) {
        _tabledata.value = data
        await getOwnerDetails()

        updatePage('opcheck')
      } else {
        updatePage('searcherror')
      }
    } else {
      updatePage('noconnection')
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
    const response = await api.get('/api/GetOwnerName' + method + '/' + _searchvalue.value, {
      signal: controller.signal,
    })
    const data = response.data.length !== 0 ? response.data : null

    if (data !== null) {
      const fname = data.result
      const mname = data.result2
      const lname = data.result3
      const addressresult = data.result4
      const ffname = fname === undefined ? lname : fname + ' ' + mname + '. ' + lname

      _applicationno.value = _searchvalue.value
      _ownername.value = ffname || '--No Name found on Database--'
      _owneraddress.value = addressresult || '--No Address found on Database--'
    }
  } catch {
    _ownername.value = '--No Name found on Database--'
    _owneraddress.value = '--No Address found on Database--'
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
  await getOrderofPayment()
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
