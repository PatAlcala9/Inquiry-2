<template lang="pug">

q-page.page(padding)
  section.full-width.column.wrap.justify-center.items-center.content-center
    h1.title List of Received Application
    span.subheader on
    span.header {{ properDate }}
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
          //- td {{_tabledata.value.result6[index]}}

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
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useListType } from 'stores/listtype'
import { useDivision } from 'stores/division'
import { useCurrentPage } from 'stores/currentpage'
import { useTableData } from 'stores/tabledata'
import { useListYear } from 'stores/listyear'
import { useListDate } from 'stores/listdate'
import { ref } from 'vue'
import { date } from 'quasar'
import { decrypt } from 'assets/js/shield'

const router = useRouter()
// const quasar = useQuasar()

let _listtype = useListType
let _division = useDivision
let _currentpage = useCurrentPage
let _tabledata = useTableData
let _listyear = useListYear
let _listdate = useListDate

const properDate = date.formatDate(_listdate.value, 'MMMM DD, YYYY')

const detectWeekend = (date) => {}

const updatePage = (page) => {
  _currentpage.value = page
  router.push(page)
}

const gotoHome = () => {
  updatePage('/')
}
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
  padding: 0 0 2rem 0

.table-custom
  height: 50px
  overflow: hidden

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
    padding: 0 0 2rem 0
</style>
