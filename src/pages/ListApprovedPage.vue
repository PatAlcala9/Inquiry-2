<template lang="pug">

q-page.page(padding)
  section.full-width.column.wrap.justify-center.items-center.content-center
    span.title List of Approved {{ _division.getValue }} Permits
    span.subheader on
    span.header {{ properDate }}

    section.fit.row.wrap.justify-between.items-center.content-center
      div.summary--count
        span.label Total Count
        span.content {{ rowCount }}

    //-   div.summary--count
    //-     span.label Order of Payment Released
    //-     span.content {{ _listopcount.getValue }}

    //-   div.summary--count
    //-     span.label Permit Released
    //-     span.content {{ _listpermitcount.getValue }}

    //-   div.summary--count
    //-     span.label Total Amount
    //-     span.content &#8369; {{ Intl.NumberFormat('en-US').format(_listsumpaid.getTotal) }}

    section.table-contain
      table.table-custom
        thead
          tr
            th Application No.
            th Owner's Name
            th Location
            th Building Permit
            th Released Date
        tbody
          tr(v-for="(item, index) in _tabledata.value.result" :key="item")
            td {{item}}
            td {{_tabledata.value.result2[index]}}
            td {{ _tabledata.value.result3[index].length !== 0 ? `BLOCK ${_tabledata.value.result3[index]} ` : null}} {{_tabledata.value.result4[index].length !== 0 ? `LOT _tabledata.value.result4[index] ` : null}} {{_tabledata.value.result5[index]}}
            td {{_tabledata.value.result6[index]}}
            td {{date.formatDate(_tabledata.value.result7[index], 'MMMM DD, YYYY')}}

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
import { date } from 'quasar'
import { decrypt } from 'assets/js/shield'
import { useListStatus } from 'stores/liststatus'
import { useListSumPaid } from 'stores/listsumpaid'
import { useDivision } from 'stores/division'
import { useListOPCount } from 'stores/listopcount'
import { useListPermitCount } from 'stores/listpermitcount'

const router = useRouter()

const _currentpage = useCurrentPage()
let _tabledata = useTableData
const _listdate = useListDate()
let _liststatus = useListStatus()
let _listsumpaid = useListSumPaid()
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
  _currentpage.updateValue(page)
  router.push(page)
}

const gotoHome = () => {
  updatePage('/')
}

;(async () => {
  // await countOPReleased()
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

.summary--count
  display: flex
  flex-direction: column
  flex-wrap: wrap
  justify-content: center
  align-items: center
  align-content: center
  // border: 1px solid white
  border-radius: 2rem
  padding: 2rem 3rem
  margin: 0 0 1rem 0
  background-color: $button2

  & .label
    font-size: 1rem
    // margin: auto
  & .content
    font-size: 2.8rem

@media screen and (min-width: 1023px)
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
</style>
