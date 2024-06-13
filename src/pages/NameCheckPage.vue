<template lang="pug">

q-page.page(padding)

  div(v-if="$q.screen.width <= 899")
    div.full-width.column.no-wrap.justify-center.items-center.content-start
      span.page-title Found for
      span.page-searchvalue {{_searchvalue.getValue.toUpperCase()}}
      span.secondary-title.number {{_tabledata.value.result.length}}
      span.secondary-title.sentence {{sentence}}
      q-input.searchbar(rounded outlined v-model="specific" placeholder="Search Specific" bg-color="white" )
        template(v-slot:prepend)
          q-icon(name="search")

    div.full-width.column.wrap.justify-center.items-center.content-center
      q-btn.button-back(rounded label="Back" @click="gotoHome")

      section(v-if="_tabledata.value.result.length > 0")
        div.table-data-group-mobile.fit.column.wrap.justify-center.items-center.content-center.text-align(v-for="(item, index) in _tabledata.value.result" :key="data")
          span.table-data-mobile-date {{decrypt(item).toUpperCase()}}
          span.table-data-mobile-status {{decrypt(_tabledata.value.result2[index]).toUpperCase()}}
          q-btn.table-button-mobile(rounded @click="getName(decrypt(_tabledata.value.result3[index]), decrypt(_tabledata.value.result4[index]))") Check

  div(v-else)
    div.full-width.column.content-center.items-center.justify-center
      h3.secondary-title {{_tabledata.value.result.length}} {{sentence}}
      q-input.searchbar(rounded outlined v-model="specific" placeholder="Search Specific" bg-color="white" )
        template(v-slot:prepend)
          q-icon(name="search")

      div.flex.flex-center
        q-btn.button-back(rounded label="Back" @click="gotoHome")

      section.full-width.column.content-center.items-center.justify-center(v-if="_tabledata.value.result.length > 0")
        table.table-custom
          thead
            tr
              th Name
              th Address
              th
          tbody
            tr(v-for="(item, index) in _tabledata.value.result" :key="item")
              td {{decrypt(item).toUpperCase()}}
              td {{decrypt(_tabledata.value.result2[index]).toUpperCase()}}
              td
                q-btn.table-button(rounded @click="getName(decrypt(_tabledata.value.result3[index]), decrypt(_tabledata.value.result4[index]))") Check


  //- div(v-else class="fetching")
  //-   h4(class="main-title2") You've search for
  //-   h3(class="main-title2") '{{searchValue.toUpperCase()}}'
  //-   h4(class="main-title2") Please wait
  //-   h4(class="main-title2 while") while
  //-   h4(class="main-title2") {{message}}

  //- div(v-if="$q.screen.width <= 500")
  //-   div(class="full-width column no-wrap justify-center items-center content-start")
  //-     q-btn(rounded class="button" label="Back" @click="gotoHome")

  //- div(v-else).flex.flex-center
  //-   q-btn(rounded class="button" label="Back" @click="gotoHome")


  //- q-dialog.dialog(full-width v-model="dialog" position="top")
  //-   q-card.card-dialog
  //-     q-card-section
  //-       section(v-if="searchComplete")
  //-         div.dialog-status-display.full-width.column.justify-center.content-center.items-center(v-if="idCount === 0")
  //-           span.card-dialog-status No Application Found
  //-           span.card-dialog-third for
  //-           br
  //-           section.full-width.column.justify-center.content-center.items-center(v-if="selectedFirstName !== 'empty'")
  //-             span.card-dialog-third Lastname:
  //-             span.card-dialog-secondary {{selectedLastName}}
  //-             span.card-dialog-third Firstname:
  //-             span.card-dialog-secondary {{selectedFirstName}}
  //-           section.full-width.column.justify-center.content-center.items-center(v-else)
  //-             span.card-dialog-third Company Name:
  //-             span.card-dialog-status {{selectedLastName}}

  //-         div.full-width.column.justify-center.items-center.content-center(v-else-if="idCount > 1" )
  //-           span.card-dialog-title Current Status

  //-           div(class="dialog-title-group")
  //-             span(class="card-dialog-title standard-font") Please select
  //-             span(class="card-dialog-title standard-font") which application
  //-             span(class="card-dialog-title standard-font") you want to check

  //-           div(class="button-group")
  //-             q-btn.card-dialog-button(v-if="receivingid > 0" rounded size="lg" @click="openDialog2") Building
  //-             q-btn.card-dialog-button(v-if="occupancyid > 0" rounded size="lg" @click="openDialog3") Occupancy
  //-             q-btn.card-dialog-button(v-if="electricalid > 0" rounded size="lg" @click="openDialog4") Electrical

  //-         div(v-else)
  //-           section(v-if="receivingid !== 0").dialog-status-display.full-width.column.justify-center.content-center.items-center
  //-             span(class="card-dialog-title") Building Application Number:
  //-             span(class="card-dialog-status") {{applicationNo}}
  //-             br
  //-             span(class="card-dialog-title") Current Status:
  //-             span(class="card-dialog-status") {{lastStatusBuilding}}
  //-           section(v-else-if="occupancyid !== 0").dialog-status-display.full-width.column.justify-center.content-center.items-center
  //-             span(class="card-dialog-title") Occupancy Application Number:
  //-             span(class="card-dialog-status") {{applicationNo}}
  //-             br
  //-             span(class="card-dialog-title") Current Status:
  //-             span(class="card-dialog-status") {{lastStatusOccupancy}}
  //-           section(v-else-if="electricalid !== 0").dialog-status-display.full-width.column.justify-center.content-center.items-center
  //-             span(class="card-dialog-title") Electrical Application Number:
  //-             span(class="card-dialog-status") {{applicationNo}}
  //-             br
  //-             span(class="card-dialog-title") Current Status:
  //-             span(class="card-dialog-status") {{lastStatusElectrical}}
  //-           section(v-else)
  //-             span(class="card-dialog-title") No Application Found

  //-       section(v-else)
  //-         div.dialog-status-display.full-width.column.justify-center.content-center.items-center
  //-           span(class="card-dialog-status") Checking Data
  //-           span(class="card-dialog-third") Please Wait

  //- q-dialog(class="dialog2" full-width v-model="dialog2" position="top")
  //-   q-card(class="card-dialog2")
  //-     div(class="button-group column items-center text-center")
  //-       span(class="card-dialog-title") Current Building Status
  //-       span(class="card-dialog-status") {{lastStatusBuilding}}

  //- q-dialog(class="dialog2" full-width v-model="dialog3" position="top")
  //-   q-card(class="card-dialog2")
  //-     div(class="button-group column items-center text-center")
  //-       span(class="card-dialog-title") Current Occupancy Status
  //-       span(class="card-dialog-status") {{lastStatusOccupancy}}

  //- q-dialog(class="dialog2" full-width v-model="dialog4" position="top")
  //-   q-card(class="card-dialog2")
  //-     div(class="button-group column items-center text-center")
  //-       span(class="card-dialog-title") Current Electrical Status
  //-       span(class="card-dialog-status") {{lastStatusElectrical}}
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
import { useTableData } from 'stores/tabledata'
import { useCurrentPage } from 'stores/currentpage'
import { useSearchValue } from 'stores/searchvalue'
import { decrypt } from 'assets/js/shield'

