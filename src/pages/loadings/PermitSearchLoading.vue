<template lang="pug">

q-page.flex.flex-center.page(padding)
  div.column.items-center.text-center
    span.loading-title Generating List
    span.loading-type {{_listtype.getValue.toUpperCase()}}
    span.minor for
    span.loading-division {{_division.getValue}} Application
    span.loading-value {{_searchvalue.getValue}}

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
import { useErrorMessage } from 'stores/errormessage'
import { encrypt, decrypt } from 'assets/js/shield'

const router = useRouter()
// let _listsubject = useListSubject
const _listtype = useListType()
const _currentpage = useCurrentPage()
const _searchvalue = useSearchValue()
const _division = useDivision()
let _applicationno = useApplicationNo()
let _tabledata = useTableData
const _ownername = useOwnername()
const _owneraddress = useOwneraddress()
const _errormessage = useErrorMessage()

const controller = new AbortController()

// let receivingid = 0
// const getIDByApplication = async () => {
//   const response = await api.get('/api/GetIDByApplication/' + _searchvalue.value)
//   const data = response.data.length !== 0 ? response.data : null

//   if (data !== null) {
//     const result = data.result
//     receivingid = result
//   }
// }

const getPermits = async () => {
  try {
    let data

    if (_division.isBuilding) {
      const encryptedEndpoint = encrypt('GetPermitsBuilding')
      const replacedEndpoint = encryptedEndpoint.replaceAll('/', '~')
      const encryptedData = encrypt(_searchvalue.getValue)
      const replacedData = encryptedData.replaceAll('/', '~')
      const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
      data = response.data.length !== 0 ? response.data : null
    } else if (_division.isOccupancy) {
      const encryptedEndpoint = encrypt('GetPermitsOccupancy')
      const replacedEndpoint = encryptedEndpoint.replaceAll('/', '~')
      const encryptedData = encrypt(_searchvalue.getValue)
      const replacedData = encryptedData.replaceAll('/', '~')
      const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
      data = response.data.length !== 0 ? response.data : null
    } else if (_division.isSignage) {
      // const response = await api.get('/api/GetProgressFlowOccupancy/' + _searchvalue.value)
      data = null
    } else if (_division.isElectrical) {
      const encryptedEndpoint = encrypt('GetPermitsElectrical')
      const replacedEndpoint = encryptedEndpoint.replaceAll('/', '~')
      const encryptedData = encrypt(_searchvalue.getValue)
      const replacedData = encryptedData.replaceAll('/', '~')
      const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
      data = response.data.length !== 0 ? response.data : null
    } else if (_division.isMechanical) {
      // const response = await api.get('/api/GetProgressFlowOccupancy/' + _searchvalue.value)
      data = null
    }

    if (data !== null) {
      _tabledata.value = data
      return 'ok'
    } else {
      _tabledata.value = null
      return 'nodata'
    }
  } catch {
    return 'noconnection'
    // updatePage('noconnection')
  }
}

// const getPermitsBuilding = async () => {
//   const response = await api.get('/api/GetPermitsBuilding/' + _searchvalue.value)
//   const data = response.data.length !== 0 ? response.data : null
//   const result = data !== null ? data.result : null

//   let tempData = []

//   if (data !== null) {
//     data.forEach((element) => {
//       if (element.result !== null && element.result2 !== null) {
//         tempData.push(element)
//       }
//     })

//     _tabledata.value = tempData
//   } else {
//     _tabledata.value = null
//   }
// }

const getOwnerDetails = async () => {
  const appno = _applicationno.getValue
  let method = ''

  if (_division.isBuilding) {
    method = 'Bldg'
  } else if (_division.isOccupancy) {
    method = 'Occ'
  } else if (_division.isSignage) {
    method = 'Sign'
  } else if (_division.isElectrical) {
    method = 'Elec'
  } else if (_division.isMechanical) {
    method = 'Mech'
  }

  try {
    const encryptedEndpoint = encrypt('CheckConnection')
    const replacedEndpoint = encryptedEndpoint.replaceAll('/', '~')

    const connection = await api.get('/api/' + replacedEndpoint, { signal: controller.signal })
    const connData = connection.data || null
    const result = connData !== null ? decrypt(connData.result) : null

    if (result !== null) {
      const encryptedEndpoint = encrypt('GetOwnerName' + method)
      const replacedEndpoint = encryptedEndpoint.replaceAll('/', '~')
      const encryptedData = encrypt(_searchvalue.getValue)
      const replacedData = encryptedData.replaceAll('/', '~')
      const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
      const data = response.data.length !== 0 ? response.data : null

      if (data !== null) {
        const fname = decrypt(data.result)
        const mname = decrypt(data.result2)
        const lname = decrypt(data.result3)
        const addressresult = decrypt(data.result4)
        const ffname = fname.length === 0 ? lname : fname + ' ' + (mname.length === 0 ? lname : mname + '. ' + lname)

        _ownername.updateValue(ffname || '--No Name found on Database--')
        _owneraddress.updateValue(addressresult || '--No Address found on Database--')

        const permit = await getPermits()
        if (permit === 'ok') {
          updatePage('permitcheck')
        } else if (permit === 'nodata') {
          _errormessage.updateMessage('Failed to Inquire Permits')
          _errormessage.updateSubMessage('No Permits Found for ' + _searchvalue.getValue)
          updatePage('error')
        } else {
          updatePage('noconnection')
        }
      } else {
        updatePage('noconnection')
      }
    }
  } catch {
    // _ownername.value = '--No Name found on Database--'
    // _owneraddress.value = '--No Address found on Database--'
    updatePage('noconnection')
  }
}

const gotoHome = () => {
  controller.abort()
  // updatePage('/')
  window.location.reload()
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
  await getOwnerDetails()
})()
</script>

<!-- <style lang="sass" scoped>

.loading-title
  font-size: 1.6rem
  font-family: 'LexendBold'

.loading-type
  font-size: 1.2rem
  font-family: 'Lexend'

.minor
  padding: 1.2rem

.loading-division
  font-size: 1.4rem
  font-family: 'LexendBold'

.loading-value
  margin-top: 1.6rem
  font-size: 1.8rem
  font-family: 'LexendBold'
  color: $yellow

@media screen and (min-width: 900px)
  .loading-title
    font-size: 2.2rem

  .loading-type
    font-size: 1.8rem

  .minor
    font-size: 1.6rem
    padding: 1.6rem

  .loading-division
    font-size: 2.2rem

  .loading-value
    margin-top: 2rem
    font-size: 2.6rem
</style> -->
