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

  div(v-if="_tabledata.value !== null")
    section(v-if="$q.screen.width <= 899")
      section
        div.table-title-group-mobile.fit.row.wrap.justify-around.items-start.content-start
          span(v-if="_tabledata.value.length > 1") Permits
          span(v-else) Permit

        div.table-data-group-mobile.fit.column.wrap.justify-center.items-center.content-center.text-center(v-for="(item, index) in _tabledata.value.result" :key="item")
          span.table-data-mobile-desc.last(v-if="_tabledata.value.result4 !== undefined") {{item}}
          span.table-data-mobile-desc(v-else) {{item}}
          span.table-data-mobile-info(v-if="_tabledata.value.result4 !== undefined") Block {{_tabledata.value.result2[index]}} Lot {{_tabledata.value.result3[index]}}
          span.table-data-mobile-info.last(v-if="_tabledata.value.result4 !== undefined") {{_tabledata.value.result4[index]}}

    section(v-else)
      section.table-area.full-width.column.content-center.items-center.justify-center
        table.table-custom
          thead
            tr
              th(v-if="_tabledata.value.result.length > 1") Permits
              th(v-else) Permit
              th(v-if="_tabledata.value.result4 !== undefined") Block
              th(v-if="_tabledata.value.result4 !== undefined") Lot
              th(v-if="_tabledata.value.result4 !== undefined") Address
          tbody
            tr(v-for="(item, index) in _tabledata.value.result" :key="item")
              td {{item}}
              td(v-if="_tabledata.value.result4 !== undefined") {{_tabledata.value.result2[index]}}
              td(v-if="_tabledata.value.result4 !== undefined") {{_tabledata.value.result3[index]}}
              td(v-if="_tabledata.value.result4 !== undefined") {{_tabledata.value.result4[index]}}

  div(v-else)
    section.flex.flex-center
      span.empty-table-message No Permit Found

  div.button-area.full-width.column.no-wrap.justify-center.items-center.content-start
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
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useApplicationNo } from 'stores/applicationno'
import { useSearchValue } from 'stores/searchvalue'
import { useDivision } from 'stores/division'
import { useTableData } from 'stores/tabledata'
import { useOwnername } from 'stores/ownername'
import { useOwneraddress } from 'stores/owneraddress'
import { useLatestStatus } from 'stores/lateststatus'
import { useCurrentPage } from 'stores/currentpage'
import { useListYear } from 'stores/listyear'

const router = useRouter()
let _applicationno = useApplicationNo
let _searchvalue = useSearchValue
let _division = useDivision
let _tabledata = useTableData
let _ownername = useOwnername
let _owneraddress = useOwneraddress
let _lateststatus = useLatestStatus
let _currentpage = useCurrentPage
let _listyear = useListYear

// const controller = new AbortController()

const gotoHome = () => {
  // controller.abort()
  updatePage('/')
  // window.location.reload()
}

const updatePage = (page) => {
  _currentpage.value = page
  router.push(page, () => {})
}
</script>

<style scoped lang="sass">
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
  font-size: 1.6rem
  margin-top: -1rem
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
  font-size: 2rem
  color: white

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
  font-size: 1.2rem
  color: #0f3057
  padding: 0.3rem
  text-align: center
  border: 1px solid #0f3057
  width: 50%
  background-color: rgba(255,255,255,0.8)

.table-data-mobile-desc
  font-family: "LexendBold"
  font-size: 0.9rem
  color: $text
  background-color: $button
  width: 60%
  padding: 0.3rem
  text-align: center
  border-radius: 1rem

.table-data-mobile-info
  font-family: "LexendBold"
  font-size: 1rem
  color: $text
  text-align: center

.button-area
  padding-bottom: 2rem

.empty-table-message
  font-family: "LexendBold"
  color: yellow
  font-size: 2rem
  padding-top: 3rem
  padding-bottom: 3rem

@media screen and (min-width: 400px)
  .button
    margin: 2rem
    width: 90%

@media screen and (min-width: 900px)
  .button
    width: 250px
    margin: 2rem 0 0 0

  .owner-name
    font-family: 'LexendBold'
    font-size: 2rem

  .address-name
    @extend .owner-name
</style>
