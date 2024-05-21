<template lang="pug">

q-page.page(padding)
  section
    div.owner-group.full-width.column.no-wrap.justify-center.items-center.content-start
      label.owner-label Application Number:
      br
      label.owner-name.secondary-title {{_applicationno.value}}
    div.owner-group.full-width.column.no-wrap.justify-center.items-center.content-start
      label.owner-label Owner's Name:
      br
      label.owner-name.secondary-title {{_ownername.value}}
    div.address-group.full-width.column.no-wrap.justify-center.items-center.content-start
      label.address-label Address:
      br
      label.address-name.secondary-title {{_owneraddress.value}}

    div.back-button.full-width.column.wrap.justify-center.items-center.content-center
      q-btn(rounded class="button-back" label="Back" @click="gotoHome")

    //- div(v-if="_tabledata.value.result5[0] !== ''").owner-group.full-width.column.no-wrap.justify-center.items-center.content-start
    //-   label.owner-label OR:
    //-   br
    //-   label.owner-name {{_tabledata.value.result5[0]}}

    section(v-if="$q.screen.width <= 899")
      div.table-title-group-mobile.fit.row.wrap.justify-around.items-start.content-start
        span.table-title Inspections

      div.table-data-group-mobile.fit.column.wrap.justify-center.items-center.content-center.text-center(v-for="(item, index) in _tabledata.value.result" :key="item")
        span.table-data-mobile-desc {{decrypt(item)}}
        span.table-data-mobile-label Date In
        span.table-data-mobile-info {{date.formatDate(decrypt(_tabledata.value.result2[index]), 'MMMM D, YYYY')}}
        span.table-data-mobile-label Day Out
        span.table-data-mobile-info {{date.formatDate(decrypt(_tabledata.value.result3[index]), 'MMMM D, YYYY')}}
        span.table-data-mobile-info.last {{decrypt(_tabledata.value.result4[index]) === '1' ? 'ACCOMPLISHED' : 'UNACCOMPLISHED'}}
        br

    section.table-area.full-width.column.content-center.items-center.justify-center(v-else)
      table.table-custom
        thead
          tr
            th Description
            th Date In
            th Date Return
            th(v-if="_division.value !== 'Electrical'") Accomplished
        tbody
          tr(v-for="(item, index) in _tabledata.value.result" :key="item")
            td {{decrypt(item)}}
            td {{date.formatDate(decrypt(_tabledata.value.result2[index]), 'MMMM D, YYYY')}}
            td {{date.formatDate(decrypt(_tabledata.value.result3[index]), 'MMMM D, YYYY')}}
            td(v-if="_division.value !== 'Electrical'") {{decrypt(_tabledata.value.result4[index]) === '1' ? 'YES' : 'NO'}}

  //- div.full-width.column.no-wrap.justify-center.items-center.content-start
  //-   q-btn.button(rounded @click="gotoHome") Back

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
import { useApplicationNo } from 'stores/applicationno'
import { useSearchValue } from 'stores/searchvalue'
import { useDivision } from 'stores/division'
import { useTableData } from 'stores/tabledata'
import { useOwnername } from 'stores/ownername'
import { useOwneraddress } from 'stores/owneraddress'
import { useCurrentPage } from 'stores/currentpage'
import { date } from 'quasar'
import { decrypt } from 'assets/js/shield'

const router = useRouter()
let _applicationno = useApplicationNo
let _tabledata = useTableData
let _ownername = useOwnername
let _owneraddress = useOwneraddress
let _currentpage = useCurrentPage
let _division = useDivision

// const controller = new AbortController()

const updatePage = (page) => {
  _currentpage.value = page
  router.push(page, () => {})
}

const gotoHome = () => {
  // controller.abort();
  updatePage('/')
  // window.location.reload()
}
</script>

<style lang="sass" scoped>
label
  font-family: 'LexendBold'

.owner-group
  padding-bottom: 2em

.address-group
  @extend .owner-group

.owner-label
  font-size: 1.2rem
  color: #ffffff

.address-label
  @extend .owner-label

.owner-name
  font-family: 'LexendBold'
  font-size: 1.6rem
  margin-top: -1rem
  text-align: center

.address-name
  @extend .owner-name

.table-title
  font-family: 'LexendBold'
  font-size: 1.4rem
  padding: 2rem

.table-data-mobile-desc
  font-family: "LexendBold"
  font-size: 0.9rem
  color: $text
  background-color: $button
  width: 60%
  padding: 0.3rem
  text-align: center
  border-radius: 1rem

.table-data-mobile-label
  font-family: "LexendBold"
  font-size: 0.9rem
  color: $text

.table-data-mobile-info
  font-family: "LexendBold"
  font-size: 1.2rem
  color: $text
  text-align: center



.table-area
  margin-top: 2rem


</style>
