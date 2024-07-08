<template lang="pug">

q-page.flex.flex-center.page(padding)
  section.page-title-group.column.wrap.justify-center.items-center.content-center.text-center
    span.division {{_division.getValue}} Application
    span.search-value {{_searchvalue.getValue}}
    span.select-message Please select which information you wish to inquire

    div.grid
      LinkButton.one(text="Track Application" @click="gotoStatusSearch")
      LinkButton.two(text="Order of Payment" @click="gotoOPSearch")
      LinkButton.three(text="Inspection Details" @click="gotoNoticeSearch")
      LinkButton.four(text="Permits Details" @click="gotoStatusSearch")

  //- section.column.wrap.justify-center.items-center.content-center.text-center(v-else)
  //-   span.division {{_division.getValue}} Application
  //-   span.search-value {{_searchvalue.getValue}}
  //-   span.select-message Invalid Search

  div.fit.column.items-center.cancel-button
    BackButton(text="Cancel" @click="gotoHome")

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
import LinkButton from 'components/LinkButton.vue'
import BackButton from 'components/BackButton.vue'

const router = useRouter()
const quasar = useQuasar()
const _currentpage = useCurrentPage()
const _searchvalue = useSearchValue()
const _division = useDivision()
const _listtype = useListType()

const detectDivision = async () => {
  if (_searchvalue.getValue.length === 9) {
    _division.setBuilding()
  } else if (_searchvalue.getLength === 8) {
    _division.setOccupancy()
  } else if (_searchvalue.getLength === 10) {
    _division.setElectrical()
  } else if (_searchvalue.getLength === 11) {
    _division.setSignage()
  } else if (_searchvalue.getLength === 7) {
    _division.setMechanical()
  } else {
    _division.setUndefined()
  }
}

const gotoStatusSearch = () => {
  updatePage('statussearch')
}

const gotoOPSearch = () => {
  _listtype.updateValue('Order of Payment')
  updatePage('opsearch')
}

const gotoNoticeSearch = () => {
  _listtype.updateValue('Notice to Comply')
  updatePage('noticesearch')
}

const gotoPermitSearch = () => {
  _listtype.updateValue('List of Permits')
  updatePage('permitsearch')
}

const updatePage = (page) => {
  _currentpage.updateValue(page)
  router.push(page)
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
  font-family: 'Roboto'

.search-value
  margin-top: 1.2rem
  font-size: 1.8rem
  font-family: 'Roboto'
  font-weight: bold
  color: $yellow

.select-message
  font-size: 1.2rem
  font-family: 'Roboto'
  font-weight: bold
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

// .select-button
//   width: 90%
//   font-size: 1rem
//   font-family: 'Roboto'
//   font-weight: bold
//   height: 5.2rem
//   margin-top: 1.2rem
//   // box-shadow: -12px 11px 16px -5px rgba(13, 5, 100, 0.45)
//   box-shadow: -12px 11px 16px -5px rgba(255, 255, 255, 0.2)
//   // border: 3px solid rgba(14,84,160,1)
//   border-radius: 0px 20px 0px 0px
//   // background-color: rgba(14,84,160,0.5)
//   background-color: $yellow
//   color: $darktext

.select-button
  width: 90%
  font-size: 0.9rem
  font-family: 'Roboto', sans-serif
  height: 4.8rem
  margin-top: 1.2rem
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2)
  border: none
  border-radius: 0 20px 0 0
  background-color: $yellow
  color: $darktext
  cursor: pointer
  transition: background-color 0.3s ease

  &:hover
    background-color: $darktext
    color: $yellow

.cancel-button
  // padding: 2rem 0 0 0
  // padding-bottom: 3rem

@media screen and (min-width: 1023px)
  .grid
    grid-template-columns: 1fr 1fr
    grid-template-rows: 1fr 1fr
    grid-template-areas: "one two" "three four"

  .search-value
    margin: 1rem 0 0 0
    font-size: 2.8rem
    font-family: 'Roboto'
    font-weight: bold
    color: $yellow

  .select-message
    font-size: 1.4rem

  .select-button
    font-size: 1rem
    padding: 0 2rem
</style>
