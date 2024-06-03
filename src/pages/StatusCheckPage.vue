<template lang="pug">

q-page.page(padding)
  section.page-title-group
    div.owner-group.full-width.column.no-wrap.justify-center.items-center.content-start
        label.owner-label Application Number:
        br
        label.owner-name.secondary-title {{_applicationno.getValue}}
    div.owner-group.full-width.column.no-wrap.justify-center.items-center.content-start
        label.owner-label.light Owner's Name:
        br
        label.owner-name.secondary-title {{ownername}}
    div.address-group.full-width.column.no-wrap.justify-center.items-center.content-start
        label.address-label.light Address:
        br
        label.address-name.secondary-title {{address}}
    div.address-group.full-width.column.no-wrap.justify-center.items-center.content-start
        label.address-label.light Latest Status:
        br
        label.address-name.secondary-title {{latestStatus}}

  div.button-back-area.full-width.column.wrap.justify-center.items-center.content-center
    q-btn.button-back(rounded label="Back" @click="gotoHome")

  div.table-title-group-mobile.fit.row.wrap.justify-around.items-start.content-start
    span Status Breakdown

  section(v-if="$q.screen.width <= 899")
    section
      div.table-data-group-mobile.fit.column.wrap.justify-center.items-center.content-center(v-for="(item, index) in tableData.result" :key="item")
        span.table-data-mobile-date {{decrypt(item).toUpperCase()}}
        span.table-data-mobile-status.last {{decrypt(tableData.result2[index]).toUpperCase()}}

  section(v-else)
    section.table-area.full-width.column.content-center.items-center.justify-center
      table.table-custom
        thead
          tr
            th Date
            th Status
        tbody
          tr(v-for="(item, index) in tableData.result" :key="item")
            td {{decrypt(item)}}
            td {{decrypt(tableData.result2[index])}}
            //- td {{tableData.result2[index]}}

  div.button-area.full-width.column.no-wrap.justify-center.items-center.content-start
  //-   q-btn(rounded class="button" label="Back" @click="gotoHome")

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
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useApplicationNo } from 'stores/applicationno'
import { useSearchValue } from 'stores/searchvalue'
// import { useDivision } from 'stores/division'
import { useTableData } from 'stores/tabledata'
import { useOwnername } from 'stores/ownername'
import { useOwneraddress } from 'stores/owneraddress'
import { useLatestStatus } from 'stores/lateststatus'
import { useCurrentPage } from 'stores/currentpage'
import { decrypt } from 'assets/js/shield'

const router = useRouter()
const _applicationno = useApplicationNo()
const _searchvalue = useSearchValue()
// let _division = useDivision()
let _tabledata = useTableData
const _ownername = useOwnername()
const _owneraddress = useOwneraddress()
const _lateststatus = useLatestStatus()
const _currentpage = useCurrentPage()

// const controller = new AbortController()

let ownername = ref(_ownername.getValue)
let address = ref(_owneraddress.getValue)

let tableData = ref(_tabledata.value)
let latestStatus = ref(_lateststatus.getValue)
let ready = ref(null)

const gotoHome = () => {
  // controller.abort()
  updatePage('/')
  // window.location.reload()
}

const updatePage = (page) => {
  _currentpage.updateValue(page)
  router.push(page)
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
  font-size: 1rem
  color: #ffffff

.address-label
  @extend .owner-label

.owner-name
  font-size: 1.2rem
  margin-top: -0.5rem
  text-align: center

.address-name
  @extend .owner-name

.back-btn
  width: 150px
  margin-top: 1.5em

.fetching
  font-family: "Lexend"
  width: 100%
  text-align: center
  color: #ffffff

.button
  width: 100%
  margin-bottom: 1rem

.light
  font-family: "Lexend"

.table-area
  margin-top: 2rem

.table-title-group
  margin-top: 2rem
  margin-bottom: 2rem
  padding-left: 4rem
  padding-right: 4rem
  font-family: "LexendBold"
  font-size: 1.2rem
  color: $text

.table-title-group-mobile
  margin: 2rem 0 1.5rem 0
  padding-left: 1rem
  padding-right: 1rem
  font-family: "LexendBold"
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
  font-family: "Lexend"
  font-size: 0.9rem
  color: #0f3057
  padding: 0.3rem
  text-align: center
  border: 1px solid #0f3057
  width: 50%
  background-color: rgba(255,255,255,0.8)

.table-data-mobile-date
  font-family: "LexendBold"
  font-size: 0.9rem
  color: $text
  background-color: $button
  width: 60%
  padding: 0.3rem
  text-align: center
  border-radius: 1rem

.table-data-mobile-status
  font-family: "LexendBold"
  font-size: 1rem
  color: $text
  text-align: center
  margin-bottom: 1rem

.button-area
  padding-bottom: 2rem

.button-back-area
  padding-top: 2rem

// @media screen and (min-width: 400px)
//   .button
//     margin: 2rem
//     width: 90%

@media screen and (min-width: 900px)
  .button
    width: 250px
    margin: 2rem 0 0 0

  // .owner-name
  //   font-family: 'LexendBold'
  //   font-size: 2rem
  // .address-name
  //   @extend .owner-name
</style>
