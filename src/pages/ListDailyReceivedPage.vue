<template lang="pug">

q-page.page(padding)
  div.title-area
    span.main Received {{ _division.getValue }} Application
    span.submain on
    span.date {{ properDate }}

  div.grid
    section.bar-area
      section
        div.summary--count2
          span.label Total Count
          span.content {{ rowCount }}

        div.summary--count2
          span.label OP Released:
          span.content {{ _listopcount.getValue }}
          span.label Released Percentage
          span.content {{ opPercentage() }}%

        div.summary--count2
          span.label Permit Released:
          span.content {{ _listpermitcount.getValue }}
          section(v-if="permitPercentageValue.value > 0")
            span.label Released Percentage
            span.content {{ permitPercentageValue.value }}%

        div.summary--count2
          span.label Total Amount
          span.content
            b &#8369; &#0032;
            a {{ Intl.NumberFormat('en-US').format(_listsumpaid.getTotal) }}



    section.button-area(v-if="quasar.screen.width <= 767")
      div.full-width.column.wrap.justify-center.items-center.content-center
        BackButton(text="Back" @click="gotoHome")

      div.table-data-mobile.fit.column.wrap.justify-center.items-center.content-center.text-align(v-for="(item, index) in _tabledata.getTable.result" :key="item")
        span.application {{decrypt(item)}}
        span.permit {{decrypt(_tabledata.getTable.result4[index])}}

    section.table-contain.right.table-area(v-else)
      table.table-custom
        thead
          tr
            th Application No.
            th Owner's Name
            //- th Owner's Address
            th Location
            th Occupancy Type
        tbody
          tr(v-for="(item, index) in _tabledata.getTable.result" :key="item")
            td {{decrypt(item)}}
            td {{decrypt(_tabledata.getTable.result2[index])}}
            td {{decrypt(_tabledata.getTable.result3[index])}}
            td {{decrypt(_tabledata.getTable.result4[index])}}

    div.button-area
      BackButton(text="Back" @click="gotoHome")
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
import { useRouter } from 'vue-router'
import { useCurrentPage } from 'stores/currentpage'
import { useTableData } from 'stores/tabledata'
import { useListDate } from 'stores/listdate'
import { date, useQuasar } from 'quasar'
import { decrypt, encryptXCha, decryptXCha } from 'assets/js/shield'
import { hash } from 'assets/js/OCBO'
import { useListStatus } from 'stores/liststatus'
import { useListSumPaid } from 'stores/listsumpaid'
import { useDivision } from 'stores/division'
import { useListOPCount } from 'stores/listopcount'
import { useListPermitCount } from 'stores/listpermitcount'
import BackButton from 'components/BackButton.vue'

const router = useRouter()
const quasar = useQuasar()

const _currentpage = useCurrentPage()
const _tabledata = useTableData()
const _listdate = useListDate()
const _liststatus = useListStatus()
const _listsumpaid = useListSumPaid()
const _division = useDivision()
const _listopcount = useListOPCount()
const _listpermitcount = useListPermitCount()

const properDate = date.formatDate(_listdate.getValue, 'MMMM DD, YYYY')

const detectWeekend = (date) => {}

const rowCount = ref(Object.values(_tabledata.value).map((arr) => arr.length)[0])
// const opReleasedCount = ref(
//   _liststatus.allStatus.filter((stat) =>
//     ['ORDER OF PAYMENT RELEASED', 'OR NUMBER VERIFIED', 'RECEIVED FOR PROCESSING', 'FOR BUILDING OFFICIAL APPROVAL', 'PERMIT APPROVE AND READY FOR RELEASE', 'PERMIT ALREADY RELEASE'].includes(stat)
//   ).length
// )

const opReleasedCount = ref(0)
const opPercentageValue = ref(0)
const permitPercentageValue = ref(0)

const permitReleasedCount = ref(_liststatus.allStatusArray.filter((stat) => stat === 'PERMIT ALREADY RELEASE').length)

