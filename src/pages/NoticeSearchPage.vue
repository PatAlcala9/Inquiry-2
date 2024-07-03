<template lang="pug">

q-page.page(padding)
  section(v-if="$q.screen.width <= 899")
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

    div.back-button.full-width.column.wrap.justify-center.items-center.content-center
      q-btn.button-back2(rounded class="button-back" label="Back" @click="gotoHome")

      //- div(v-if="_tabledata.value.result5[0] !== ''").owner-group.full-width.column.no-wrap.justify-center.items-center.content-start
      //-   label.owner-label OR:
      //-   br
      //-   label.owner-name {{_tabledata.value.result5[0]}}

    div.table-title-group-mobile.fit.row.wrap.justify-around.items-start.content-start
      span.table-title Inspections

    div.table-data-group-mobile.fit.column.wrap.justify-center.items-center.content-center.text-center(v-for="(item, index) in _tabledata.value.result" :key="item")
      span.table-data-mobile-desc {{decrypt(item)}}
      span.table-data-mobile-label Date In
      span.table-data-mobile-info {{date.formatDate(decrypt(_tabledata.value.result2[index]), 'MMMM D, YYYY')}}
      span.table-data-mobile-label Day Out
      span.table-data-mobile-info {{date.formatDate(decrypt(_tabledata.value.result3[index]), 'MMMM D, YYYY')}}
      span.table-data-mobile-info.last {{decrypt(_tabledata.value.result4[index]) === '1' || 1 ? 'ACCOMPLISHED' : 'UNACCOMPLISHED'}}

  //- section.table-area.full-width.column.content-center.items-center.justify-center(v-else)
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

      section.button-grid
        q-btn.button-back2(rounded label="Back" @click="gotoHome")

    section.right
      div.table-limit
        table.table-custom
          thead
            tr
              th Description
              th Date In
              th Date Return
              th(v-if="_division.getValue !== 'Electrical'") Accomplished
          tbody
            tr(v-for="(item, index) in _tabledata.value.result" :key="item")
              td {{decrypt(item)}}
              td {{date.formatDate(decrypt(_tabledata.value.result2[index]), 'MMMM D, YYYY')}}
              td {{date.formatDate(decrypt(_tabledata.value.result3[index]), 'MMMM D, YYYY')}}
              td(v-if="_division.getValue !== 'Electrical'") {{decrypt(_tabledata.value.result4[index]) === '1' || 1 ? 'YES' : 'NO'}}

    //- table.table-custom
    //-   thead
    //-     tr
    //-       th Description
    //-       th Date In
    //-       th Date Return
    //-       th(v-if="_division.getValue !== 'Electrical'") Accomplished
    //-   tbody
    //-     tr(v-for="(item, index) in _tabledata.value.result" :key="item")
    //-       td {{decrypt(item)}}
    //-       td {{date.formatDate(decrypt(_tabledata.value.result2[index]), 'MMMM D, YYYY')}}
    //-       td {{date.formatDate(decrypt(_tabledata.value.result3[index]), 'MMMM D, YYYY')}}
    //-       td(v-if="_division.getValue !== 'Electrical'") {{decrypt(_tabledata.value.result4[index]) === '1' ? 'YES' : 'NO'}}

  //- div.full-width.column.no-wrap.justify-center.items-center.content-start
  //-   q-btn.button(rounded @click="gotoHome") Back

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
import { useCurrentPage } from 'stores/currentpage'
import { date } from 'quasar'
import { decrypt } from 'assets/js/shield'

const router = useRouter()
const _applicationno = useApplicationNo()
let _tabledata = useTableData
const _ownername = useOwnername()
const _owneraddress = useOwneraddress()
const _currentpage = useCurrentPage()
const _division = useDivision()

// const controller = new AbortController()

const updatePage = (page) => {
  _currentpage.updateValue(page)
  router.push(page)
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
  font-family: 'Roboto'
  font-weight: bold
  font-size: 1.4rem
  padding: 2rem

.table-data-mobile-desc
  font-family: 'Roboto'
  font-weight: bold
  font-size: 0.9rem
  color: $text
  background-color: $button
  width: 60%
  padding: 0.3rem
  text-align: center
  border-radius: 1rem

.table-data-mobile-label
  font-family: 'Roboto'
  font-weight: bold
  font-size: 0.9rem
  color: $text

.table-data-mobile-info
  font-family: 'Roboto'
  font-weight: bold
  font-size: 1.2rem
  color: $text
  text-align: center

.table-area
  margin-top: 2rem

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
    gap: 3rem 0px
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
</style>
