<template lang="pug">

q-page.page
  div.body(v-if="error")
    h2(class="main-title" v-if="error") {{errorMessage}}
    q-btn(rounded class="button" label="Return" @click="defaultMode")

  div.body(v-else)
    img.logo(src="../assets/ocbologo.svg" alt="OCBO Logo")
    h1.main-title OCBO Inquiry
    q-input.searchbar(icon="search" outlined rounded v-model="searched" placeholder="Search Here" @keydown.enter="callserver" bg-color="white")
      template(v-slot:prepend)
        q-icon(name="search")

    q-btn.button(rounded label="Search" @click="callserver")

    div(v-if="$q.screen.width <= 899")
      div.flex.flex-center
        span(class="help-info") {{helpInfo}}
          span.bold(@click="gotoHelp") here

    div(v-else)
      div.right-side
        span.help-info {{helpInfo}}
          span.bold(@click="gotoHelp") here

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCurrentPage } from 'stores/currentpage'
import { useApplicationNo } from 'stores/applicationno'
import { useSearchValue } from 'stores/searchvalue'
import { useErrorMessage } from 'stores/errormessage'
import { useErrorSubMessage } from 'stores/errorsubmessage'
import { useListSubject } from 'stores/listsubject'
import { useListType } from 'stores/listtype'
import { useDivision } from 'stores/division'
import { useListYear } from 'stores/listyear'
import { useListDate } from 'stores/listdate'
import { date } from 'quasar'

const router = useRouter()
let _currentpage = useCurrentPage
let _applicationno = useApplicationNo
let _searchvalue = useSearchValue
let _errormessage = useErrorMessage
let _errorsubmessage = useErrorSubMessage
// let _listsubject = useListSubject
let _listtype = useListType
let _division = useDivision
let _listyear = useListYear
let _listdate = useListDate

let helpInfo = ref('Need help? Click ')
let searched = ref('')
let error = ref(false)
let errorMessage = ref('')
let tableEmpty = ref(false)
let tableEmptyO = ref(false)
let tableEmptyE = ref(false)
let online = ref(false)

// const columns = [
//   {
//     name: 'application',
//     align: 'left',
//     label: 'Application Number',
//     field: 'application',
//     sortable: true,
//   },
//   {
//     name: 'name',
//     label: "Owner's Name",
//     field: 'name',
//     sortable: true,
//     align: 'left',
//   },
//   {
//     name: 'status',
//     label: 'Current Status',
//     field: 'status',
//     align: 'right',
//     sortable: false,
//   },
// ]
let data = []
let dataO = []
let dataE = []
// const pagination = {
//   page: 0,
//   rowsPerPage: 10
// }
// const statuses = [
//   'RECEIVE',
//   'receive',
//   'RECEIVED',
//   'received',
//   'INSPECTION',
//   'inspection',
//   'ASSESSMENT',
//   'assessment',
//   'APPROVAL',
//   'approval',
//   'APPROVE',
//   'approve',
//   'PRINT',
//   'print',
//   'PRINTING',
//   'printing',
//   'RELEASE',
//   'release',
//   'RELEASING',
//   'releasing',
//   'OP',
//   'op',
//   'ORDER OF PAYMENT',
//   'order of payment',
//   'ntc',
//   'NTC',
//   'notice to comply',
//   'NOTICE TO COMPLY',
// ]
// const years = [
//   '2012',
//   '2013',
//   '2014',
//   '2015',
//   '2016',
//   '2017',
//   '2018',
//   '2019',
//   '2020',
//   '2021',
//   '2022',
//   '2023',
//   '2024',
//   '2025',
// ]

// const accurateDate = [
//   'TODAY',
//   'today',
//   'YESTERDAY',
//   'yesterday',
//   'LAST WEEK',
//   'last week',
//   'LAST MONTH',
//   'last month',
//   'LAST YEAR',
//   'last year',
// ]

const commands = '--help'
const listCommand = '--list'
const graphCommand = '--graph'

let done = ref(false)

const defaultMode = () => {
  error.value = false
}

