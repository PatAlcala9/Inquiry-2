<template lang="pug">

q-page.page(padding)
  section(v-if="$q.screen.width <= 767")
    section.page-title-group.left
      span.page-title.flex.flex-center Found for
      span.page-searchvalue.flex.flex-center {{_searchvalue.getValue.toUpperCase()}}
      span.secondary-title.number.flex.flex-center {{dTableData.result.length}}
      span.secondary-title.sentence.flex.flex-center {{sentence}}
      q-input.searchbar(rounded outlined v-model="specific" placeholder="Filter List" bg-color="white")
        template(v-slot:prepend)
          q-icon(name="search")

    div.full-width.column.wrap.justify-center.items-center.content-center
      q-btn.button-back2(rounded label="Back" @click="gotoHome")

      section(v-if="dTableData.result.length > 0")
        div.table-data-group-mobile.fit.column.wrap.justify-center.items-center.content-center.text-align(v-for="(item, index) in dTableData.result" :key="data")
          span.table-data-mobile-date {{item.toUpperCase()}}
          span.table-data-mobile-status {{dTableData.result2[index].toUpperCase()}}
          q-btn.table-button-mobile(rounded @click="getName(dTableData.result3[index], dTableData.result4[index])") Check

  section.page-pc(v-else)
    section.page-title-group.left
      div.application
        span.page-info--primary {{dTableData.result.length}} {{sentence}}
        q-input.searchbar(rounded outlined v-model="specific" placeholder="Filter List" bg-color="white" )
          template(v-slot:prepend)
            q-icon(name="search")

      section.details
        //- div.owner-group.full-width.column.wrap.justify-start.items-start.content-start
        //-   span.page-label Owner's Name:
        //-   span.page-info {{ownername}}
        //- div.address-group.full-width.column.wrap.justify-start.items-start.content-start
        //-   span.page-label Address:
        //-   sapn.page-info {{address}}
        //- div.address-group.full-width.column.wrap.justify-start.items-start.content-start
        //-   span.page-label Latest Status:
        //-   span.page-info {{latestStatus}}

      div.button-grid
        q-btn.button-back2(rounded label="Back" @click="gotoHome")


    section.right
      div.table-limit(v-if="filteredData.result.length > 0")
        table.table-custom
          thead
            tr
              th Name
              th Address
              th
          tbody
            tr(v-for="(item, index) in filteredData.result" :key="item")
              td {{item.toUpperCase()}}
              td {{filteredData.result2[index].toUpperCase()}}
              td
                q-btn.table-button(rounded @click="getName(filteredData.result3[index], filteredData.result4[index])") Check

    //- section.right(v-else)
    //-   div.table-limit(v-if="dTableData.result.length > 0")
    //-     table.table-custom
    //-       thead
    //-         tr
    //-           th Name
    //-           th Address
    //-           th
    //-       tbody
    //-         tr(v-for="(item, index) in dTableData.result" :key="item")
    //-           td {{item.toUpperCase()}}
    //-           td {{dTableData.result2[index].toUpperCase()}}
    //-           td
    //-             q-btn.table-button(rounded @click="getName(dTableData.result3[index], dTableData.result4[index])") Check


  q-dialog.dialog(v-if="$q.screen.width <= 767" full-height v-model="dialog" position="top")
    q-card.card-dialog
      q-card-section
        section(v-if="searchComplete")
          div.dialog-status-display.full-width.column.justify-center.content-center.items-center(v-if="idCount === 0")
            span.card-dialog-status No Application Found
            span.card-dialog-third for
            br
            section.full-width.column.justify-center.content-center.items-center(v-if="selectedFirstName !== 'empty'")
              span.card-dialog-third Lastname:
              span.card-dialog-secondary {{selectedLastName}}
              span.card-dialog-third Firstname:
              span.card-dialog-secondary {{selectedFirstName}}
            section.full-width.column.justify-center.content-center.items-center(v-else)
              span.card-dialog-third Company Name:
              span.card-dialog-status {{selectedLastName}}

          div.full-width.column.justify-center.items-center.content-center(v-else-if="idCount > 1" )
            span.card-dialog-title Current Status

            div.dialog-title-group
              span.card-dialog-title.standard-font Please select
              span.card-dialog-title.standard-font which application
              span.card-dialog-title.standard-font you want to check

            div.button-group
              q-btn.card-dialog-button(v-if="receivingid > 0" rounded size="lg" @click="openDialog2") Building
              q-btn.card-dialog-button(v-if="occupancyid > 0" rounded size="lg" @click="openDialog3") Occupancy
              q-btn.card-dialog-button(v-if="electricalid > 0" rounded size="lg" @click="openDialog4") Electrical

          div(v-else)
            section(v-if="receivingid !== 0").dialog-status-display.full-width.column.justify-center.content-center.items-center
              span.card-dialog-title Building Application Number:
              span.card-dialog-status {{applicationNo}}
              br
              span.card-dialog-title Current Status:
              span.card-dialog-status {{lastStatusBuilding}}
            section(v-else-if="occupancyid !== 0").dialog-status-display.full-width.column.justify-center.content-center.items-center
              span.card-dialog-title Occupancy Application Number:
              span.card-dialog-status {{applicationNo}}
              br
              span.card-dialog-title Current Status:
              span.card-dialog-status {{lastStatusOccupancy}}
            section(v-else-if="electricalid !== 0").dialog-status-display.full-width.column.justify-center.content-center.items-center
              span.card-dialog-title Electrical Application Number:
              span.card-dialog-status {{applicationNo}}
              br
              span.card-dialog-title Current Status:
              span.card-dialog-status {{lastStatusElectrical}}
            section(v-else)
              span.card-dialog-title No Application Found

        section(v-else)
          div.dialog-status-display
            span.card-dialog-status Checking Data
            span.card-dialog-third Please Wait

  q-dialog.dialog(v-else full-height v-model="dialog" position="left")
    q-card.card-dialog
      q-card-section
        section(v-if="searchComplete")
          div.dialog-status-display.full-width.column.justify-center.content-center.items-center(v-if="idCount === 0")
            span.card-dialog-status No Application Found
            span.card-dialog-third for
            br
            section.full-width.column.justify-center.content-center.items-center(v-if="selectedFirstName !== 'empty'")
              span.card-dialog-third Lastname:
              span.card-dialog-secondary {{selectedLastName}}
              span.card-dialog-third Firstname:
              span.card-dialog-secondary {{selectedFirstName}}
            section.full-width.column.justify-center.content-center.items-center(v-else)
              span.card-dialog-third Company Name:
              span.card-dialog-status {{selectedLastName}}

          div.full-width.column.justify-center.items-center.content-center(v-else-if="idCount > 1" )
            span.card-dialog-title Current Status

            div.dialog-title-group
              span.card-dialog-title.standard-font Please select
              span.card-dialog-title.standard-font which application
              span.card-dialog-title.standard-font you want to check

            div.button-group
              q-btn.card-dialog-button(v-if="receivingid > 0" rounded size="lg" @click="openDialog2") Building
              q-btn.card-dialog-button(v-if="occupancyid > 0" rounded size="lg" @click="openDialog3") Occupancy
              q-btn.card-dialog-button(v-if="electricalid > 0" rounded size="lg" @click="openDialog4") Electrical

          div(v-else)
            section(v-if="receivingid !== 0").dialog-status-display.full-width.column.justify-center.content-center.items-center
              span.card-dialog-title Building Application Number:
              span.card-dialog-status {{applicationNo}}
              br
              span.card-dialog-title Current Status:
              span.card-dialog-status {{lastStatusBuilding}}
            section(v-else-if="occupancyid !== 0").dialog-status-display.full-width.column.justify-center.content-center.items-center
              span.card-dialog-title Occupancy Application Number:
              span.card-dialog-status {{applicationNo}}
              br
              span.card-dialog-title Current Status:
              span.card-dialog-status {{lastStatusOccupancy}}
            section(v-else-if="electricalid !== 0").dialog-status-display.full-width.column.justify-center.content-center.items-center
              span.card-dialog-title Electrical Application Number:
              span.card-dialog-status {{applicationNo}}
              br
              span.card-dialog-title Current Status:
              span.card-dialog-status {{lastStatusElectrical}}
            section(v-else)
              span.card-dialog-title No Application Found

        section(v-else)
          div.dialog-status-display
            span.card-dialog-status Checking Data
            span.card-dialog-third Please Wait

  q-dialog.dialog2(full-width v-model="dialog2" position="left")
    q-card.card-dialog2
      div.button-group.column.items-center.text-center
        span.card-dialog-title Current Building Status
        span.card-dialog-status {{lastStatusBuilding}}

  q-dialog.dialog2(full-width v-model="dialog3" position="top")
    q-card.card-dialog2
      div.button-group.column.tems-center.text-center
        span.card-dialog-title Current Occupancy Status
        span.card-dialog-status {{lastStatusOccupancy}}

  q-dialog.dialog2(full-width v-model="dialog4" position="top")
    q-card.card-dialog2
      div.button-group.column.items-center.text-center
        span.card-dialog-title Current Electrical Status
        span.card-dialog-status {{lastStatusElectrical}}
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
import { ref, computed } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useTableData } from 'stores/tabledata'
import { useCurrentPage } from 'stores/currentpage'
import { useSearchValue } from 'stores/searchvalue'
import { encrypt, decrypt, encryptXCha, decryptXCha } from 'assets/js/shield'
import { hash } from 'src/assets/js/OCBO'

