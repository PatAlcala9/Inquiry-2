<template lang="pug">

q-page.page(padding)
  q-resize-observer(@resize="onResize")

  div.fit.column.wrap.justify-center.items-center.content-center.text-center(v-if="screenWidth <= 767")
    PageTitle(text="List Generation Guide")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Type the Application either with a dash
      //- span.details-extra as demonstated below
      //- img.image(src="../../assets/images/mobile/app-mobile1.webp" alt="application_search_image")
      picture
        source(srcset="../../assets/images/mobile/app-mobile1.avif" type="image/avif")
        img.image(src="../../assets/images/mobile/app-mobile1.webp" type="image/webp" alt="Application search image")


    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Or without a dash
      //- span.details-extra as demonstated below
      picture
        source(srcset="../../assets/images/mobile/app-mobile2.avif" type="image/avif")
        img.image(src="../../assets/images/mobile/app-mobile2.webp" type="image/webp" alt="Application search image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Then, press Enter on your keypad
      span.details At selection menu, choose the "Order of Payment"
      //- span.details-extra as demonstated below
      picture
        source(srcset="../../assets/images/mobile/app-mobile3.avif" type="image/avif")
        img.image(src="../../assets/images/mobile/app-mobile3.webp" type="image/webp" alt="Application search image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Wait for the data to be finish downloading
      //- span.details-extra as seen below
      picture
        source(srcset="../../assets/images/mobile/fees-mobile4.avif" type="image/avif")
        img.image(src="../../assets/images/mobile/fees-mobile4.webp" type="image/webp" alt="Application search image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Details completely rendered
      //- span.details-extra as seen below
      picture
        source(srcset="../../assets/images/mobile/fees-mobile5.avif" type="image/avif")
        img.image(src="../../assets/images/mobile/fees-mobile5.webp" type="image/webp" alt="Application search image")
      br
      picture
        source(srcset="../../assets/images/mobile/fees-mobile6.avif" type="image/avif")
        img.image(src="../../assets/images/mobile/fees-mobile6.webp" type="image/webp" alt="Application search image")

    BackButton(text="Back" @click="returnHome")

  div.fit.column.wrap.justify-center.items-center.content-center(v-else)
    PageTitle(text="List Generation Guide")

    section.step
      div.grid
        div.grid-right
          span.details Type '--list'
          span.details This enables the command control for List Creation
        //- span.details-extra as demonstated below
        //- img.image(src="../../assets/images/pc/app1.webp" alt="application_search_image")
        div.grid-left
          picture.fit.column.wrap.justify-center.items-center.content-center
            source(srcset="../../assets/images/pc/list1.avif" type="image/avif")
            img.image(src="../../assets/images/pc/list1.webp" type="image/webp" alt="List creation image")

    section.step
      div.grid
        div.grid-left
          span.details Specify the type of list
          span.details For creating list of received application
          span.details type 'received'
          //- span.details-extra as demonstated below
          //- img.image(src="../../assets/images/pc/app2.webp" alt="application_search_image")
        div.grid-right
          picture.fit.column.wrap.justify-center.items-center.content-center
            source(srcset="../../assets/images/pc/list2.avif" type="image/avif")
            img.image(src="../../assets/images/pc/list2.webp" type="image/webp" alt="List creation image")

    section.step
      div.grid
        div.grid-right
          span.details Then, specify the division
          span.details either 'building', 'occupancy', or 'electrical'
          //- span.details-extra as demonstated below
          //- img.image(src="../../assets/images/pc/app3.webp" alt="application_search_image")
        div.grid-left
          picture.fit.column.wrap.justify-center.items-center.content-center
            source(srcset="../../assets/images/pc/list3.avif" type="image/avif")
            img.image(src="../../assets/images/pc/list3.webp" type="image/webp" alt="List creation image")

    section.step
      div.grid
        div.grid-left
          span.details You can either use 'today' and 'yesterday'
          span.details Or you can specify the exact date, just make sure to type the correct spelling
          span.details No special characters needed, just space, and all small letters
          span.details For example: december 25 2025
          //- span.details-extra as demonstated below
          //- img.image(src="../../assets/images/pc/app4.webp" alt="application_search_image")
        div.grid-right
          picture.fit.column.wrap.justify-center.items-center.content-center
            source(srcset="../../assets/images/pc/list4.avif" type="image/avif")
            img.image(src="../../assets/images/pc/list4.webp" type="image/webp" alt="List creation image")

    section.step
      div.grid
        div.grid-right
          span.details Wait for it to finish generate
        //- span.details-extra as demonstated below
        div.grid-left
          picture.fit.column.wrap.justify-center.items-center.content-center
            source(srcset="../../assets/images/pc/list5.avif" type="image/avif")
            img.image(src="../../assets/images/pc/list5.webp" type="image/webp" alt="Application search image")

    section.step
      div.grid
        div.grid-left
          span.details Percentage, total, and complete list will be provided
        div.grid-right
          picture.fit.column.wrap.justify-center.items-center.content-center
            source(srcset="../../assets/images/pc/list6.avif" type="image/avif")
            img.image(src="../../assets/images/pc/list6.webp" type="image/webp" alt="List creation image")

    //- section.step.fit.column.wrap.justify-center.items-center.content-center
    //-   span.details You can also view the history
    //-   //- span.details-extra as demonstated below
    //-   img.image(src="../../assets/images/pc/app6.webp" alt="application_search_image")

    BackButton(text="Back" @click="returnHome")

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

const onResize = () => {
  screenWidth.value = quasar.screen.width
}

const returnHome = () => {
  // _currentpage.updateValue('helpindex')
  router.push('helpindex', () => {})
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

  // .image
  //   width: 40%

  //   &:hover
  //     width: 85%

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