const callserver = async () => {
  if (isNaN(searched.value.substring(0, 2)) === false) {
    if (searched.value.includes('-')) {
      _searchvalue.value = searched.value
      updatePage('selection')
    } else {
      const withDash = searched.value.toString().substring(0, 2) + '-' + searched.value.toString().substring(2, searched.value.length)
      _searchvalue.value = withDash
      updatePage('selection')
    }
    // if (years.includes(searched.value)) {
    //   // // this.mode = 'List of Account in a year'
    //   // this.$q.sessionStorage.remove('year')
    //   // this.$q.sessionStorage.set('year', this.searched)
    //   // this.currentpage = 'year'
    //   // this.$router.push('yearsearch', () => {})
    // } else {

    // }
  } else {
    if (searched.value.toString().substring(0, 6) === listCommand) {
      if (searched.value.includes(' approve')) {
        if (searched.value.includes(' --division building')) {
          _listtype.value = 'Approved Permit'
          _division.value = 'Building'
          if (searched.value.includes(' --year 2020')) {
            _listyear.value = 2020
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2021')) {
            _listyear.value = 2021
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2022')) {
            _listyear.value = 2022
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2023')) {
            _listyear.value = 2023
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2024')) {
            _listyear.value = 2024
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2025')) {
            _listyear.value = 2025
            updatePage('listgenerateapprove')
          }
        } else if (searched.value.includes(' --division occupancy')) {
          _listtype.value = 'Approved Permit'
          _division.value = 'Occupancy'

          if (searched.value.includes(' --year 2020')) {
            _listyear.value = 2020
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2021')) {
            _listyear.value = 2021
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2022')) {
            _listyear.value = 2022
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2023')) {
            _listyear.value = 2023
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2024')) {
            _listyear.value = 2024
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2025')) {
            _listyear.value = 2025
            updatePage('listgenerateapprove')
          }
        } else if (searched.value.includes(' --division electrical')) {
          _listtype.value = 'Approved Permit'
          _division.value = 'Electrical'

          if (searched.value.includes(' --year 2020')) {
            _listyear.value = 2020
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2021')) {
            _listyear.value = 2021
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2022')) {
            _listyear.value = 2022
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2023')) {
            _listyear.value = 2023
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2024')) {
            _listyear.value = 2024
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2025')) {
            _listyear.value = 2025
            updatePage('listgenerateapprove')
          }
        } else if (searched.value.includes(' --division signage')) {
          _listtype.value = 'Approved Permit'
          _division.value = 'Signage'

          if (searched.value.includes(' --year 2020')) {
            _listyear.value = 2020
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2021')) {
            _listyear.value = 2021
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2022')) {
            _listyear.value = 2022
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2023')) {
            _listyear.value = 2023
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2024')) {
            _listyear.value = 2024
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2025')) {
            _listyear.value = 2025
            updatePage('listgenerateapprove')
          }
        } else if (searched.value.includes(' --division mechanical')) {
          _listtype.value = 'Approved Permit'
          _division.value = 'Mechanical'

          if (searched.value.includes(' --year 2020')) {
            _listyear.value = 2020
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2021')) {
            _listyear.value = 2021
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2022')) {
            _listyear.value = 2022
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2023')) {
            _listyear.value = 2023
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2024')) {
            _listyear.value = 2024
            updatePage('listgenerateapprove')
          } else if (searched.value.includes(' --year 2025')) {
            _listyear.value = 2025
            updatePage('listgenerateapprove')
          }
        } else {
          _errormessage.value = 'Invalid Command'
          _errorsubmessage.value = 'Please specify a division'
          updatePage('searcherror')
        }
        // const newValue = searched.value.toString().substring(10)

        // if (isNaN(newValue.substring(0, 1)) === false) {
        //   if (newValue.includes('-')) {
        //     _searchvalue.value = newValue
        //   } else {
        //     const withDash =
        //       newValue.toString().substring(0, 2) +
        //       '-' +
        //       newValue.toString().substring(2, searched.value.length)
        //     _searchvalue.value = withDash
        //   }

        // _listsubject.value = _searchvalue.value

        // console.log('hehre')
        // } else {
        //   _errormessage.value = 'Invalid Generation of List'
        //   _errorsubmessage.value = 'Application Number required'
        //   updatePage('searcherror')
        // }
      } else if (searched.value.includes(' received')) {
        if (searched.value.includes(' --division building')) {
          _listtype.value = 'Daily Received'
          _division.value = 'Building'

          const searchedDate = searched.value.substring(45)

          if (searchedDate === 'today') {
            const today = Date.now()
            const formattedDate = date.formatDate(today, 'YYYY-MM-DD')
            _listdate.value = formattedDate
            updatePage('listgeneratereceived')
          } else if (searchedDate === 'yesterday') {
            const today = Date.now()
            const yesterday = date.subtractFromDate(today, { hours: 24 })
            const formattedDate = date.formatDate(yesterday, 'YYYY-MM-DD')
            _listdate.value = formattedDate
            updatePage('listgeneratereceived')
          } else if (searchedDate.substring(0, 2) === '20' && searchedDate.length === 10) {
            _listdate.value = searchedDate
            updatePage('listgeneratereceived')
          } else {
            _errormessage.value = 'Invalid Command'
            _errorsubmessage.value = 'Invalid Date Format'
            updatePage('searcherror')
          }
        } else if (searched.value.includes(' --division occupancy')) {
          _listtype.value = 'Daily Received'
          _division.value = 'Occupancy'

          const searchedDate = searched.value.substring(45)

          if (searchedDate === 'today') {
            const today = Date.now()
            const formattedDate = date.formatDate(today, 'YYYY-MM-DD')
            _listdate.value = formattedDate
            updatePage('listgeneratereceived')
          } else if (searchedDate === 'yesterday') {
            const today = Date.now()
            const yesterday = date.subtractFromDate(today, { hours: 24 })
            const formattedDate = date.formatDate(yesterday, 'YYYY-MM-DD')
            _listdate.value = formattedDate
            updatePage('listgeneratereceived')
          } else if (searchedDate.substring(0, 2) === '20' && searchedDate.length === 10) {
            _listdate.value = searchedDate
            updatePage('listgeneratereceived')
          } else {
            _errormessage.value = 'Invalid Command'
            _errorsubmessage.value = 'Invalid Date Format'
            updatePage('searcherror')
          }
        } else if (searched.value.includes(' --division electrical')) {
          _listtype.value = 'Daily Received'
          _division.value = 'Electrical'

          const searchedDate = searched.value.substring(45)

          if (searchedDate === 'today') {
            const today = Date.now()
            const formattedDate = date.formatDate(today, 'YYYY-MM-DD')
            _listdate.value = formattedDate
            updatePage('listgeneratereceived')
          } else if (searchedDate === 'yesterday') {
            const today = Date.now()
            const yesterday = date.subtractFromDate(today, { hours: 24 })
            const formattedDate = date.formatDate(yesterday, 'YYYY-MM-DD')
            _listdate.value = formattedDate
            updatePage('listgeneratereceived')
          } else if (searchedDate.substring(0, 2) === '20' && searchedDate.length === 10) {
            _listdate.value = searchedDate
            updatePage('listgeneratereceived')
          } else {
            _errormessage.value = 'Invalid Command'
            _errorsubmessage.value = 'Invalid Date Format'
            updatePage('searcherror')
          }
        }
      } else {
        _errormessage.value = 'Invalid Command'
        _errorsubmessage.value = 'Please specify to be listed'
        updatePage('searcherror')
      }
      // if (
      //   searched.value === 'op' ||
      //   searched.value === 'OP' ||
      //   searched.value === 'order of payment' ||
      //   searched.value === 'ORDER OF PAYMENT'
      // ) {
      //   this.$q.sessionStorage.remove('type')
      //   this.$q.sessionStorage.set('type', 'op')
      //   this.$q.sessionStorage.remove('question')
      //   this.$q.sessionStorage.set(
      //     'question',
      //     'Which Order of Payment would you like to Search?'
      //   )
      //   this.$q.sessionStorage.remove('buttons')
      //   this.$q.sessionStorage.set('buttons', '3')

      //   this.$q.sessionStorage.remove('button1')
      //   this.$q.sessionStorage.set('button1', 'Approval')
      //   this.$q.sessionStorage.remove('button2')
      //   this.$q.sessionStorage.set('button2', 'Printing')
      //   this.$q.sessionStorage.remove('button3')
      //   this.$q.sessionStorage.set('button3', 'Releasing')

      //   this.currentpage = 'selection'
      //   this.$router.push('selection', () => {})
      // } else if (
      //   this.searched === 'receive' ||
      //   this.searched === 'RECEIVE' ||
      //   this.searched === 'received' ||
      //   this.searched === 'RECEIVED'
      // ) {
      //   this.$q.sessionStorage.remove('statuslist')
      //   this.$q.sessionStorage.set('statuslist', 'receiving')
      //   this.mode = 'List of Status current Received'
      //   this.currentpage = 'statuslist'
      //   this.$router.push('statuslist', () => {})
      // } else if (
      //   this.searched === 'ntc' ||
      //   this.searched === 'NTC' ||
      //   this.searched === 'notice to comply' ||
      //   this.searched === 'NOTICE TO COMPLY'
      // ) {
      //   this.$q.sessionStorage.remove('type')
      //   this.$q.sessionStorage.set('type', 'ntc')
      //   this.$q.sessionStorage.remove('question')
      //   this.$q.sessionStorage.set(
      //     'question',
      //     'Which Notice to Comply would you like to Search?'
      //   )
      //   this.$q.sessionStorage.remove('buttons')
      //   this.$q.sessionStorage.set('buttons', '3')

      //   this.$q.sessionStorage.remove('button1')
      //   this.$q.sessionStorage.set('button1', 'Approval')
      //   this.$q.sessionStorage.remove('button2')
      //   this.$q.sessionStorage.set('button2', 'Printing')
      //   this.$q.sessionStorage.remove('button3')
      //   this.$q.sessionStorage.set('button3', 'Releasing')

      //   this.currentpage = 'selection'
      //   this.$router.push('selection', () => {})
      // }
      // } else if (accurateDate.includes(searched.value)) {
      //   if (this.searched === 'today' || this.searched === 'TODAY') {
      //     this.$q.sessionStorage.remove('specified')
      //     this.$q.sessionStorage.set('specified', 'today')
      //   } else if (
      //     this.searched === 'yesterday' ||
      //     this.searched === 'YESTERDAY'
      //   ) {
      //     this.$q.sessionStorage.remove('specified')
      //     this.$q.sessionStorage.set('specified', 'yesterday')
      //   }
      //   this.currentpage = 'permit'
      //   this.$router.push('permit', () => {})
    } else if (commands.includes(searched.value)) {
      gotoHelp()
    } else {
      if (searched.value.length === 1) {
        _errormessage.value = 'Invalid Command'
        _errorsubmessage.value = 'Please specify to be listed'
        updatePage('searcherror')
      } else {
        _searchvalue.value = searched.value
        _currentpage.value = 'namesearch'
        router.push('namesearch', () => {})
      }
    }
  }
}