const router = useRouter()
const quasar = useQuasar()
const _tabledata = useTableData()
const _currentpage = useCurrentPage()
const _searchvalue = useSearchValue()
const dTableData = ref({
  result: _tabledata.getTable.result.map((item) => decrypt(item)),
  result2: _tabledata.getTable.result2.map((item) => decrypt(item)),
  result3: _tabledata.getTable.result3.map((item) => decrypt(item)),
  result4: _tabledata.getTable.result4.map((item) => decrypt(item)),
})

const controller = new AbortController()

let rows = ref(dTableData.value)
let specific = ref('')
let sentence = ref(dTableData.value.result.length <= 1 ? ' Application' : ' Applications')

const dTableDataFilter = ref({
  result: dTableData.value.result.filter((item) => item.includes(specific.value)),
  result2: dTableData.value.result2.filter((item) => item.includes(specific.value)),
  result3: dTableData.value.result3.filter((item) => item.includes(specific.value)),
  result4: dTableData.value.result4.filter((item) => item.includes(specific.value)),
})

const filteredData = computed(() => {
  const term = specific.value.toUpperCase()

  if (!term) return dTableData.value

  // return {
  //   result: dTableData.value.result.filter((item) => itemMatchesSearch(item, term)),
  //   result2: dTableData.value.result2.filter((item) => itemMatchesSearch(item, term)),
  //   result3: dTableData.value.result3.filter((item) => itemMatchesSearch(item, term)),
  //   result4: dTableData.value.result4.filter((item) => itemMatchesSearch(item, term)),
  // }

  const filteredResult = dTableData.value.result.filter((item) => item.name.toUpperCase().includes(term))

  const filteredIndices = filteredResult.map((item) => dTableData.value.result.indexOf(item))

  return {
    result: filteredResult,
    result2: dTableData.value.result2.filter((_, index) => filteredIndices.includes(index)),
    result3: dTableData.value.result3.filter((_, index) => filteredIndices.includes(index)),
    result4: dTableData.value.result4.filter((_, index) => filteredIndices.includes(index)),
  }
})