const countOPReleased = async () => {
  let filterArray
  let newArray
  if (_division.isBuilding) {
    filterArray = ['ORDER OF PAYMENT RELEASED', 'OR NUMBER VERIFIED', 'RECEIVED FOR PROCESSING', 'FOR BUILDING OFFICIAL APPROVAL', 'PERMIT APPROVE AND READY FOR RELEASE', 'PERMIT ALREADY RELEASE']
    newArray = _liststatus.allStatusArray.filter((item) => filterArray.includes(item))
  } else if (_division.isOccupancy) {
    filterArray = [
      /ORDER OF PAYMENT RELEASE FOR BUREAU OF FIRE/,
      /OCCUPANCY ORDER OF PAYMENT PAID/,
      /OCCUPANCY OFFICIAL RECEIPT VALIDATED/,
      /FOR OCCUPANCY PERMIT RECOMMENDING APPROVAL/,
      /FOR OCUPANCY CERTIFICATE OF ELECTRICAL INSPECTION GENERATION/,
      /FOR OCCUPANCY PERMIT GENERATION/,
      /FOR OCCUPANCY RELEASING/,
      /OCCUPANCY PERMIT RELEASED TO/,
    ]
    newArray = _liststatus.allStatusArray.filter((item) => filterArray.some((filter) => filter.test(item)))
  } else if (_division.isElectrical) {
    filterArray = [
      /ELECTRICAL ORDERPAYMENT RELEASED/,
      /FOR ELECTRICAL OFFICIAL RECEIPT VALIDATION/,
      /FOR ELECTRICAL PERMIT APPROVAL/,
      /FOR ELECTRICAL PERMIT RELEASING/,
      /ELECTRICAL PERMIT RELEASED TO/,
      /ELECTRICAL PERMIT SENT TO/,
    ]
    newArray = _liststatus.allStatusArray.filter((item) => filterArray.some((filter) => filter.test(item)))
  }
  opReleasedCount.value = newArray.length
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

const gotoHome = () => {
  updatePage('/')
}

const opPercentage = () => {
  const division = _listopcount.getValue / rowCount.value
  const percentage = division * 100
  opPercentageValue.value = percentage.toFixed(0)
}

const permitPercentage = () => {
  const division = _listpermitcount.getValue / rowCount.value
  const percentage = division * 100
  permitPercentageValue.value =  percentage.toFixed(0)
}

;(async () => {
  loadCurrentPage()
  await countOPReleased()
})()
</script>

<style lang="sass" scoped>
.title-area
  display: flex
  flex-direction: column
  flex-wrap: wrap
  justify-content: center
  align-items: center
  align-content: center
  padding: 1rem 0 0 0
  color: $text
  font-family: 'Roboto'
  font-weight: bold

  & .main
    font-size: 1.2rem

  & .submain
    font-size: 1.1rem

  & .date
    font-size: 1.4rem
    margin: 0 0 2rem 0
.grid
  display: flex
  flex-direction: column
  flex-wrap: wrap
  justify-content: center
  align-items: center
  align-content: center
  text-align: center

// .left
//   display: flex
//   flex-direction: column
//   flex-wrap: wrap
//   justify-content: center
//   align-items: center
//   align-content: center
//   text-align: center

.subheader
  font-family: 'Roboto'
  font-weight: bold
  width: 100%
  text-align: center
  font-size: 1.2rem
  color: $text

.header
  font-family: 'Roboto'
  font-weight: bold
  width: 100%
  text-align: center
  font-size: 1.4rem
  color: $text
  padding: 0 0 1rem 0

.table-contain
  height: 500px
  overflow-y: auto

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

// .summary--count
//   display: flex
//   flex-direction: column
//   flex-wrap: wrap
//   justify-content: center
//   align-items: center
//   align-content: center
//   // border: 1px solid white
//   border-radius: 2rem
//   padding: 2rem 3rem
//   margin: 0 0 1rem 0
//   background-color: $button2

.summary--count2
  display: flex
  flex-direction: column
  flex-wrap: wrap
  justify-content: center
  align-items: center
  align-content: center
  font-family: 'Roboto'
  // width: 9rem
  // height: 2rem
  border-radius: 2rem
  padding: 1.6rem 2.2rem
  margin: 0 0 1rem 0
  background-color: $yellow
  color: $darktext
  opacity: 0.8
  // margin: 1rem 0
  border: 1px solid $darktext

  & .label
    font-size: 1rem
    // margin: auto
  & .content
    font-size: 1.8rem
    font-weight: bold

.table-data-mobile
  padding: 1rem 3.2rem
  margin: 0 0 1rem 0
  border: 1px solid $text
  border-radius: 1rem

  & .application
    font-size: 1.2rem
    font-weight: bold
    border: 1px solid $yellow
    border-radius: 1rem
    background-color: $yellow
    color: $darktext
    padding: 0.5rem 1rem
    margin: 0 0 1rem 0


  & .permit
    font-size: 1rem

  & .date
    font-size: 1.1rem
    color: $darktext
    border: 1px solid $darktext
    padding: 0.5rem 1rem
    background-color: $yellow
    border-radius: 1rem

@media screen and (min-width: 1024px)
  .title-area
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: flex-start
    align-items: center
    align-content: center
    gap: 1rem
    margin: 0 0 1rem 1rem

    & .main
      font-size: 2rem

    & .submain
      font-size: 1.8rem

    & .date
      font-size: 2rem
      margin: 0

  .grid
    display: grid
    grid-template-columns: 0.3fr 1.7fr
    grid-template-rows: 1.7fr 0.3fr
    gap: 0px 1rem
    grid-template-areas: "bar-area table-area" "bar-area button-area"
    max-width: 1920px

  .bar-area
    grid-area: bar-area
    display: flex
    flex-direction: column
    flex-wrap: wrap
    justify-content: center
    align-items: center
    align-content: center
    text-align: center

  .table-area
    grid-area: table-area
    justify-self: start
    align-self: start

  .button-area
    grid-area: button-area

  .subheader
    font-family: 'Roboto'
    font-weight: bold
    width: 100%
    text-align: center
    font-size: 1.4rem
    color: $text
  .header
    font-family: 'Roboto'
    font-weight: bold
    width: 100%
    text-align: center
    font-size: 1.6rem
    color: $text
    padding: 0 0 1rem 0

  .table-contain
    height: 600px
    overflow-y: auto

  .table-custom thead
    background-color: transparent
    font-size: 0.9rem

  .table-custom th
    padding: 1rem 1rem 1.8rem 1rem

  .table-custom tbody
    padding: 1rem

  .table-custom td
    padding: 1rem
    font-size: 0.9rem
    border-bottom: 1px solid $text
    text-align: left

  .summary--count2
    display: flex
    flex-direction: column
    flex-wrap: wrap
    justify-content: center
    align-items: center
    align-content: center
    font-family: 'Roboto'
    // width: 9rem
    // height: 2rem
    border-radius: 2rem
    padding: 1.6rem 2.2rem
    margin: 0 0 1rem 0
    background-color: $yellow
    color: $darktext
    opacity: 0.8
    // margin: 1rem 0
    border: 1px solid $darktext

    & .label
      font-size: 0.9rem
      // margin: auto
    & .content
      font-size: 1.6rem
      font-weight: bold

@media screen and (min-width: 1440px)
  .left
    display: flex
    flex-direction: column
    flex-wrap: wrap
    justify-content: center
    align-items: center
    align-content: center
    text-align: center

  .subheader
    font-family: 'Roboto'
    font-weight: bold
    width: 100%
    text-align: center
    font-size: 1.4rem
    color: $text
  .header
    font-family: 'Roboto'
    font-weight: bold
    width: 100%
    text-align: center
    font-size: 1.6rem
    color: $text
    padding: 0 0 1rem 0

  .summary--count2
    display: flex
    flex-direction: column
    flex-wrap: wrap
    justify-content: center
    align-items: center
    align-content: center
    font-family: 'Roboto'
    // width: 9rem
    // height: 2rem
    border-radius: 2rem
    padding: 1.6rem 2.2rem
    margin: 0 0 1rem 0
    background-color: $yellow
    color: $darktext
    font-size: 1.1rem
    opacity: 0.8
    // margin: 1rem 0
    border: 1px solid $darktext

    & .label
      font-size: 1.1rem
      // margin: auto
    & .content
      font-size: 2rem
      font-weight: bold

  .table-contain
    height: 600px
    overflow-y: auto

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
</style>