const router = useRouter()
let _tabledata = useTableData
const _currentpage = useCurrentPage()
const _searchvalue = useSearchValue()

// let rows = ref(_tabledata.value)
let specific = ref('')
let sentence = ' Applications'

// const newRows = computed(() => {
//   return rows.value.filter((row) => {
//     return row.result !== '' && row.result.toUpperCase().indexOf(specific.value.toUpperCase()) != -1
//   })
// })

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

// const getName = (lastname, firstname) => {
//   selectedLastName.value = lastname || null
//   selectedFirstName.value = firstname || null

//   dialog.value = true
//   displayDetail()
// }

// const displayDetail = async () => {
//   idCount.value = 0
//   searchComplete.value = false

//   await searchByNameBuilding()
//   if (receivingid.value > 0) {
//     await getLastStatusBuilding()
//     await getApplicationByID()
//   }

//   await searchByNameOccupancy()
//   if (occupancyid.value > 0) {
//     await getLastStatusOccupancy()
//     await getOccupancyApplicationByID()
//   }

//   await searchByNameElectrical()
//   if (electricalid.value > 0) {
//     await getLastStatusElectrical()
//     await getElectricalApplicationByID()
//   }

//   await countIDs()
// }

// const searchByNameBuilding = async () => {
//   if (selectedLastName.value.includes('/')) {
//     const arraylastName = selectedLastName.value.split('/')
//     selectedLastName.value = arraylastName[0]
//   }

//   if (selectedFirstName.value === null) {
//     const tempFirstName = 'empty'
//     selectedFirstName.value = tempFirstName
//   }

//   try {
//     const response = await api.get('/api/SearchByNameBuilding/' + selectedLastName.value + '/' + selectedFirstName.value)
//     const result = response.data.length !== 0 ? response.data : null

//     if (result === null) {
//       receivingid.value = 0
//     } else {
//       receivingid.value = result[0].result
//     }
//   } catch {
//     receivingid.value = 0
//     lastStatusBuilding.value = 'Downloading Data'
//   }
// }

// const getLastStatusBuilding = async () => {
//   const response = await api.get('/api/GetLastStatusBuilding/' + receivingid.value)
//   const result = response.data.length !== 0 ? response.data : null

//   if (result === null) {
//     lastStatusBuilding.value = 'No Status Found'
//   } else {
//     lastStatusBuilding.value = result[0].result || 'No Status Found'
//   }
// }

// const searchByNameOccupancy = async () => {
//   if (selectedLastName.value.includes('/')) {
//     const arraylastName = selectedLastName.value.split('/')
//     selectedLastName.value = arraylastName[0]
//   }

//   if (selectedFirstName.value === null) {
//     const tempFirstName = 'empty'
//     selectedFirstName.value = tempFirstName
//   }

