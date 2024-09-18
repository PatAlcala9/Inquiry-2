<template lang="pug">

q-page.page(padding)
  q-resize-observer(@resize="onResize")

  div.fit.column.wrap.justify-center.items-center.content-center.text-center(v-if="screenWidth <= 767")
    PageTitle(text="Name Record Guide")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Type the Name you want to search, please be specific
      picture
        source(srcset="../../assets/images/mobile/name-mobile1.avif" type="image/avif")
        img.image(src="../../assets/images/mobile/name-mobile1.webp" type="image/webp" alt="Name search image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Wait for it to find the list
      picture
        source(srcset="../../assets/images/mobile/name-mobile2.avif" type="image/avif")
        img.image(src="../../assets/images/mobile/name-mobile2.webp" type="image/webp" alt="Name search image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Click the button to get Application Number
      picture
        source(srcset="../../assets/images/mobile/name-mobile3.avif" type="image/avif")
        img.image(src="../../assets/images/mobile/name-mobile3.webp" type="image/webp" alt="Name search image")

    BackButton(text="Back" @click="returnHome")

  div.fit.column.wrap.justify-center.items-center.content-center(v-else)
    PageTitle(text="Name Record Guide")

    section.step
      div.grid
        div.grid-right
          span.details Type your Name
          span.details Please note, avoid generic search
        //- span.details-extra as demonstated below
        //- img.image(src="../../assets/images/pc/app1.webp" alt="application_search_image")
        div.grid-left
          picture.fit.column.wrap.justify-center.items-center.content-center
            source(srcset="../../assets/images/pc/name1.avif" type="image/avif")
            img.image(src="../../assets/images/pc/name1.webp" type="image/webp" alt="Name search image")

    section.step
      div.grid
        div.grid-left
          span.details Wait for it to find the list
          //- span.details-extra as demonstated below
          //- img.image(src="../../assets/images/pc/app2.webp" alt="application_search_image")
        div.grid-right
          picture.fit.column.wrap.justify-center.items-center.content-center
            source(srcset="../../assets/images/pc/name2.avif" type="image/avif")
            img.image(src="../../assets/images/pc/name2.webp" type="image/webp" alt="Name search image")

    section.step
      div.grid
        div.grid-right
          span.details Click the button to get Application Number
          //- span.details-extra as demonstated below
          //- img.image(src="../../assets/images/pc/app2.webp" alt="application_search_image")
        div.grid-left
          picture.fit.column.wrap.justify-center.items-center.content-center
            source(srcset="../../assets/images/pc/name3.avif" type="image/avif")
            img.image(src="../../assets/images/pc/name3.webp" type="image/webp" alt="Name search image")

    //- section.step.fit.column.wrap.justify-center.items-center.content-center
    //-   span.details Click the Check button to check current status
    //-   span.details-extra as demonstated below
    //-   img.image(src="../../assets/images/pc/name_search4.jpg" alt="application_search_image")

    //- section.step.fit.column.wrap.justify-center.items-center.content-center
    //-   span.details Building Status Displayed
    //-   span.details-extra as seen below
    //-   img.image(src="../../assets/images/pc/name_search5.jpg" alt="application_search_image")

    //- section.step.fit.column.wrap.justify-center.items-center.content-center
    //-   span.details Occupancy Status Displayed
    //-   span.details-extra as seen below
    //-   img.image(src="../../assets/images/pc/name_search6.jpg" alt="application_search_image")

    BackButton(text="Back" @click="returnHome")

  //- div(v-if="$q.screen.width <= 1000")
  //-   div(class="full-width column no-wrap justify-center items-center content-start")
  //-     q-btn(rounded class="button" label="Back" @click="returnHome")

  //- div(v-else)
  //-   q-btn(rounded class="button" label="Back" @click="returnHome")
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useCurrentPage } from 'stores/currentpage'
import PageTitle from 'components/PageTitle.vue'
import BackButton from 'components/BackButton.vue'

const router = useRouter()
const quasar = useQuasar()
const _currentpage = useCurrentPage()

let screenWidth = ref(null)

const returnHome = () => {
  // _currentpage.updateValue('helpindex')
  router.push('helpindex', () => {})
}

const onResize = () => {
  screenWidth.value = quasar.screen.width
}

// const loadCurrentPage = () => {
//   router.push(_currentpage.getValue)
// }

// ;(async () => {
//   loadCurrentPage()
// })()
</script>

<style lang="sass" scoped>
.main-title2
  font-size: 1.6rem
  margin: 2rem

.step
  margin-bottom: 1.5rem

.details
  font-family: "Roboto"
  color: $text
  font-size: 1rem
  margin: 0 0 1rem 0

// .details-extra
//   font-family: "Poppins"
//   color: rgba(255, 213, 107, 0.9)

.image
  // box-shadow: -12px 11px 16px -5px rgba(255, 255, 255, 0.45)
  width: 55vw
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 10px rgba(0, 0, 0, 0.1)
  border: 1px solid #263240
  border-radius: 2rem

.button
  width: 90%
  margin-bottom: 1rem

.grid
  display: flex
  flex-direction: column
  flex-wrap: wrap
  justify-content: center
  align-items: center
  align-content: center

@media screen and (min-width: 1023px)
  .main-title2
    font-size: 2rem
    margin-bottom: 2rem

  .details
    font-size: 1.2rem

  .image
    width: 40%

  .grid
    display: grid
    grid-template-columns: 1fr 1fr
    grid-template-rows: 1fr
    gap: 0px 0px
    grid-template-areas: "grid-left grid-right"

  .grid-left
    grid-area: grid-left
    display: flex
    flex-direction: column
    flex-wrap: wrap
    justify-content: center
    align-items: center
    align-content: center

  .grid-right
    grid-area: grid-right
    display: flex
    flex-direction: column
    flex-wrap: wrap
    justify-content: center
    align-items: center
    align-content: center

  .image
    // box-shadow: -12px 11px 16px -5px rgba(255, 255, 255, 0.45)
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 10px rgba(0, 0, 0, 0.1)
    border: 1px solid #263240
    border-radius: 2rem
    width: 40vw
    transition: transform 0.5s

    &:hover
      transform: scale(1.4)
</style>
