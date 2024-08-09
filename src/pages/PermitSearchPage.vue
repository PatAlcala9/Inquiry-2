<template lang="pug">

q-page.page(padding)
  section(v-if="$q.screen.width <= 767")
    section.page-title-group
      div.owner-group.full-width.column.no-wrap.justify-center.items-center.content-start
        span.page-label Application Number:
        span.page-info--primary {{_applicationno.getValue}}
      div.owner-group.full-width.column.no-wrap.justify-center.items-center.content-start
        span.page-label Owner's Name:
        span.page-info {{_ownername.getValue}}
      div.address-group.full-width.column.no-wrap.justify-center.items-center.content-start
        span.page-label Address:
        span.page-info {{_owneraddress.getValue}}
      div.address-group.full-width.column.no-wrap.justify-center.items-center.content-start
        span.page-label Number of Permits:
        span.page-info--primary {{_tabledata.getTable.result.length}}

    div.back-button.full-width.column.wrap.justify-center.items-center.content-center
      q-btn.button-back2(rounded class="button-back" label="Back" @click="gotoSelection")

    div(v-if="_tabledata.getTable !== null")
        section
          div.table-title-group-mobile.fit.row.wrap.justify-around.items-start.content-start
            span(v-if="_tabledata.getTable.result.length > 1") Permits
            span(v-else) Permit

          div.table-data-group-mobile.fit.column.wrap.justify-center.items-center.content-center.text-center(v-for="(item, index) in _tabledata.getTable.result" :key="item")
            span.table-data-mobile-desc.last(v-if="_tabledata.getTable.result4 !== undefined") {{decrypt(item)}}
            span.table-data-mobile-desc(v-else) {{decrypt(item)}}
            span.table-data-mobile-info(v-if="_tabledata.getTable.result4 !== undefined") Block {{decrypt(_tabledata.getTable.result2[index])}} Lot {{decrypt(_tabledata.getTable.result3[index])}}
            span.table-data-mobile-info.last(v-if="_tabledata.getTable.result4 !== undefined") {{decrypt(_tabledata.getTable.result4[index])}}

    div(v-else)
      section.flex.flex-center
        span.empty-table-message No Permit Found

  section.page-pc(v-else)
    section.page-title-group.left
      div.application
        span.page-info--primary {{_applicationno.getValue}}

      section.details
        div.owner-group.full-width.column.wrap.justify-start.items-start.content-start
          span.page-label Owner's Name:
          span.page-info {{_ownername.getValue}}
        div.address-group.full-width.column.wrap.justify-start.items-start.content-start
          span.page-label Address:
          sapn.page-info {{_owneraddress.getValue}}
        div.address-group.full-width.column.no-wrap.justify-start.items-start.content-start
          span.page-label Number of Permits:
          span.page-info {{_tabledata.getTable.result.length}}

      section.button-grid
        q-btn.button-back2(rounded label="Back" @click="gotoSelection")

    section.right
      div.table-limit(v-if="_tabledata.value !== null")
        table.table-custom
          thead
            tr
              th(v-if="_tabledata.getTable.result.length > 1") Permits
              th(v-else) Permit
              th(v-if="_tabledata.getTable.result4 !== undefined") Block
              th(v-if="_tabledata.getTable.result4 !== undefined") Lot
              th(v-if="_tabledata.getTable.result4 !== undefined") Address
          tbody
            tr(v-for="(item, index) in _tabledata.getTable.result" :key="item")
              td {{decrypt(item)}}
              td(v-if="_tabledata.getTable.result4 !== undefined") {{decrypt(_tabledata.getTable.result2[index])}}
              td(v-if="_tabledata.getTable.result4 !== undefined") {{decrypt(_tabledata.getTable.result3[index])}}
              td(v-if="_tabledata.getTable.result4 !== undefined") {{decrypt(_tabledata.getTable.result4[index])}}

      div(v-else)
        section.flex.flex-center
          span.empty-table-message No Permit Found
    //- section.table-area.full-width.column.content-center.items-center.justify-center
    //-   table.table-custom
    //-     thead
    //-       tr
    //-         th(v-if="_tabledata.getTable.result.length > 1") Permits
    //-         th(v-else) Permit
    //-         th(v-if="_tabledata.getTable.result4 !== undefined") Block
    //-         th(v-if="_tabledata.getTable.result4 !== undefined") Lot
    //-         th(v-if="_tabledata.getTable.result4 !== undefined") Address
    //-     tbody
    //-       tr(v-for="(item, index) in _tabledata.getTable.result" :key="item")
    //-         td {{decrypt(item)}}
    //-         td(v-if="_tabledata.getTable.result4 !== undefined") {{decrypt(_tabledata.getTable.result2[index])}}
    //-         td(v-if="_tabledata.getTable.result4 !== undefined") {{decrypt(_tabledata.getTable.result3[index])}}
    //-         td(v-if="_tabledata.getTable.result4 !== undefined") {{decrypt(_tabledata.getTable.result4[index])}}



  //- div.button-area.full-width.column.no-wrap.justify-center.items-center.content-start
  //-   q-btn.button-back2(rounded label="Back" @click="gotoHome")

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
import { useDivision } from 'stores/division'
import { useTableData } from 'stores/tabledata'
import { useOwnername } from 'stores/ownername'
import { useOwneraddress } from 'stores/owneraddress'
import { useLatestStatus } from 'stores/lateststatus'
import { useCurrentPage } from 'stores/currentpage'
import { useListYear } from 'stores/listyear'
import { decrypt } from 'assets/js/shield'

