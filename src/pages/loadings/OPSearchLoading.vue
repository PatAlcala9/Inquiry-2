<template lang="pug">

q-page.flex.flex-center.page(padding)
  div.loading-screen
    span.loading-title Please wait
    span.loading-title Downloading Data
    span.loading-type {{_listtype.getValue.toUpperCase()}}
    span.minor for
    span.loading-division {{_division.getValue}} Application
    span.loading-value {{_searchvalue.getValue}}

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
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useCurrentPage } from 'stores/currentpage'
import { useListType } from 'stores/listtype'
import { useSearchValue } from 'stores/searchvalue'
import { useDivision } from 'stores/division'
import { useErrorMessage } from 'stores/errormessage'
import { useApplicationNo } from 'stores/applicationno'
import { useTableData } from 'stores/tabledata'
import { useOwnername } from 'stores/ownername'
import { useOwneraddress } from 'stores/owneraddress'
import { encrypt, decrypt, encryptXCha, decryptXCha } from 'assets/js/shield'
import { hash } from 'src/assets/js/OCBO'

const router = useRouter()
const quasar = useQuasar()
// const _listsubject = useListSubject
const _listtype = useListType()
const _currentpage = useCurrentPage()
const _searchvalue = useSearchValue()
const _division = useDivision()
const _errormessage = useErrorMessage()
const _applicationno = useApplicationNo()
const _tabledata = useTableData()
const _ownername = useOwnername()
const _owneraddress = useOwneraddress()

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
    const encryptedEndpoint = encrypt('CheckConnection')
    const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')

    const connection = await api.get('/api/' + replacedEndpoint, { signal: controller.signal })
    const data = connection.data || null
    const result = data !== null ? decrypt(data.result) : null

    if (result !== null) {
      if (_division.isBuilding) {
        const encryptedEndpoint = encrypt('GetOrderofPaymentBuilding')
        const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')
        const encryptedData = encrypt(_searchvalue.getValue)
        const replacedData = encryptedData.replace(/\//g, '~')
        response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
      } else if (_division.isOccupancy) {
        const encryptedEndpoint = encrypt('GetOrderofPaymentOccupancy')
        const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')
        const encryptedData = encrypt(_searchvalue.getValue)
        const replacedData = encryptedData.replace(/\//g, '~')
        response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
      } else if (_division.isSignage) {
        // response = await api.get('/api/CheckSignage/' + searched, {
        //   signal: controller.signal,
        // })
        return
      } else if (_division.isElectrical) {
        const encryptedEndpoint = encrypt('GetOrderofPaymentElectrical')
        const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')
        const encryptedData = encrypt(_searchvalue.getValue)
        const replacedData = encryptedData.replace(/\//g, '~')
        response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
      } else if (_division.isMechanical) {
        // response = await api.get('/api/CheckMechanical/' + searched, {
        //   signal: controller.signal,
        // })
        return
      } else {
        _errormessage.updateMessage('Invalid Search')
        _errormessage.updateSubMessage('Unknown division')
        updatePage('error')
        return
      }

      const data = response.data.length !== 0 ? response.data : null

      if (data !== null) {
        _tabledata.updateTable(data)
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
    const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')

    const encryptedData = encrypt(_searchvalue.getValue)
    const replacedData = encryptedData.replace(/\//g, '~')
    const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
    const data = response.data.length !== 0 ? response.data : null

    if (data !== null) {
      const fname = decrypt(data.result)
      const mname = decrypt(data.result2)
      const lname = decrypt(data.result3)
      const block = decrypt(data.result4)
      const lot = decrypt(data.result5)
      const address = decrypt(data.result6)
      // const ffname = fname.length === 0 ? lname : fname + ' ' + mname + '. ' + lname
      const ffname = fname.length === 0 ? lname : fname + ' ' + (mname.length === 0 ? lname : mname + '. ' + lname)
      let addressresult = `${block.length === 0 ? '' : `BLOCK ${block} `}${lot.length === 0 ? '' : `LOT ${lot} `}${address}`
      addressresult = addressresult.replace(/(\s|^)BLK/g, 'BLOCK')
      addressresult = addressresult.replace(/(\s|^)LT/g, 'LOT')

      _applicationno.updateValue(_searchvalue.getValue)
      _ownername.updateValue(ffname || '--No Name found on Database--')
      _owneraddress.updateValue(addressresult || '--No Address found on Database--')
    }
  } catch {
    _ownername.updateValue('--No Name found on Database--')
    _owneraddress.updateValue('--No Address found on Database--')
  }
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
  await getOrderofPayment()
})()
</script>

<!-- <style lang="sass" scoped>

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
  color: $yellow

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
</style> -->
