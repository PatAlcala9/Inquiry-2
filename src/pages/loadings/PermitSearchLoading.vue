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

let receivingid = 0
const getIDByApplication = async () => {
  const response = await api.get('/api/GetIDByApplication/' + _searchvalue.value)
  const data = response.data.length !== 0 ? response.data : null

  if (data !== null) {
    const result = data[0].result
    receivingid = result
  }
}

const getPermitsByID = async () => {
  const response = await api.get('/api/GetPermitsByID/' + receivingid)
  const data = response.data.length !== 0 ? response.data : null
  let tempData = []

  if (data !== null) {
    data.forEach((element) => {
      if (element.result !== null && element.result2 !== null) {
        tempData.push(element)
      }
    })

    _tabledata.value = tempData
  } else {
    _tabledata.value = null
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
    const response = await api.get('/api/GetOwnerName' + method + '/' + _searchvalue.value, {
      signal: controller.signal,
    })
    const data = response.data.length !== 0 ? response.data : null
    console.log('data:', data)
    if (data !== null) {
      const result = data[0].length !== 0 ? data[0] : null
      console.log('result:', result)
      if (result !== null) {
        const fname = result.result
        const mname = result.result2
        const lname = result.result3
        const addressresult = result.result4
        const ffname = fname === undefined ? lname : fname + ' ' + mname + '. ' + lname

        _ownername.value = ffname || '--No Name found on Database--'
        _owneraddress.value = addressresult || '--No Address found on Database--'

        console.log('_ownername:', _ownername.value)
      }
    }
  } catch {
    _ownername.value = '--No Name found on Database--'
    _owneraddress.value = '--No Address found on Database--'
  }
}

const gotoHome = () => {
  controller.abort()
  // updatePage('/')
  window.location.reload()
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
  await getIDByApplication()
  await getPermitsByID()
  updatePage('permitcheck')

  console.log('tabledata:', _tabledata.value)
})()
</script>

<style lang="sass" scoped>

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
  color: yellow

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
</style>