const itemMatchesSearch = (item, term) => {
  return Object.values(item).some((value) => String(value).toUpperCase().includes(term))
}

let selectedFirstName = ref(null)
let selectedLastName = ref(null)
let receivingid = ref(0)
let occupancyid = ref(0)
let electricalid = ref(0)
let signageid = ref(0)
let mechanicalid = ref(0)
let idCount = ref(0)
let searchComplete = ref(false)
let lastStatusBuilding = ref(null)
let lastStatusOccupancy = ref(null)
let lastStatusElectrical = ref(null)
let lastStatusSignage = ref(null)
let lastStatusMechanical = ref(null)
let dialog = ref(false)
let dialog2 = ref(false)
let dialog3 = ref(false)
let dialog4 = ref(false)

const getName = (lastname, firstname) => {
  selectedLastName.value = lastname || null
  selectedFirstName.value = firstname || null

  dialog.value = true
  displayDetail()
}

const displayDetail = async () => {
  idCount.value = 0
  searchComplete.value = false

  await searchByNameBuilding()
  if (receivingid.value > 0) {
    await getLastStatusBuilding()
    await getApplicationByID()
  }

  await searchByNameOccupancy()
  if (occupancyid.value > 0) {
    await getLastStatusOccupancy()
    await getOccupancyApplicationByID()
  }

  await searchByNameElectrical()
  if (electricalid.value > 0) {
    await getLastStatusElectrical()
    await getElectricalApplicationByID()
  }

  await countIDs()
}

