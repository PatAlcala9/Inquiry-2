<template lang="pug">

q-page.page(padding)
  div.body
    picture
      source(srcset="../assets/ocbologo.avif" type="image/avif")
      img.logo(src="../assets/ocbologo.webp" type="image/webp" alt="OCBO Logo")
    h1.main-title(@click="sample") OCBO Inquiry

    q-input.searchbar(v-if="$q.screen.width <= 767" icon="search" outlined rounded v-model="searched" placeholder="Search Here" @keydown.enter="runCommand" bg-color="white" input-style="font-size: 1.2rem; color: #424f60")
      template(v-slot:prepend)
        q-icon(name="search")
    q-input.searchbar(v-else icon="search" outlined rounded v-model="searched" placeholder="Type Application Number or Name Here" @keydown.enter="runCommand" bg-color="white" input-style="font-size: 1.2rem; color: #424f60")
      template(v-slot:prepend)
        q-icon(name="search")

    //- q-btn.button(rounded label="Search" @click="runCommand")

    div(v-if="$q.screen.width <= 767")
      div.flex.flex-center
        span(class="help-info") {{helpInfo}}
          span.bold(@click="gotoHelp") here

    div(v-else)
      div.right-side
        span.help-info {{helpInfo}}
          span.bold(@click="gotoHelp") here

    //- PinCodeBar

    div.footer
      section.footer-section
        div.footer-left
          q-img.footer--image
          span.footer--copyright © 2024 -- Office of the City Building Official
        div.footer-right
          span.footer--copyright Developed by: Pat Alcala
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useCurrentPage } from 'stores/currentpage'
import { useApplicationNo } from 'stores/applicationno'
import { useSearchValue } from 'stores/searchvalue'
import { useErrorMessage } from 'stores/errormessage'
// import { useErrorSubMessage } from 'stores/errorsubmessage'
// import { useListSubject } from 'stores/listsubject'
import { useListType } from 'stores/listtype'
import { useDivision } from 'stores/division'
import { useListYear } from 'stores/listyear'
import { useListDate } from 'stores/listdate'
import { useRSAKey } from 'stores/rsakey'
import { date } from 'quasar'
import { JSEncrypt } from 'jsencrypt'
import { encrypt, decrypt } from 'assets/js/shield'

import PinCodeBar from 'components/PinCodeBar.vue'
import { hash } from 'src/assets/js/OCBO'

const router = useRouter()
const _currentpage = useCurrentPage()
const _applicationno = useApplicationNo()
const _searchvalue = useSearchValue()
const _errormessage = useErrorMessage()
// const _listsubject = useListSubject
const _listtype = useListType()
const _division = useDivision()
const _listyear = useListYear()
const _listdate = useListDate()
const _rsakey = useRSAKey()

let helpInfo = ref('Need help? Click ')
let searched = ref('')
let error = ref(false)
let errorMessage = ref('')
let tableEmpty = ref(false)
let tableEmptyO = ref(false)
let tableEmptyE = ref(false)
let online = ref(false)

const monthsList = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
const monthWith31List = ['JANUARY', 'MARCH', 'MAY', 'JULY', 'AUGUST', 'OCTOBER', 'DECEMBER']
const yearWithLeapList = ['2012', '2016', '2020', '2024', '2028', '2032', '2036', '2040', '2044', '2048']

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
const printCommand = '--print'
const countCommand = '--count'
const chartCommand = '--chart'

let done = ref(false)

const defaultMode = () => {
  error.value = false
}

const detectDivision = async (value) => {
  if (value.length === 9) {
    _division.setBuilding()
  } else if (value.length === 8) {
    _division.setOccupancy()
  } else if (value.length === 10) {
    _division.setElectrical()
  } else if (value.length === 11) {
    _division.setSignage()
  } else if (value.length === 7) {
    _division.setMechanical()
  } else {
    _division.setUndefined()
  }
}

