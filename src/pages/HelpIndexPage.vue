<template lang="pug">

q-page.page(padding)
  q-resize-observer(@resize="onResize")

  div.page-title-group.column.wrap.justify-center.items-center.content-center.text-center
    h1.helppage-title Help Page

    q-img.image

    div.flex.flex-center(v-if="screenWidth < 1280")
      q-list.list(bordered separator)
        //- q-item.list-item(clickable v-ripple @click="gotoApplicationHelp")
        //-   q-item-section.list-section Application Status
        LinkButton(text="Application Status" @click="gotoApplicationHelp")
        LinkButton(text="Name Record" @click="gotoNameHelp")
        LinkButton(text="Approved Permits")
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
          q-btn.button-back2(rounded label="Home" @click="gotoHome")

    div.fit.column.justify-center.items-center.content-center(v-else)

      //- div.fit.row.justify-center.items-center.content-center
      div.grid
        //- q-list.list(bordered separator)
          //- q-item.list-item(clickable v-ripple @click="gotoApplicationHelp")
          //-   q-item-section Application Status
        LinkButton.one(text="Application Status" @click="gotoApplicationHelp")
        LinkButton.two(text="Name Record" @click="gotoNameHelp")
        LinkButton.three(text="Approved Permits")
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
        div.advance-area

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
          q-btn.button-back2(rounded label="Home" @click="gotoHome")

    //- div(v-if="$q.screen.width <= 500")
    //-   div.full-width.column.no-wrap.justify-center.items-center.content-start
    //-     q-btn.button-back2(rounded label="Home" @click="gotoHome")

    //- div.flex.flex-center(v-else)
    //-   q-btn.button-back2(rounded label="Home" @click="gotoHome")

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

let pin = ref(false)
let picAccepted = ref(false)

const router = useRouter()
const quasar = useQuasar()
const _currentpage = useCurrentPage()
const _numbercode = useNumberCode()
// const _applicationno = useApplicationNo
let screenWidth = ref(null)

const gotoApplicationHelp = () => {
  _currentpage.updateValue('helpapplication')
  router.push('helpapplication')
}

const gotoNameHelp = () => {
  // _currentpage.updateValue('helpname')
  // router.push('helpname')
  console.log(_numbercode.check)
}

const onResize = () => {
  screenWidth.value = quasar.screen.width
}

const gotoHome = () => {
  _numbercode.clear()
  updatePage('/')
}

const updatePage = (page) => {
  _currentpage.updateValue(page)
  router.push(page)
}

const openPin = () => {
  pin.value = true
}
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
  grid-template-rows: 1fr 1fr 1fr
  grid-auto-flow: row
  grid-template-areas: "one two three" "advance-area advance-area advance-area" "button-area button-area button-area"
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

.advance-area
  grid-area: advance-area

.button-area
  grid-area: button-area
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

@media screen and (min-width: 900px)
  .list
    width: 35rem
    font-size: 1.8rem

  // .list-item
  //   padding: 0.6rem 2rem

  .helppage-title
    font-size: 2.8rem
    // padding: 2rem 0 0 0

@media screen and (min-width: 1280px)
  .list
    font-family: 'Roboto'
    font-weight: bold
    width: 16rem
    margin: 1.5rem

  .list-item
    font-size: 1rem
    padding: 0 2rem

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
</style>