//   try {
//     const response = await api.get('/api/SearchByNameOccupancy/' + selectedLastName.value + '/' + selectedFirstName.value)
//     const result = response.data.length !== 0 ? response.data : null

//     if (result === null) {
//       occupancyid.value = 0
//     } else {
//       occupancyid.value = result[0].result
//     }
//   } catch {
//     occupancyid.value = 0
//     lastStatusOccupancy.value = 'Downloading Data'
//   }
// }

// const getLastStatusOccupancy = async () => {
//   const response = await api.get('/api/GetLastStatusOccupancy/' + occupancyid.value)
//   const result = response.data.length !== 0 ? response.data : null

//   if (result === null) {
//     lastStatusOccupancy.value = 'No Status Found'
//   } else {
//     lastStatusOccupancy.value = result[0].result || 'No Status Found'
//   }
// }

// const searchByNameElectrical = async () => {
//   if (selectedLastName.value.includes('/')) {
//     const arraylastName = selectedLastName.value.split('/')
//     selectedLastName.value = arraylastName[0]
//   }

//   if (selectedFirstName.value === null) {
//     const tempFirstName = 'empty'
//     selectedFirstName.value = tempFirstName
//   }

//   try {
//     const response = await api.get('/api/SearchByNameElectrical/' + selectedLastName.value + '/' + selectedFirstName.value)
//     const result = response.data.length !== 0 ? response.data : null

//     if (result === null) {
//       electricalid.value = 0
//     } else {
//       electricalid.value = result[0].result
//     }
//   } catch {
//     electricalid.value = 0
//   }
// }

// const getLastStatusElectrical = async () => {
//   const response = await api.get('/api/GetLastStatusElectrical/' + electricalid.value)

//   const result = response.data.length !== 0 ? response.data : null

//   if (result === null) {
//     lastStatusElectrical.value = 'No Status Found'
//   } else {
//     lastStatusElectrical.value = result[0].result || 'No Status Found'
//   }
// }

// const countIDs = async () => {
//   const receivingCount = receivingid.value > 0 ? 1 : 0
//   const occupancyCount = occupancyid.value > 0 ? 1 : 0
//   const electricalCount = electricalid.value > 0 ? 1 : 0
//   const signageCount = signageid.value > 0 ? 1 : 0
//   const mechanicalCount = mechanicalid.value > 0 ? 1 : 0
//   const result = receivingCount + occupancyCount + electricalCount + signageCount + mechanicalCount

//   idCount.value = result
//   searchComplete.value = true
// }

// let applicationNo = ref(null)

// const getApplicationByID = async () => {
//   const response = await api.get('/api/GetApplicationByID/' + receivingid.value)
//   const result = response.data || null
//   applicationNo.value = result[0].result || null
// }

// const getOccupancyApplicationByID = async () => {
//   const response = await api.get('/api/GetOccupancyApplicationByID/' + occupancyid.value)
//   const result = response.data || null
//   applicationNo.value = result[0].result || null
// }

// const getElectricalApplicationByID = async () => {
//   const response = await api.get('/api/GetElectricalApplicationByID/' + electricalid.value)
//   const result = response.data || null
//   applicationNo.value = result[0].result || null
// }

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
  _currentpage.updateValue(page)
  router.push(page)
}

const gotoHome = () => {
  // controller.abort();
  updatePage('/')
  // window.location.reload()
}
</script>

<style lang="sass" scoped>
// h4, h2, h3
//   font-family: 'PoppinsBold'

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
  font-family: 'Poppins', sans-serif

.number
  margin: -1rem
  font-size: 4.5rem

.sentence
  font-family: 'Poppins'
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
  background-color: $button
  color: #FFFFFF
  font-family: 'PoppinsBold'
  width: 100vw
  height: 150%
  opacity: 0.9

.card-dialog2
  background-color: $button
  color: #FFFFFF
  font-family: 'PoppinsBold'
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
  font-family: 'Poppins'

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
  font-family: "PoppinsBold"
  font-size: 1.8rem
  color: white

.table-title-group-mobile
  margin: 2rem 0 1.5rem 0
  padding-left: 1rem
  padding-right: 1rem
  font-family: "Poppins"
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
  font-family: "Poppins"
  font-size: 1rem
  color: #0f3057
  padding: 0.3rem
  text-align: center
  border: 1px solid #0f3057
  width: 50%
  background-color: rgba(255,255,255,0.8)

.table-button
  font-family: "Poppins"
  background-color: #0f3057
  color: white
  width: 8rem

.table-button-mobile
  font-family: "Poppins"
  background-color: #0f3057
  color: white
  width: 8rem
  margin-bottom: 2rem

.table-data-mobile-date
  font-family: "PoppinsBold"
  font-size: 1.2rem
  color: yellow
  text-align: center

.table-data-mobile-status
  font-family: "PoppinsBold"
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
  font-family: "PoppinsBold"
  color: yellow
  font-size: 2rem

// .button-back
//   background-color: $negative

@media screen and (min-width: 900px)
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
