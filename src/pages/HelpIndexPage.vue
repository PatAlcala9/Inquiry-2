<template lang="pug">

q-page.page(padding)
  q-resize-observer(@resize="onResize")

  div.page-title-group.column.wrap.justify-center.items-center.content-center.text-center
    PageTitle(text="Help Page")

    q-img.image

    div.flex.flex-center(v-if="screenWidth < 767")
      q-list.list(bordered separator)
        //- q-item.list-item(clickable v-ripple @click="gotoApplicationHelp")
        //-   q-item-section.list-section Application Status
        LinkButton(text="Application Status" @click="gotoApplicationHelp")
        LinkButton(text="Fees Details" @click="gotoFeesHelp")
        LinkButton(text="Permit Details" @click="gotoPermitHelp")
        LinkButton(text="Name Record" @click="gotoNameHelp")
        //- q-item.list-item(clickable v-ripple @click="gotoNameHelp")
        //-   q-item-section Name Record
        //- q-item.list-item(clickable v-ripple)
        //-   q-item-section Approved Permits
        div.advance-area
          section(v-if="pin === false" @click="openPin").advance--text
            span Open Advance Commands
          section(v-else)
            PinCodeBar(v-if="_numbercode.check === false")
            div.list(v-else)
              LinkButton.one2(glow="true" text="Generate List" )
              LinkButton.two2(glow="true" text="Create Chart" )
              LinkButton.three2(glow="true" text="Print PDF")

        div.flex.flex-center.button-area
          BackButton(text="Home" @click="gotoHome")

    div.fit.column.justify-center.items-center.content-center(v-else)

      //- div.fit.row.justify-center.items-center.content-center
      div.grid
        //- q-list.list(bordered separator)
          //- q-item.list-item(clickable v-ripple @click="gotoApplicationHelp")
          //-   q-item-section Application Status
        LinkButton.one(text="Application Status" @click="gotoApplicationHelp")
        LinkButton.two(text="Fees Details" @click="gotoFeesHelp")
        LinkButton.three(text="Permit Details" @click="gotoPermitHelp")
        LinkButton.four(text="Name Record" @click="gotoNameHelp")
        //-   q-list.list(bordered separator)
        //-     q-item.list-item(clickable v-ripple @click="gotoNameHelp")
        //-       q-item-section Name Record
        //- div.fit.row.justify-center.items-center.content-center
        //-   q-list.list(bordered separator)
        //-     q-item.list-item(clickable v-ripple)
        //-       q-item-section Approved Permits
        //-   //- q-list.list(bordered separator)
        //-   //-   q-item.list-item(clickable v-ripple)
        //-   //-     q-item-section
      div.flex.flex-center.advance-area
        span(v-if="pin === false" @click="openPin").advance--text Open Advance Commands
        section(v-else)
          PinCodeBar(v-if="_numbercode.check === false")
          div.grid2(v-else)
            LinkButton.one2(glow="true" text="Generate List" )
            LinkButton.two2(glow="true" text="Create Chart" )
            LinkButton.three2(glow="true" text="Print PDF")
        //-

        //- div.flex.flex-center.advance-area
        //-   span.advance--text(@click="vv = vv === 1 ? 0 : 1") Open Advance Commands
        //-   PinCodeBar(v-if="vv === 0")

      div.flex.flex-center.button-area
        BackButton(text="Home" @click="gotoHome")

    //- div(v-if="$q.screen.width <= 500")
    //-   div.full-width.column.no-wrap.justify-center.items-center.content-start
    //-     BackButton(text="Home" @click="gotoHome")

    //- div.flex.flex-center(v-else)
    //-   BackButton(text="Home" @click="gotoHome")

q-dialog

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
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useCurrentPage } from 'stores/currentpage'
import { useNumberCode } from 'stores/numbercode'
import LinkButton from 'components/LinkButton.vue'
import PinCodeBar from 'components/PinCodeBar.vue'
import PageTitle from 'components/PageTitle.vue'
import { encryptXCha, decryptXCha } from 'assets/js/shield'
import { hash } from 'assets/js/OCBO'
import BackButton from 'components/BackButton.vue'

let pin = ref(false)
let picAccepted = ref(false)

const router = useRouter()
const quasar = useQuasar()
const _currentpage = useCurrentPage()
const _numbercode = useNumberCode()
// const _applicationno = useApplicationNo
let screenWidth = ref(null)

const gotoApplicationHelp = () => {
  // _currentpage.updateValue('helpapplication')
  // router.push('helpapplication')
  updatePage('helpapplication')
}