const checkApplication = async (application) => {
  try {
    let response
    const encryptedEndpoint = encrypt('CheckConnection')
    const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')
    const connection = await api.get('/api/' + replacedEndpoint)
    const data = connection.data || null
    const result = data !== null ? decrypt(data.result) : null

    if (result !== null) {
      await detectDivision(application)

      if (_division.isBuilding) {
        const encryptedEndpoint = encrypt('CheckBuilding')
        const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')
        const encryptedData = encrypt(application)
        const replacedData = encryptedData.replace(/\//g, '~')
        response = await api.get('/api/' + replacedEndpoint + '/' + replacedData)
      } else if (_division.isOccupancy) {
        const encryptedEndpoint = encrypt('CheckOccupancy')
        const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')
        const encryptedData = encrypt(application)
        const replacedData = encryptedData.replace(/\//g, '~')
        response = await api.get('/api/' + replacedEndpoint + '/' + replacedData)
      } else if (_division.isSignage) {
        const encryptedEndpoint = encrypt('CheckSignage')
        const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')
        const encryptedData = encrypt(application)
        const replacedData = encryptedData.replace(/\//g, '~')
        response = await api.get('/api/' + replacedEndpoint + '/' + replacedData)
      } else if (_division.isElectrical) {
        const encryptedEndpoint = encrypt('CheckElectrical')
        const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')
        const encryptedData = encrypt(application)
        const replacedData = encryptedData.replace(/\//g, '~')
        response = await api.get('/api/' + replacedEndpoint + '/' + replacedData)
      } else if (_division.isMechanical) {
        const encryptedEndpoint = encrypt('CheckMechanical')
        const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')
        const encryptedData = encrypt(application)
        const replacedData = encryptedData.replace(/\//g, '~')
        response = await api.get('/api/' + replacedEndpoint + '/' + replacedData)
      } else {
        return false
      }

      const data = response.data.length !== 0 ? response.data : null
      const result = data !== null ? decrypt(data.result) : null

      if (result !== null) {
        if (result > 0) {
          _applicationno.updateValue(application)
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    } else {
      updatePage('noconnection')
    }
  } catch {
    updatePage('noconnection')
  }
}

const runCommand = async () => {
  if (isNaN(searched.value.substring(0, 2)) === false) {
    if (searched.value.includes('-')) {
      _searchvalue.updateValue(searched.value)
      if (await checkApplication(searched.value)) {
        updatePage('selection')
      } else {
        _errormessage.updateMessage('Search Error')
        _errormessage.updateSubMessage('Application does not exist')
        updatePage('error')
      }
    } else {
      const withDash = searched.value.toString().substring(0, 2) + '-' + searched.value.toString().substring(2, searched.value.length)
      _searchvalue.updateValue(withDash)
      if (await checkApplication(withDash)) {
        updatePage('selection')
      } else {
        _errormessage.updateMessage('Search Error')
        _errormessage.updateSubMessage('Application does not exist')
        updatePage('error')
      }
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
      if (searched.value.includes(' approved')) {
        let searchedDate
        _listtype.updateValue('Approved Permit')

        if (searched.value.includes(' building')) {
          _division.setBuilding()
          searchedDate = searched.value.substring(25)
        } else if (searched.value.includes(' occupancy')) {
          _division.setOccupancy()
          searchedDate = searched.value.substring(26)
        } else if (searched.value.includes(' electrical')) {
          _division.setElectrical()
          searchedDate = searched.value.substring(27)
        } else if (searched.value.includes(' signage')) {
          _division.setSignage()

          _errormessage.updateMessage('Apologize for the Inconvenience')
          _errormessage.updateSubMessage("Signage's system is not yet available")
          updatePage('error')
        } else if (searched.value.includes(' mechanical')) {
          _division.setMechanical()

          _errormessage.updateMessage('Apologize for the Inconvenience')
          _errormessage.updateSubMessage("Mechanical's system is not yet available")
          updatePage('error')
        } else {
          _errormessage.updateMessage('Invalid Command')
          _errormessage.updateSubMessage('Please specify a division')
          // _errorsubmessage.value = 'Please specify a division'
          updatePage('error')
        }

        if (monthsList.some((month) => searchedDate.toUpperCase().includes(month))) {
          const matchingMonth = monthsList.filter((month) => searchedDate.toUpperCase().includes(month.toUpperCase()))
          const year = searchedDate.substring(parseInt(matchingMonth[0].length + 1))
          const validYear = !isNaN(year)

          if (validYear) {
            const formattedDate = date.formatDate(searchedDate + ' 1', 'YYYY-MM')
            _listyear.updateValue(0)
            _listdate.updateValue(formattedDate)
            updatePage('listgenerateapprove')
          } else {
            _errormessage.updateMessage('Invalid Command')
            _errormessage.updateSubMessage(`${year} is not a valid year`)
            updatePage('error')
          }
        } else {
          const validYear = !isNaN(searchedDate)

          if (validYear) {
            _listyear.updateValue(searchedDate)
            updatePage('listgenerateapprove')
          } else {
            _errormessage.updateMessage('Invalid Command')
            _errormessage.updateSubMessage(`${year} is not a valid year`)
            updatePage('error')
          }
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

        // } else {
        //   _errormessage.value = 'Invalid Generation of List'
        //   _errorsubmessage.value = 'Application Number required'
        //   updatePage('searcherror')
        // }
      } else if (searched.value.includes(' received')) {
        let searchedDate
        _listtype.updateValue('Daily Received')

        if (searched.value.includes(' building')) {
          _division.setBuilding()
          searchedDate = searched.value.substring(25)
        } else if (searched.value.includes(' occupancy')) {
          _division.setOccupancy()
          searchedDate = searched.value.substring(26)
        } else if (searched.value.includes(' electrical')) {
          _division.setElectrical()
          searchedDate = searched.value.substring(27)
        } else if (searched.value.includes(' signage')) {
          _errormessage.updateMessage('Apologize for the Inconvenience')
          _errormessage.updateSubMessage("Signage's system is not yet available")
          updatePage('error')
        } else if (searched.value.includes(' mechanical')) {
          _errormessage.updateMessage('Apologize for the Inconvenience')
          _errormessage.updateSubMessage("Mechanical's system is not yet available")
          updatePage('error')
        }

        if (searchedDate.toUpperCase() === 'TODAY') {
          const today = Date.now()
          const formattedDate = date.formatDate(today, 'YYYY-MM-DD')
          _listdate.updateValue(formattedDate)
          updatePage('listgeneratereceived')
        } else if (searchedDate.toUpperCase() === 'YESTERDAY') {
          const today = Date.now()
          const yesterday = date.subtractFromDate(today, { hours: 24 })
          const formattedDate = date.formatDate(yesterday, 'YYYY-MM-DD')
          _listdate.updateValue(formattedDate)
          updatePage('listgeneratereceived')
        } else if (monthsList.some((month) => searchedDate.toUpperCase().includes(month))) {
          const matchingMonth = monthsList.filter((month) => searchedDate.toUpperCase().includes(month.toUpperCase()))
          let days
          if (monthWith31List.includes(matchingMonth[0])) {
            days = Array.from({ length: 31 }, (_, index) => (index + 1).toString())
          } else if (matchingMonth[0] === 'FEBRUARY') {
            days = Array.from({ length: 29 }, (_, index) => (index + 1).toString())
          } else {
            days = Array.from({ length: 30 }, (_, index) => (index + 1).toString())
          }

          if (days.some((day) => searchedDate.substring(matchingMonth[0].length + 1, matchingMonth[0].length + 3).trim() === day)) {
            const matchingDay = days.filter((day) => searchedDate.substring(matchingMonth[0].length + 1, matchingMonth[0].length + 3).trim() === day)
            const year = searchedDate.substring(parseInt(matchingMonth[0].length + 1) + parseInt(matchingDay[0].length + 1))

            if (!yearWithLeapList.includes(year) && matchingMonth[0] === 'FEBRUARY') {
              days = days.filter((day) => day !== 29)
            }

            if (year > 0) {
              _listdate.updateValue(searchedDate)
              updatePage('listgeneratereceived')
            } else {
              _errormessage.updateMessage('Invalid Command')
              _errormessage.updateSubMessage('Please specify the year')
              updatePage('error')
            }
          } else {
            if (searchedDate.split(' ')[2] === undefined) {
              _errormessage.updateSubMessage('Please specify the year')
            } else {
              _errormessage.updateSubMessage('Please specify the day of the month')
            }

            _errormessage.updateMessage('Invalid Command')
            updatePage('error')
          }
        } else {
          _errormessage.updateMessage('Invalid Command')
          _errormessage.updateSubMessage(searchedDate.toUpperCase().split(' ')[0] + ' is not a month, please state a proper month')
          updatePage('error')
        }
      } else {
        _errormessage.updateMessage('Invalid Command')
        _errormessage.updateSubMessage(`Items to be listed aren't specified`)
        // _errorsubmessage.value = `Items to be listed aren't specified`
        updatePage('error')
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
      if (searched.value.length < 5 || searched.value.toUpperCase() === 'DAVAO') {
        _errormessage.updateMessage('Invalid Search')
        _errormessage.updateSubMessage('Please be more specific in your search')

        updatePage('error')
      } else {
        _searchvalue.updateValue(searched.value)
        updatePage('namesearch')
        // _currentpage.value = 'namesearch'
        // router.push('namesearch', () => {})
      }
    }
  }
}

const loadCurrentPage = () => {
  router.push(_currentpage.getValue)
}

const gotoHelp = () => {
  // _currentpage.value = 'helpindex'
  // router.push('helpindex', () => {})
  updatePage('helpindex')
}

const reset = () => {
  searched.value = ''
}

// const uploadApplication = () => {
//   _applicationno.value = searched.value
// }

const updatePage = (page) => {
  _currentpage.updateValue(page)
  router.push(page)
}

const uploadSearch = (value) => {
  _searchvalue.updateValue(value)
}

;(async () => {
  reset()
  loadCurrentPage()
})()
</script>

<style lang="sass" scoped>
h1, h2
  // font-family: 'PoppinsBold', sans-serif
  font-family: 'Roboto'
  font-weight: bold
  opacity: 0.9

.logo
  width: 9rem
  height: auto
  margin-top: 1.3rem
  opacity: 0.8
  // filter: grayscale(90%) invert(90%) sepia(90%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)

.body
  display: flex
  flex-direction: column
  flex-wrap: wrap
  justify-content: flex-start
  align-items: center
  align-content: center

.searchbar
  width: 85%
  font-family: 'Roboto', Arial, sans-serif
  margin-top: -2rem

  &:hover
    border-radius: 2rem
    // box-shadow: 4px 8px 41px 2px rgba(14, 84, 160, 0.87)
    box-shadow: 4px 8px 41px 2px rgba(66, 79, 96, 0.87)
    overflow: hidden

.sample
  letter-spacing: 22px !important

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
  font-family: 'Roboto'
  font-weight: bold
  opacity: 0.9

.list
  margin-bottom: 3rem

.help-info
  margin-top: 1.4rem
  font-family: 'Roboto'
  color: rgba(255, 255, 255, 0.8)
  font-size: 1rem

.bold
  font-weight: bold
  text-decoration: underline
  cursor: pointer

.footer
  content: ""
  position: absolute
  top: 100
  left: 0
  right: 0
  bottom: 0
  padding: 0 0 1rem 0
  width: 100vw
  width: 100svw
  height: auto

.footer-section
  display: flex
  flex-direction: column
  flex-wrap: wrap
  justify-content: center
  align-items: center
  align-content: center

.footer-left
  display: flex
  flex-direction: column
  flex-wrap: wrap
  justify-content: center
  align-items: center
  align-content: center
  // gap: 2rem
  opacity: 0.3

.footer-right
  display: flex
  flex-direction: column
  flex-wrap: wrap
  justify-content: center
  align-items: center
  align-content: center
  // gap: 2rem
  // padding: 0 1rem 0 0
  opacity: 0.3

.footer--image
  background-image: url('../assets/images/davao.webp')
  width: 16rem
  height: auto
  background-position: center
  background-repeat: no-repeat
  background-size: contain

.footer--copyright
  font-size: 0.9rem

//**Tablet */
@media screen and (min-width: 768px)
  .logo
    width: 11rem
    height: auto
    margin-top: 1.3rem

  .searchbar
    width: 550px
    border-radius: 15px

  .main-title
    font-size: 3.8rem

  .right-side
    width: 550px
    padding: 0.5rem 0 0 0

  .help-info
    margin-top: 1.6rem
    font-size: 0.9rem

  .body
    margin: 4rem 0 0 0

  .footer
    content: ""
    position: absolute
    top: 100
    left: 0
    right: 0
    bottom: 0
    padding: 0 2rem 1rem 2rem
    width: 100vw
    height: auto

  .footer-section
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: space-between
    align-items: flex-end
    align-content: center

  .footer-left
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: flex-start
    align-items: center
    align-content: center
    gap: 2rem
    opacity: 0.5

  .footer-right
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: flex-end
    align-items: center
    align-content: center
    gap: 2rem
    opacity: 0.3

  .footer--image
    background-image: url('../assets/images/davao.webp')
    width: 12rem
    height: auto
    background-position: center
    background-repeat: no-repeat
    background-size: contain

  .footer--copyright
    font-size: 0.8rem

@media screen and (min-width: 1440px)
  .main-title
    font-size: 4.6rem
  .footer
    content: ""
    position: absolute
    top: 100
    left: 0
    right: 0
    bottom: 0
    padding: 0 2rem 1rem 2rem
    width: 100vw
    height: auto

  .footer-section
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: space-between
    align-items: flex-end
    align-content: center

  .footer-left
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: flex-start
    align-items: center
    align-content: center
    gap: 2rem
    opacity: 0.5

  .footer-right
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: flex-end
    align-items: center
    align-content: center
    gap: 2rem
    opacity: 0.3

  .footer--image
    background-image: url('../assets/images/davao.webp')
    @supports (background-image: url('../assets/images/davao.avif'))
      background-image: url('../assets/images/davao.avif')
    width: 16rem
    height: auto
    background-position: center
    background-repeat: no-repeat
    background-size: contain

  .footer--copyright
    font-size: 1rem
</style>