const searchByNameBuilding = async () => {
  if (selectedLastName.value.includes('/')) {
    const arraylastName = selectedLastName.value.split('/')
    selectedLastName.value = arraylastName[0]
  }

  if (selectedFirstName.value === null) {
    const tempFirstName = 'empty'
    selectedFirstName.value = tempFirstName
  }

  try {
    const encryptedEndpoint = encrypt('SearchByNameBuilding')
    const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')

    const encryptedData = encrypt(selectedLastName.value)
    const replacedData = encryptedData.replace(/\//g, '~')

    const encryptedData2 = encrypt(selectedFirstName.value)
    const replacedData2 = encryptedData2.replace(/\//g, '~')

    const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData + '/' + replacedData2, { signal: controller.signal })
    const data = response.data.length !== 0 ? response.data : null

    if (data === null) {
      receivingid.value = 0
    } else {
      receivingid.value = decrypt(data.result) || 0
    }
  } catch (err) {
    receivingid.value = 0
    lastStatusBuilding.value = 'Error on fetching Building data'
  }
}

const getLastStatusBuilding = async () => {
  const encryptedEndpoint = encrypt('GetLastStatusBuilding')
  const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')

  const encryptedData = encrypt(receivingid.value)
  const replacedData = encryptedData.replace(/\//g, '~')

  const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
  const data = response.data.length !== 0 ? response.data : null

  if (data === null) {
    lastStatusBuilding.value = 'No Status Found'
  } else {
    lastStatusBuilding.value = decrypt(data.result) || 'No Status Found'
  }
}

const searchByNameOccupancy = async () => {
  if (selectedLastName.value.includes('/')) {
    const arraylastName = selectedLastName.value.split('/')
    selectedLastName.value = arraylastName[0]
  }

  if (selectedFirstName.value === null) {
    const tempFirstName = 'empty'
    selectedFirstName.value = tempFirstName
  }

  try {
    const encryptedEndpoint = encrypt('SearchByNameOccupancy')
    const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')

    const encryptedData = encrypt(selectedLastName.value)
    const replacedData = encryptedData.replace(/\//g, '~')

    const encryptedData2 = encrypt(selectedFirstName.value)
    const replacedData2 = encryptedData2.replace(/\//g, '~')

    const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData + '/' + replacedData2, { signal: controller.signal })
    const data = response.data.length !== 0 ? response.data : null

    if (data === null) {
      occupancyid.value = 0
    } else {
      occupancyid.value = decrypt(data.result) || 0
    }
  } catch {
    occupancyid.value = 0
    lastStatusOccupancy.value = 'Downloading Data'
  }
}

const getLastStatusOccupancy = async () => {
  const encryptedEndpoint = encrypt('GetLastStatusOccupancy')
  const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')

  const encryptedData = encrypt(occupancyid.value)
  const replacedData = encryptedData.replace(/\//g, '~')

  const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
  const data = response.data.length !== 0 ? response.data : null

  if (data === null) {
    lastStatusOccupancy.value = 'No Status Found'
  } else {
    lastStatusOccupancy.value = decrypt(data.result) || 'No Status Found'
  }
}

const searchByNameElectrical = async () => {
  if (selectedLastName.value.includes('/')) {
    const arraylastName = selectedLastName.value.split('/')
    selectedLastName.value = arraylastName[0]
  }

  if (selectedFirstName.value === null) {
    const tempFirstName = 'empty'
    selectedFirstName.value = tempFirstName
  }

  try {
    const encryptedEndpoint = encrypt('SearchByNameElectrical')
    const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')

    const encryptedData = encrypt(selectedLastName.value)
    const replacedData = encryptedData.replace(/\//g, '~')

    const encryptedData2 = encrypt(selectedFirstName.value)
    const replacedData2 = encryptedData2.replace(/\//g, '~')

    const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData + '/' + replacedData2, { signal: controller.signal })
    const data = response.data.length !== 0 ? response.data : null

    if (data === null) {
      electricalid.value = 0
    } else {
      electricalid.value = decrypt(data.result) || 0
    }
  } catch {
    electricalid.value = 0
  }
}

const getLastStatusElectrical = async () => {
  const encryptedEndpoint = encrypt('GetLastStatusElectrical')
  const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')

  const encryptedData = encrypt(electricalid.value)
  const replacedData = encryptedData.replace(/\//g, '~')

  const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
  const data = response.data.length !== 0 ? response.data : null

  if (data === null) {
    lastStatusElectrical.value = 'No Status Found'
  } else {
    lastStatusElectrical.value = decrypt(data.result) || 'No Status Found'
  }
}

const countIDs = async () => {
  const receivingCount = receivingid.value > 0 ? 1 : 0
  const occupancyCount = occupancyid.value > 0 ? 1 : 0
  const electricalCount = electricalid.value > 0 ? 1 : 0
  const signageCount = signageid.value > 0 ? 1 : 0
  const mechanicalCount = mechanicalid.value > 0 ? 1 : 0
  const result = receivingCount + occupancyCount + electricalCount + signageCount + mechanicalCount

  idCount.value = result
  searchComplete.value = true
  console.log('yeah')
}

let applicationNo = ref(null)

const getApplicationByID = async () => {
  const encryptedEndpoint = encrypt('GetApplicationByID')
  const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')

  const encryptedData = encrypt(receivingid.value)
  const replacedData = encryptedData.replace(/\//g, '~')

  const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
  const data = response.data.length !== 0 ? response.data : null

  if (data !== null) {
    applicationNo.value = decrypt(data.result) || null
    // console.log(applicationNo.value)
  } else {
    // console.log('No record on Building')
  }
}

const getOccupancyApplicationByID = async () => {
  const encryptedEndpoint = encrypt('GetOccupancyApplicationByID')
  const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')

  const encryptedData = encrypt(occupancyid.value)
  const replacedData = encryptedData.replace(/\//g, '~')

  const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
  const data = response.data.length !== 0 ? response.data : null

  if (data !== null) {
    applicationNo.value = decrypt(data.result) || null
    // console.log(applicationNo.value)
  } else {
    // console.log('No record on Occupancy')
  }
}

const getElectricalApplicationByID = async () => {
  const encryptedEndpoint = encrypt('GetElectricalApplicationByID')
  const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')

  const encryptedData = encrypt(electricalid.value)
  const replacedData = encryptedData.replace(/\//g, '~')

  const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
  const data = response.data.length !== 0 ? response.data : null

  if (data !== null) {
    applicationNo.value = decrypt(data.result) || null
    // console.log(applicationNo.value)
  } else {
    // console.log('No record on Electrical')
  }
}

// const openDialog2 = () => {
//   dialog.value = false
//   dialog2.value = true
// }

// const openDialog3 = () => {
//   dialog.value = false
//   dialog2.value = false
//   dialog3.value = true
// }

// const openDialog4 = () => {
//   dialog.value = false
//   dialog2.value = false
//   dialog3.value = false
//   dialog4.value = true
// }

const updatePage = (page) => {
  quasar.sessionStorage.setItem(hash('page'), encryptXCha(page))
  router.push(page)
}

const loadCurrentPage = () => {
  const currentPage = quasar.sessionStorage.hasItem(hash('page')) ? quasar.sessionStorage.getItem(hash('page')) : '/'
  const decryptedPage = decryptXCha(currentPage)
  router.push(decryptedPage)
}

const gotoHome = () => {
  // controller.abort();
  updatePage('/')
  // window.location.reload()
}

;(() => {
  loadCurrentPage()
})()
</script>

<style lang="sass" scoped>
.header
  display: flex
  flex-direction: row
  flex-wrap: wrap
  justify-content: flex-start
  align-items: flex-start
  align-content: flex-start

.fetching
  width: 100%
  text-align: center
  margin-top: -3rem

.searchbar
  width: 15rem
  margin-bottom: 3rem
  font-size: 1.2rem
  font-family: 'Roboto', sans-serif

.number
  margin: -1rem
  font-size: 4.5rem

.sentence
  font-family: 'Roboto'
  // font-size: 2rem
  font-size: 1.6rem
  padding-bottom: 1rem

.button
  margin: 2rem
  width: 90%

.while
  margin-top: -3rem

.dialog
  width: 100vw
  // height: 100vh

.dialog2
  width: 100vw

.card-dialog
  // background-color: $darktext
  color: #FFFFFF
  font-family: 'Roboto'
  font-weight: bold
  width: 100vw
  height: 150%
  opacity: 0.9
  display: flex
  flex-direction: column
  flex-wrap: wrap
  justify-content: center
  align-items: center
  align-content: flex-start
  backdrop-filter: blur(16px) saturate(180%)
  background-color: rgba(34, 51, 69, 0.75)
  border: 1px solid $darktext

.card-dialog2
  background-color: $button
  color: #FFFFFF
  font-family: 'Roboto'
  font-weight: bold
  width: 100vw
  height: 50vh
  opacity: 0.8

.card-dialog-title
  font-size: 1.8rem

.card-dialog-secondary
  font-size: 2rem
  // margin-top: 2rem

.card-dialog-third
  font-size: 1.3rem
  // margin-top: 0.5rem

.card-dialog-status
  font-size: 2rem
  margin-top: 1rem
  margin-bottom: 2rem
  text-transform: uppercase

.card-dialog-button
  margin-top: 0
  margin-bottom: 0.8rem
  width: 15rem
  background-color: rgba(255,255,255,0.8)
  color: $button
  height: 50px
  font-size: 1.1rem
  box-shadow: -10px 10px 18px 0px rgba(0, 0, 0, 0.4)

.standard-font
  font-family: 'Roboto'

.button-group
  display: flex
  flex-direction: column
  flex-wrap: wrap
  justify-content: center
  align-items: center
  align-content: center
  margin-top: 3rem

.dialog-title-group
  display: flex
  flex-direction: column
  flex-wrap: wrap
  justify-content: center
  align-items: center
  align-content: center
  margin-top: 2rem
  font-size: 1.2rem

.table-title-group
  margin-top: 2rem
  margin-bottom: 2rem
  padding-left: 4rem
  padding-right: 4rem
  font-family: 'Roboto'
  font-weight: bold
  font-size: 1.8rem
  color: white

.table-title-group-mobile
  margin: 2rem 0 1.5rem 0
  padding-left: 1rem
  padding-right: 1rem
  font-family: "Lexend"
  font-size: 1.5rem
  color: white
  text-align: center

.table-data-group
  padding-left: 4rem
  padding-right: 4rem

.table-data-group-mobile
  padding-left: 1rem
  padding-right: 1rem

.table-data
  font-family: "Roboto"
  font-size: 1rem
  color: #0f3057
  padding: 0.3rem
  text-align: center
  border: 1px solid #0f3057
  width: 50%
  background-color: rgba(255,255,255,0.8)

.table-button
  font-family: "Roboto"
  background-color: $yellow
  color: $darktext
  width: 8rem

.table-button-mobile
  font-family: "Roboto"
  background-color: #0f3057
  color: white
  width: 8rem
  margin-bottom: 2rem

.table-data-mobile-date
  font-family: "Roboto"
  font-weight: bold
  font-size: 1.2rem
  color: yellow
  text-align: center
  border: 1px solid $button2

.table-data-mobile-status
  font-family: "Roboto"
  font-weight: bold
  font-size: 1.3rem
  color: white
  text-align: center
  margin-bottom: 1rem

.dialog-status-display
  margin-top: 3rem
  text-align: center

.page-title
  color: white
  font-size: 1.8rem

.page-searchvalue
  font-family: "Roboto"
  font-weight: bold
  color: yellow
  font-size: 2rem

.page-pc
  display: grid
  grid-template-columns: 0.3fr 0.7fr
  grid-template-rows: 1fr
  gap: 0px 0px
  grid-template-areas: "left right"
  max-width: 1920px
  margin: 0 auto

.left
  display: grid
  grid-template-columns: 1fr
  grid-template-rows: 0.1fr 0.8fr 0.1fr
  gap: 3rem 0px
  grid-template-areas: "application" "details" "button-grid"
  grid-area: left

.application
  grid-area: application
  margin: 0 0 2rem 0

.details
  grid-area: details

.button-grid
  grid-area: button-grid

.right
  margin: 2rem 0 0 0
  justify-self: center
  align-self: center
  grid-area: right

.page-info--primary
  // font-size: 2.8rem
  paddinng: 0
  margin: 0

.page-label
  opacity: 0.5

.page-info
  // font-size: 1.8rem
  text-align: left

.table-custom thead
    background-color: transparent
    font-size: 1.1rem

.table-custom th
  padding: 1.1rem 1.1rem 2rem 1.1rem

.table-custom tbody
  padding: 1rem

.table-custom td
  padding: 1rem
  font-size: 1rem
  border-bottom: 1px solid $text

.table-limit
  height: 800px
  overflow-y: auto

@media screen and (min-width: 768px)
  .button-group
    display: flex
    flex-direction: row
    justify-content: space-between
    padding: 2rem

  .button
    width: 12rem
    margin: 0
    margin-top: 2rem

  .dialog-title-group
    display: flex
    flex-direction: column
    flex-wrap: wrap
    justify-content: center
    align-items: center
    align-content: center
    margin-top: 2rem

  .searchbar
    width: 22rem

  .card-dialog
    height: 40vh
</style>