const gotoFeesHelp = () => {
  // _currentpage.updateValue('helpfees')
  // router.push('helpfees')
  updatePage('helpfees')
}

const gotoPermitHelp = () => {
  // _currentpage.updateValue('helppermit')
  // router.push('helppermit')
  updatePage('helppermit')
}

const gotoNameHelp = () => {
  // _currentpage.updateValue('helpname')
  // router.push('helpname')
  updatePage('helpname')
}

const onResize = () => {
  screenWidth.value = quasar.screen.width
}

const gotoHome = () => {
  _numbercode.clear()
  updatePage('/')
}

const updatePage = (page) => {
  quasar.sessionStorage.setItem(hash('page'), encryptXCha(page))
  router.push(page)
}

const loadCurrentPage = () => {
  const currentPage = quasar.sessionStorage.hasItem(hash('page')) ? quasar.sessionStorage.getItem(hash('page')) : '/'
  const decryptedPage = decryptXCha(currentPage)

  if (!decryptedPage.includes('help')) {
    router.push(decryptedPage)
  }
}

const openPin = () => {
  pin.value = true
}

;(() => {
  loadCurrentPage()
})()
</script>

<style lang="sass" scoped>
.helppage-title
  font-family: 'Roboto'
  font-weight: bold
  font-size: 2.4rem

.grid
  display: grid
  grid-auto-columns: 1fr
  grid-auto-rows: 1fr
  gap: 0px 0px
  grid-template-columns: 1fr 1fr 1fr
  grid-template-rows: 1fr 1fr
  grid-auto-flow: row
  grid-template-areas: "one two three" ". four ."
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

.advance-area
  // margin: 2rem 0 0 0
//   // display: flex
//   // flex-direction: column
//   // flex-wrap: wrap
//   // justify-content: flex-start
//   // align-items: center
//   // align-content: center

.button-area
  // grid-area: button-area
  margin: 2rem 0 0 0

.advance--text
  font-size: 1rem
  color: $yellow
  cursor: pointer
  margin: 3rem 0 0 0

  &:hover
    text-decoration: underline

.grid2
  display: grid
  grid-auto-columns: 1fr
  grid-auto-rows: 1fr
  gap: 0px 0px
  grid-template-columns: 1fr 1fr 1fr
  grid-template-rows: 1fr
  grid-auto-flow: row
  grid-template-areas: "one2 two2 three2"
  justify-content: center
  align-content: center
  justify-items: center
  align-items: center

.one2
  grid-area: one2

.two2
  grid-area: two2

.three2
  grid-area: three2

// .four
//   grid-area: four

.list
  font-family: 'Roboto'
  font-weight: bold
  font-size: 1.4rem
  // font-weight: 800
  color: white
  border: none
  text-align: center

// .list-item
//   box-shadow: -12px 11px 16px -5px rgba(13, 5, 100, 0.45)
//   margin-bottom: 1.5rem
//   border: 3px solid rgba(14,84,160,1)
//   border-radius: 0px 20px 0px 0px
//   background-color: rgba(14,84,160,0.5)
// padding: 0.6rem 1.1rem
//   // padding-bottom 0.6rem

.list-item
  width: 90%
  font-size: 0.9rem
  font-family: 'Roboto', sans-serif
  height: 4.8rem
  margin-top: 1.2rem
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2)
  border: none
  border-radius: 0 20px 0 0
  padding: 0.6rem 1.1rem
  background-color: $yellow
  color: $darktext
  cursor: pointer
  transition: background-color 0.3s ease
  text-transform: uppercase

  &:hover
    background-color: $darktext
    color: $yellow

.image
  background-image: url('../assets/images/main_page_mobile.webp')
  width: 250px
  height: 530px
  background-position: center
  background-repeat: no-repeat
  background-size: contain
  border: 2px solid rgba(255, 255, 255, 0.4)

@media screen and (min-width: 768px)
  .list
    width: 35rem
    font-size: 1.8rem

  // .list-item
  //   padding: 0.6rem 2rem

  .helppage-title
    font-size: 2.8rem
    // padding: 2rem 0 0 0

  .image
    background-image: url('../assets/images/main_page.webp')
    @supports (background-image: url('../assets/images/main_page.avif'))
      background-image: url('../assets/images/main_page.avif')
    width: 500px
    height: auto
    background-position: center
    background-repeat: no-repeat
    background-size: contain
    border: 2px solid rgba(255, 255, 255, 0.4)

@media screen and (min-width: 1024px)
  .list
    font-family: 'Roboto'
    font-weight: bold
    width: 16rem
    margin: 1.5rem

  .list-item
    font-size: 1rem
    padding: 0 2rem
</style>
