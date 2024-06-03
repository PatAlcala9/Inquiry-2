<template lang="pug">

q-page.padding.flex.flex-center.page
  div.column.items-center.text-center
    span.loading-title Generating List
    span.loading-type Application Status
    span.minor for
    span.loading-division {{_division.getValue}} Application
    span.loading-value {{_searchvalue.value}}

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
import { useQuasar } from 'quasar'

import { useSearchValue } from 'stores/searchvalue'
import { useDivision } from 'stores/division'
import { useApplicationNo } from 'stores/applicationno'
import { useOwnername } from 'stores/ownername'
import { useOwneraddress } from 'stores/owneraddress'
import { useLatestStatus } from 'stores/lateststatus'
import { useErrorMessage } from 'stores/errormessage'
import { useCurrentPage } from 'stores/currentpage'
import { useTableData } from 'stores/tabledata'
import { encrypt, decrypt } from 'assets/js/shield'

const router = useRouter()
const quasar = useQuasar()

let _searchvalue = useSearchValue
let _division = useDivision()
let _applicationno = useApplicationNo()
let _ownername = useOwnername
let _owneraddress = useOwneraddress
let _lateststatus = useLatestStatus
let _errormessage = useErrorMessage
const _currentpage = useCurrentPage()
let _tabledata = useTableData

const controller = new AbortController()

const searchData = async () => {
  const searched = _searchvalue.value
  try {
    let response
    const encryptedEndpoint = encrypt('CheckConnection')
    const replacedEndpoint = encryptedEndpoint.replaceAll('/', '~')
    const connection = await api.get('/api/' + replacedEndpoint)
    const data = connection.data || null
    const result = data !== null ? decrypt(data.result) : null

    if (result !== null) {
      if (_division.isBuilding) {
        const encryptedEndpoint = encrypt('CheckBuilding')
        const replacedEndpoint = encryptedEndpoint.replaceAll('/', '~')
        const encryptedData = encrypt(searched)
        const replacedData = encryptedData.replaceAll('/', '~')
        response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, {
          signal: controller.signal,
        })
      } else if (_division.isOccupancy) {
        const encryptedEndpoint = encrypt('CheckOccupancy')
        const replacedEndpoint = encryptedEndpoint.replaceAll('/', '~')
        const encryptedData = encrypt(searched)
        const replacedData = encryptedData.replaceAll('/', '~')
        response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, {
          signal: controller.signal,
        })
      } else if (_division.isSignage) {
        const encryptedEndpoint = encrypt('CheckSignage')
        const replacedEndpoint = encryptedEndpoint.replaceAll('/', '~')
        const encryptedData = encrypt(searched)
        const replacedData = encryptedData.replaceAll('/', '~')
        response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, {
          signal: controller.signal,
        })
      } else if (_division.isElectrical) {
        const encryptedEndpoint = encrypt('CheckElectrical')
        const replacedEndpoint = encryptedEndpoint.replaceAll('/', '~')
        const encryptedData = encrypt(searched)
        const replacedData = encryptedData.replaceAll('/', '~')
        response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, {
          signal: controller.signal,
        })
      } else if (_division.isMechanical) {
        const encryptedEndpoint = encrypt('CheckMechanical')
        const replacedEndpoint = encryptedEndpoint.replaceAll('/', '~')
        const encryptedData = encrypt(searched)
        const replacedData = encryptedData.replaceAll('/', '~')
        response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, {
          signal: controller.signal,
        })
      } else {
        _errormessage.value = 'Invalid Search'
        updatePage('searcherror')
        return
      }

      const data = response.data.length !== 0 ? response.data : null
      const result = data !== null ? decrypt(data.result) : null
      if (result !== null) {
        if (result.length > 0) {
          _applicationno.updateValue(searched)
          await getOwnerDetails()
          await getTableData()

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
    const encryptedEndpoint = encrypt('GetOwnerName' + method)
    const replacedEndpoint = encryptedEndpoint.replaceAll('/', '~')

    const encryptedData = encrypt(_searchvalue.value)
    const replacedData = encryptedData.replaceAll('/', '~')
    // response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, {
    const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, {
      signal: controller.signal,
    })
    const data = response.data.length !== 0 ? response.data : null
    if (data !== null) {
      const result = data || null

      if (result !== null) {
        const fname = decrypt(result.result)
        const mname = decrypt(result.result2)
        const lname = decrypt(result.result3)
        const addressresult = decrypt(result.result4)
        const ffname = fname.length === 0 ? lname : fname + ' ' + mname + '. ' + lname

        _ownername.value = ffname || '--No Name found on Database--'
        _owneraddress.value = addressresult || '--No Address found on Database--'
      }
    }
  } catch (error) {
    console.log('error', error)
    console.log('response', error.response)
    console.log('data', error.response.data)
    // console.log('dataJSON', JSON.parse(error.response.data))

    // console.log(error.response.data)
    // if (error.response.data.includes("no rows")) {
    //   console.log("no rows, my dudes")
    // }
    _ownername.value = '--No Name found on Database--'
    _owneraddress.value = '--No Address found on Database--'
  }
}

const getTableData = async () => {
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
    const encryptedEndpoint = encrypt('GetTableData' + method)
    const replacedEndpoint = encryptedEndpoint.replaceAll('/', '~')

    const encryptedData = encrypt(appno)
    const replacedData = encryptedData.replaceAll('/', '~')
    const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, {
      signal: controller.signal,
    })
    const data = response.data.length !== 0 ? response.data : null

    if (data !== null) {
      _tabledata.value = data
      _lateststatus.value = decrypt(data.result2[0])
    }
  } catch {
    _tabledata.value = {}
    _lateststatus.value = null
  }
}

const updatePage = (page) => {
  _currentpage.updateValue(page)
  router.push(page)
}

const gotoHome = () => {
  controller.abort()
  updatePage('/')
  // window.location.reload()
}

const loadCurrentPage = () => {
  router.push(_currentpage.getValue)
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
  color: $yellow

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
