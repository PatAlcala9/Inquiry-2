<template lang="pug">

q-page.page(padding)
  section.full-width.column.wrap.justify-center.items-center.content-center
    span.title List of Received Application
    span.subheader on
    span.header {{ properDate }}

    section.fit.row.wrap.justify-between.items-center.content-center
      div.summary--count
        span.label Total Count
        span.content {{ rowCount }}

      div.summary--count
        span.label Order of Payment Released
        span.content {{ opReleasedCount }}

      div.summary--count
        span.label Permit Released
        span.content {{ opReleasedCount }}

      div.summary--count
        span.label Total Amount
        span.content &#8369; {{ Intl.NumberFormat('en-IN').format(totalSum) }}

    section.table-contain
      table.table-custom
        thead
          tr
            th Application No.
            th Owner's Name
            //- th Owner's Address
            th Location
            th Occupancy Type
        tbody
          tr(v-for="(item, index) in _tabledata.value.result" :key="item")
            td {{decrypt(item)}}
            td {{decrypt(_tabledata.value.result2[index])}}
            td {{decrypt(_tabledata.value.result3[index])}}
            td {{decrypt(_tabledata.value.result4[index])}}

  div.back-button.full-width.column.wrap.justify-center.items-center.content-center
    q-btn.button-back(rounded label="Back" @click="gotoHome")
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
import { useRouter } from 'vue-router'
import { useCurrentPage } from 'stores/currentpage'
import { useTableData } from 'stores/tabledata'
import { useListDate } from 'stores/listdate'
import { date } from 'quasar'
import { decrypt } from 'assets/js/shield'
import { useListStatus } from 'stores/liststatus'
import { useListSumPaid } from 'stores/listsumpaid'

const router = useRouter()

let _currentpage = useCurrentPage
let _tabledata = useTableData
let _listdate = useListDate
let _liststatus = useListStatus()
let _listsumpaid = useListSumPaid()

const properDate = date.formatDate(_listdate.value, 'MMMM DD, YYYY')

const detectWeekend = (date) => {}

const rowCount = ref(Object.values(_tabledata.value).map((arr) => arr.length)[0])
const opReleasedCount = ref(_liststatus.allStatus.filter((stat) => stat === 'ORDER OF PAYMENT RELEASED').length)
const permitReleasedCount = ref(_liststatus.allStatus.filter((stat) => stat === 'PERMIT RELEASED').length)
let totalSum = ref(0)

const getTotalSum = () => {
  totalSum.value = _listsumpaid.getTotal
}

const updatePage = (page) => {
  _currentpage.value = page
  router.push(page)
}

const gotoHome = () => {
  updatePage('/')
}

;(() => {
  getTotalSum()
})()
</script>

<style lang="sass" scoped>
.subheader
  font-family: 'LexendBold'
  width: 100%
  text-align: center
  font-size: 1.2rem
  color: $text
.header
  font-family: 'LexendBold'
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
    font-family: 'LexendBold'
    width: 100%
    text-align: center
    font-size: 1.4rem
    color: $text
  .header
    font-family: 'LexendBold'
    width: 100%
    text-align: center
    font-size: 1.6rem
    color: $text
    padding: 0 0 1rem 0
</style>
