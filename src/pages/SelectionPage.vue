<template lang="pug">

q-page.page.padding.column.wrap.justify-center.items-center.content-center.text-center
  section.page-title-group.column.wrap.justify-center.items-center.content-center.text-center(v-if="_division.getValue !== undefined")
    span.division {{_division.getValue}} Application
    span.search-value {{_searchvalue.value}}
    span.select-message Please select which information you wish to inquire

    div.grid
      q-btn.one.select-button(rounded @click="gotoStatusSearch") Track Application
      q-btn.two.select-button(rounded @click="gotoOPSearch" label="Order of Payment (Fees)")
      q-btn.three.select-button(rounded @click="gotoNoticeSearch") Inspection Details
      q-btn.four.select-button(rounded @click="gotoPermitSearch") Permits Details

  section.column.wrap.justify-center.items-center.content-center.text-center(v-else)
    span.division {{_division.getValue}} Application
    span.search-value {{_searchvalue.value}}
    span.select-message Invalid Search

  div.fit.column.items-center.cancel-button
    q-btn.button-back(rounded @click="gotoHome") Cancel

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
// import { api } from 'boot/axios'
import { useSearchValue } from 'stores/searchvalue'
import { useDivision } from 'stores/division'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useListType } from 'stores/listtype'
import { useApplicationNo } from 'stores/applicationno'
import { useTableData } from 'stores/tabledata'
import { useOwnername } from 'stores/ownername'
import { useOwneraddress } from 'stores/owneraddress'
import { useLatestStatus } from 'stores/lateststatus'
import { useErrorMessage } from 'stores/errormessage'
import { useCurrentPage } from 'stores/currentpage'

const router = useRouter()
const quasar = useQuasar()
let _currentpage = useCurrentPage
let _searchvalue = useSearchValue
let _division = useDivision()
let _listtype = useListType

const detectDivision = async () => {
  if (_searchvalue.value.length === 9) {
    _division.setBuilding()
  } else if (_searchvalue.value.length === 8) {
    _division.setOccupancy()
  } else if (_searchvalue.value.length === 10) {
    _division.setElectrical()
  } else if (_searchvalue.value.length === 11) {
    _division.setSignage()
  } else if (_searchvalue.value.length === 7) {
    _division.setMechanical()
  } else {
    _division.setUndefined()
  }
}

const gotoStatusSearch = () => {
  updatePage('statussearch')
}

const gotoOPSearch = () => {
  _listtype.value = 'Order of Payment'
  updatePage('opsearch')
}

const gotoNoticeSearch = () => {
  _listtype.value = 'Notice to Comply'
  updatePage('noticesearch')
}

const gotoPermitSearch = () => {
  _listtype.value = 'List of Permits'
  updatePage('permitsearch')
}

const updatePage = (page) => {
  _currentpage.value = page
  router.push(page, () => {})
}

const gotoHome = () => {
  // controller.abort()
  updatePage('/')
  // window.location.reload()
}

;(async () => {
  await detectDivision()
})()
</script>

<style lang="sass" scoped>
.page
  color: $text

.division
  font-size: 1.6rem
  font-family: 'LexendBold'

.search-value
  margin-top: 1.2rem
  font-size: 1.8rem
  font-family: 'LexendBold'
  color: $yellow

.select-message
  font-size: 1.2rem
  font-family: 'LexendBold'
  padding: 2rem

.grid
  display: grid
  grid-auto-columns: 1fr
  grid-auto-rows: 1fr
  gap: 0px 0px
  grid-template-columns: 1fr
  grid-template-rows: 1fr 1fr 1fr 1fr
  grid-auto-flow: row
  grid-template-areas: "one" "two" "three" "four"
  justify-content: center
  align-content: center
  justify-items: center
  align-items: center

.one
  grid-area: one

.two
  grid-area: two

.three
  grid-area: three

.four
  grid-area: four

.select-button
  width: 90%
  font-size: 1rem
  font-family: 'LexendBold'
  height: 5.2rem
  margin-top: 1.2rem
  box-shadow: -12px 11px 16px -5px rgba(13, 5, 100, 0.45)
  border: 3px solid rgba(14,84,160,1)
  border-radius: 0px 20px 0px 0px
  background-color: rgba(14,84,160,0.5)

.cancel-button
  padding-top: 2rem
  padding-bottom: 3rem

@media screen and (min-width: 1023px)
  .grid
    grid-template-columns: 1fr 1fr
    grid-template-rows: 1fr 1fr
    grid-template-areas: "one two" "three four"

  .search-value
    margin: 1rem 0 0 0
    font-size: 2.8rem
    font-family: 'LexendBold'
    color: $yellow

  .select-message
    font-size: 1.4rem

  .select-button
    font-size: 1.2rem
</style>
