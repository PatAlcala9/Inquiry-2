<template lang="pug">

q-page.padding.flex.flex-center.page
  div.column.items-center.text-center
    span.loading-title Generating List
    span.loading-type Application Status
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
import { useQuasar } from 'quasar'

import { useSearchValue } from 'stores/searchvalue'
import { useDivision } from 'stores/division'
import { useApplicationNo } from 'stores/applicationno'
import { useTableData } from 'stores/tabledata'
import { useOwnername } from 'stores/ownername'
import { useOwneraddress } from 'stores/owneraddress'
import { useLatestStatus } from 'stores/lateststatus'
import { useErrorMessage } from 'stores/errormessage'
import { useCurrentPage } from 'stores/currentpage'

const router = useRouter()
const quasar = useQuasar()

let _searchvalue = useSearchValue
let _division = useDivision
let _applicationno = useApplicationNo
let _tabledata = useTableData
let _ownername = useOwnername
let _owneraddress = useOwneraddress
let _lateststatus = useLatestStatus
let _errormessage = useErrorMessage
let _currentpage = useCurrentPage

const controller = new AbortController()

const searchData = async () => {
  const searched = _searchvalue.value
  try {
    let response
    const connection = await api.get('/api/CheckConnection')
    const data = connection.data || null
    const result = data !== null ? data.result : null

    if (result !== null) {
      if (_division.value === 'Building') {
        response = await api.get('/api/CheckBuilding/' + searched, {
          signal: controller.signal,
        })
      } else if (_division.value === 'Occupancy') {
        response = await api.get('/api/CheckOccupancy/' + searched, {
          signal: controller.signal,
        })
      } else if (_division.value === 'Signage') {
        response = await api.get('/api/CheckSignage/' + searched, {
          signal: controller.signal,
        })
      } else if (_division.value === 'Electrical') {
        response = await api.get('/api/CheckElectrical/' + searched, {
          signal: controller.signal,
        })
      } else if (_division.value === 'Mechanical') {
        response = await api.get('/api/CheckMechanical/' + searched, {
          signal: controller.signal,
        })
      } else if (_division.value === 'Unidentified') {
        _errormessage.value = 'Invalid Search'
        updatePage('searcherror')
        return
      }

      const data = response.data.length !== 0 ? response.data : null
      const result = data !== null ? data.result : null

      if (result !== null) {
        if (result.length > 0) {
          // const result2 = result[0].result
          // console.log(result2)
          // quasar.dialog({title: result})
          // console.log(result)

          _applicationno.value = searched
          await getOwnerDetails()
          await getTableData()
          // if (result2 > 0) {
          //   _applicationno.value = searched
          //   await getOwnerDetails()
          //   await getTableData()

          updatePage('statuscheck')
          // } else {
          //   updatePage('statsearcherror')
          // }
        } else {
          updatePage('searcherror')
        }
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
  const appno = _applicationno.value
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
    const response = await api.get('/api/GetOwnerName' + method + '/' + appno, {
      signal: controller.signal,
    })
    const data = response.data.length !== 0 ? response.data : null

    if (data !== null) {
      const result = data || null

      if (result !== null) {
        const fname = result.result
        const mname = result.result2
        const lname = result.result3
        const addressresult = result.result4
        const ffname = fname + ' ' + mname + ' ' + lname

        _ownername.value = ffname || '--No Name found on Database--'
        _owneraddress.value = addressresult || '--No Address found on Database--'
      }
    }
  } catch {
    _ownername.value = '--No Name found on Database--'
    _owneraddress.value = '--No Address found on Database--'
  }
}

const getTableData = async () => {
  const appno = _applicationno.value
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
    const response = await api.get('/api/GetTableData' + method + '/' + appno, {
      signal: controller.signal,
    })
    const data = response.data.length !== 0 ? response.data : null
    let tempData = []

    if (data !== null) {
      // console.log(data)
      // data.forEach((element) => {
      //   if (element.result !== null && element.result2 !== null) {
      //     console.log('yeah')
      //     tempData.push(data)
      //   }
      // })
      console.log(data.result.length)

      // data.map((element) => {
      //   if (element.result !== null && element.result2 !== null) {
      //     console.log(element)
      //     // tempData.push(data)
      //   }
      // })

      for(let i = 0; i <= data.result.length; i++) {
        if (data.result !== null && data.result2 !== null) {
          tempData.push(data)
        }
      }


      // const tempData = data.filter((element) => element.result !== null && element.result2 !== null).map((element) => element)
      // console.log(tempData)
      _tabledata.value = tempData
      _lateststatus.value = data.result2[0]

      // ready.value = true
    }
  } catch {
    _tabledata.value = []
    _lateststatus.value = null
    // ready.value = true
  }
}

const updatePage = (page) => {
  _currentpage.value = page
  router.push(page, () => {})
}

const gotoHome = () => {
  controller.abort()
  // updatePage('/')
  window.location.reload()
}

const loadCurrentPage = () => {
  router.push(_currentpage.value, () => {})
}

;(async () => {
  loadCurrentPage()
  await searchData()
})()
</script>

<style lang="sass" scoped>
h4, h2, h3
  font-family: 'PoppinsBold'

.while
  margin-top: -3 rem

.application
  margin-top: -2 rem
  font-size: 4rem

.fetching
  width: 100%
  text-align: center
  margin-top: -3rem

.loading-title
  font-size: 2.3rem
  font-family: 'PoppinsBold'

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

.loading-type
  font-size: 1.8rem
  font-family: 'Poppins'

@media screen and (min-width: 900px)
  .loading-title
    font-size: 3rem

  .minor
    font-size: 1.8rem
    padding: 2rem

  .loading-division
    font-size: 2.8rem

  .loading-value
    margin-top: 3rem
    font-size: 3.1rem

  .loading-type
    font-size: 2.2rem
</style>
