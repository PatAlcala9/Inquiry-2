<template lang="pug">

q-page.page(padding)
  section
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
          td {{item}}
          td {{_tabledata.value.result2[index]}}
          td {{_tabledata.value.result3[index]}}
          td {{_tabledata.value.result4[index]}}
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

const router = useRouter()
// const quasar = useQuasar()

let _listtype = useListType
let _division = useDivision
let _currentpage = useCurrentPage
let _tabledata = useTableData
let _listyear = useListYear
let _listdate = useListDate

const updatePage = (page) => {
  _currentpage.value = page
  router.push(page, () => {})
}

const gotoHome = () => {
  updatePage('/')
}
</script>
