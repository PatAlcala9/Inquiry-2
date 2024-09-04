<template lang="pug">

q-page.page(padding)
  PageTitle(text="Order of Payment")
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
        span.page-label Total Amount:
        span.page-info--primary
          b &#8369; &#0032;
          a {{Intl.NumberFormat('en-US').format(getTotal()) }}

    div.back-button.full-width.column.wrap.justify-center.items-center.content-center
      BackButton(text="Back" @click="gotoSelection")


      //- div(v-if="_tabledata.getTable.result5[0] !== ''").owner-group.full-width.column.no-wrap.justify-center.items-center.content-start
      //-   label.owner-label OR:
      //-   br
      //-   label.owner-name {{_tabledata.getTable.result5[0]}}

    section(v-if="_tabledata.getTable.result.length > 0")
      div.table-title-group-mobile.fit.row.wrap.justify-around.items-start.content-start
        span.table-title Order of Payment

      div.table-data-group-mobile.fit.column.wrap.justify-center.items-center.content-center.text-center(v-for="(item, index) in _tabledata.getTable.result" :key="item")
        span.table-data-mobile-desc {{decrypt(item)}}
        span.table-data-mobile-amount
          b &#8369; &#0032;
          a {{Intl.NumberFormat('en-US').format(decrypt(_tabledata.getTable.result2[index]))}}
        span.table-data-mobile-paid.last {{decrypt(_tabledata.getTable.result3[index]) === '1' ? 'PAID' : 'UNPAID'}}

    section(v-else)
      div.table-title-group-mobile.fit.row.wrap.justify-around.items-start.content-start
        span.table-title No Order of Payment Found

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
        div.address-group.full-width.column.wrap.justify-start.items-start.content-start
          span.page-label Total Amount:
          span.page-info
            b &#8369; &#0032;
            a {{Intl.NumberFormat('en-US').format(getTotal()) }}
        //- div.address-group.full-width.column.wrap.justify-start.items-start.content-start
        //-   span.page-label Latest Status:
        //-   span.page-info {{latestStatus}}

      section.button-grid
        //- q-btn.button-back2(rounded label="Back" @click="gotoSelection")
        BackButton(text="Back" @click="gotoSelection")

    section.right(v-if="_tabledata.getTable.result.length > 0")
      div.table-limit
        table.table-custom
          thead
            tr
              th Description
              th Amount
              th Paid
          tbody
            tr(v-for="(item, index) in _tabledata.getTable.result" :key="item")
              td {{decrypt(item)}}
              td
                b &#8369; &#0032;
                a {{Intl.NumberFormat('en-US').format(decrypt(_tabledata.getTable.result2[index]))}}
              td {{decrypt(_tabledata.getTable.result3[index]) === '1' ? 'YES' : 'NO'}}

    section.right(v-else)
      div.box
        span No Order of Payment Found

  //- section.table-area.full-width.column.content-center.items-center.justify-center(v-else)
    //- table.table-custom
    //-   thead
    //-     tr
    //-       th Description
    //-       th Amount
    //-       th Paid
    //-   tbody
    //-     tr(v-for="(item, index) in _tabledata.getTable.result" :key="item")
    //-       td {{decrypt(item)}}
    //-       td &#8369; {{Intl.NumberFormat('en-US').format(decrypt(_tabledata.getTable.result2[index]))}}
    //-       td {{decrypt(_tabledata.getTable.result3[index]) === '1' ? 'YES' : 'NO'}}

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
import { decrypt, encryptXCha, decryptXCha } from 'assets/js/shield'
import { hash } from 'assets/js/OCBO'
import { useQuasar } from 'quasar'
import PageTitle from 'components/PageTitle.vue'
import BackButton from 'components/BackButton.vue'

const router = useRouter()
const quasar = useQuasar()
const _applicationno = useApplicationNo()
const _tabledata = useTableData()
const _ownername = useOwnername()
const _owneraddress = useOwneraddress()
const _currentpage = useCurrentPage()

// const controller = new AbortController()

// console.log('result', decrypt(_tabledata.getTable.result2.map(num).reduce((acc, curr) => acc + curr, 0)))
// const a = _tabledata.getTable.result2[0].reduce((acc, curr) => decrypt(acc) + decrypt(curr), 0)

const getTotal = () => {
  let total = 0
  for (let i = 0; i < _tabledata.getTable.result2.length; i++) {
    total = total + parseFloat(decrypt(_tabledata.getTable.result2[i]))
  }
  return total
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
  // controller.abort();
  updatePage('/')
  // window.location.reload()
}

const gotoSelection = () => {
  updatePage('selection')
}

;(() => {
  loadCurrentPage()
})()
</script>

<style lang="sass" scoped>
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

.table-title
  font-family: 'Roboto'
  font-weight: bold
  font-size: 1.4rem
  padding: 2rem

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

.table-data-mobile-amount
  // font-family: 'LexendBold'
  // font-size: 1.6rem
  // color: $yellow
  font-family: 'Roboto'
  font-weight: bold
  font-size: 1.6rem
  color: $text
  text-align: center

.table-data-mobile-paid
  font-family: 'Roboto'
  font-weight: bold
  font-size: 1rem
  color: $text
  text-align: center

.table-area
  margin-top: 2rem

.page-label
  opacity: 0.8

@media screen and (min-width: 768px)
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
    grid-template-rows: 0.1fr 0.7fr 0.1fr
    gap: 1rem 0px
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
    font-size: 0.9rem
    border-bottom: 1px solid $text

  .table-limit
    height: 800px
    overflow-y: auto

  .button
    width: 250px
    margin: 2rem 0 0 0

  .box
    font-weight: bold
    border: 1px solid white
    border-radius: 2rem
    padding: 10rem
    font-size: 1.4rem
    text-align: center

  .page-label
    opacity: 0.5

@media screen and (min-width: 1440px)
  .table-custom td
    font-size: 1rem
</style>