const loadCurrentPage = () => {
  router.push(_currentpage.value)
}

const gotoHelp = () => {
  _currentpage.value = 'helpindex'
  router.push('helpindex')
}

const reset = () => {
  searched.value = ''
}

const uploadApplication = () => {
  _applicationno.value = searched.value
}

const updatePage = (page) => {
  _currentpage.value = page
  router.push(page, () => {})
}

const uploadSearch = (value) => {
  _searchvalue.value = value
}

;(async () => {
  reset()
  loadCurrentPage()
})()
</script>

<style lang="sass" scoped>
h1, h2
  font-family: 'PoppinsBold', sans-serif
  opacity: 0.9

.logo
  width: 9rem
  height: auto
  margin-top: 1.3rem
  opacity: 0.8
  filter: grayscale(90%) invert(90%) sepia(90%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)


.body
  display: flex
  flex-direction: column
  flex-wrap: wrap
  justify-content: flex-start
  align-items: center
  align-content: center

.searchbar
  width: 90%
  font-size: 1.2rem
  font-family: Arial, 'Poppins', sans-serif
  margin-top: -2rem

.searchbar:hover
  border-radius: 2rem
  box-shadow: 4px 8px 41px 2px rgba(14, 84, 160, 0.87)
  overflow: hidden

.button
  display: none

.table
  margin-bottom: 2em
  margin-top: 0.5em
  width: 90vw
  opacity: 0.9

.mobile
  display: inline

.main-title
  font-size: 2.3rem

// .mobile-message
//   font-size: 1rem
//   font-family: 'Poppins', sans-serif

.mobile-title
  margin-top: 2rem
  font-size: 1rem
  font-family: 'PoppinsBold', sans-serif
  opacity: 0.9

.list
  margin-bottom: 3rem

.help-info
  margin-top: 1.5rem
  font-family: 'Poppins'
  color: rgba(255, 255, 255, 0.8)
  font-size: 1.1rem

.bold
  font-weight: bold
  text-decoration: underline
  cursor: pointer


//**Tablet */
@media screen and (min-width: 900px)
  .logo
    width: 11rem
    height auto
    margin-top: 1.3rem

  .searchbar
    width: 550px
    font-size: 1.7em
    border-radius: 15px

  .main-title
    font-size: 3.5rem

  .right-side
    width: 550px

  .help-info
    font-size: 1rem
</style>