const router = useRouter()
const _applicationno = useApplicationNo()
const _searchvalue = useSearchValue()
// const _division = useDivision()
const _tabledata = useTableData()
const _ownername = useOwnername()
const _owneraddress = useOwneraddress()
// const _lateststatus = useLatestStatus()
const _currentpage = useCurrentPage()
// const _listyear = useListYear()

// const controller = new AbortController()

const gotoHome = () => {
  // controller.abort()
  updatePage('/')
  // window.location.reload()
}

const gotoSelection = () => {
  updatePage('selection')
}

const updatePage = (page) => {
  _currentpage.updateValue(page)
  router.push(page)
}
</script>

<style scoped lang="sass">
label
  font-family: 'Roboto'
  font-weight: bold

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
  font-family: "Roboto"
  width: 100%
  text-align: center
  color: #ffffff

.button
  width: 100%
  margin-bottom: 1rem

.light
  font-family: "Roboto"

.table-area
  margin-top: 2rem

.table-title-group
  margin-top: 2rem
  margin-bottom: 2rem
  padding-left: 4rem
  padding-right: 4rem
  font-family: 'Roboto'
  font-weight: bold
  font-size: 2rem
  color: white

.table-title-group-mobile
  margin: 2rem 0 1.5rem 0
  padding-left: 1rem
  padding-right: 1rem
  font-family: 'Roboto'
  font-weight: bold
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
  font-family: "Roboto"
  font-size: 1.2rem
  color: #0f3057
  padding: 0.3rem
  text-align: center
  border: 1px solid #0f3057
  width: 50%
  background-color: rgba(255,255,255,0.8)

.table-data-mobile-desc
  font-family: 'Roboto'
  font-weight: bold
  font-size: 0.9rem
  color: $darktext
  background-color: $yellow
  width: 60%
  padding: 0.3rem
  text-align: center
  border-radius: 1rem
  border: 1px solid $darktext

.table-data-mobile-info
  font-family: 'Roboto'
  font-weight: bold
  font-size: 1rem
  color: $text
  text-align: center

.button-area
  padding-bottom: 2rem

.empty-table-message
  font-family: 'Roboto'
  font-weight: bold
  color: $yellow
  font-size: 2rem
  padding-top: 3rem
  padding-bottom: 3rem

@media screen and (min-width: 400px)
  .button
    margin: 2rem
    width: 90%

@media screen and (min-width: 1023px)
  .page-pc
    display: grid
    grid-template-columns: 0.6fr 0.4fr
    grid-template-rows: 1fr
    gap: 0px 0px
    grid-template-areas: "left right"
    max-width: 1920px
    margin: 0 auto

  .left
    display: grid
    grid-template-columns: 1fr
    grid-template-rows: 0.1fr 0.8fr 0.1fr
    gap: 2.5rem 0px
    grid-template-areas: "application" "details" "button-grid"
    grid-area: left

  .application
    grid-area: application
    margin: 0 0 2rem 0

  .details
    grid-area: details

  .button-grid
    grid-area: button-grid

  .right
    margin: 2rem 0 0 0
    justify-self: center
    align-self: center
    grid-area: right

  .page-info--primary
    // font-size: 2.8rem
    paddinng: 0
    margin: 0

  .page-label
    opacity: 0.5

  .page-info
    // font-size: 1.8rem
    text-align: left

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

  .table-limit
    height: 800px
    overflow-y: auto

  .button
    width: 250px
    margin: 2rem 0 0 0

  .owner-name
    font-family: 'Roboto'
    font-weight: bold
    font-size: 2rem

  .address-name
    @extend .owner-name
</style>
