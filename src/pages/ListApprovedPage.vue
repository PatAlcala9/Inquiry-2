<template lang="pug">

q-page.page(padding)
  section.full-width.column.wrap.justify-center.items-center.content-center
    span.title List of Approved {{ _division.getValue }} Permits
    span.subheader on
    span.header {{ properDate }}

    section.fit.row.wrap.justify-center.items-center.content-center
      div.summary--count2
        span.label Total Count
        span.content {{ rowCount }}

    section(v-if="quasar.screen.width <= 767")
      div.table-data-mobile.fit.column.wrap.justify-center.items-center.content-center.text-align(v-for="(item, index) in _tabledata.getTable.result" :key="data")
        span.application {{item}}
        span.permit {{_tabledata.getTable.result6[index]}}
        span.date {{date.formatDate(_tabledata.getTable.result7[index], 'MMMM DD, YYYY')}}

    section.table-contain(v-else)
      table.table-custom
        thead
          tr
            th Application No.
            th Owner's Name
            th Location
            th Building Permit
            th Released Date
        tbody
          tr(v-for="(item, index) in _tabledata.getTable.result" :key="item")
            td {{item}}
            td {{_tabledata.getTable.result2[index]}}
            td {{ _tabledata.getTable.result3[index].length !== 0 ? `BLOCK ${_tabledata.getTable.result3[index]} ` : null}} {{_tabledata.getTable.result4[index].length !== 0 ? `LOT _tabledata.getTable.result4[index] ` : null}} {{_tabledata.getTable.result5[index]}}
            td {{_tabledata.getTable.result6[index]}}
            td {{date.formatDate(_tabledata.getTable.result7[index], 'MMMM DD, YYYY')}}

  div.back-button.full-width.column.wrap.justify-center.items-center.content-center
    q-btn.button-back2(rounded label="Back" @click="gotoHome")
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

const properDate = date.formatDate(_listdate.getValue, 'MMMM YYYY')

const detectWeekend = (date) => {}

const rowCount = ref(Object.values(_tabledata.value).map((arr) => arr.length)[0])
// const opReleasedCount = ref(
//   _liststatus.allStatus.filter((stat) =>
//     ['ORDER OF PAYMENT RELEASED', 'OR NUMBER VERIFIED', 'RECEIVED FOR PROCESSING', 'FOR BUILDING OFFICIAL APPROVAL', 'PERMIT APPROVE AND READY FOR RELEASE', 'PERMIT ALREADY RELEASE'].includes(stat)
//   ).length
// )
const opReleasedCount = ref(0)

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

;(() => {
  loadCurrentPage()
})()
</script>

<style lang="sass" scoped>
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
  font-size: 1.1rem
  opacity: 0.8
  // margin: 1rem 0
  border: 1px solid $darktext
  & .label
    font-size: 0.9rem
    // margin: auto
  & .content
    font-size: 2rem
    font-weight: bold

.table-data-mobile
  padding: 1rem 3.2rem
  margin: 0 0 1rem 0
  border: 1px solid $text
  border-radius: 1rem

  & .application
    font-size: 1.1rem
    font-weight: bold

  & .permit
    font-size: 1.2rem

  & .date
    font-size: 1.1rem
    color: $darktext
    border: 1px solid $darktext
    padding: 0.5rem 1rem
    background-color: $yellow
    border-radius: 1rem


@media screen and (min-width: 1024px)
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
      font-size: 1rem
      // margin: auto
    & .content
      font-size: 2rem
      font-weight: bold
</style>
