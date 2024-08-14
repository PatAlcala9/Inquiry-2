<template lang="pug">

q-page.page(padding)
  q-resize-observer(@resize="onResize")

  div.fit.column.wrap.justify-center.items-center.content-center.text-center(v-if="screenWidth <= 500")
    span.main-title2.center-text Application Status Guide

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
      span.details At selection menu, choose the "Track Application"
      //- span.details-extra as demonstated below
      picture
        source(srcset="../../assets/images/mobile/app-mobile3.avif" type="image/avif")
        img.image(src="../../assets/images/mobile/app-mobile3.webp" type="image/webp" alt="Application search image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Wait for the data to be finish downloading
      //- span.details-extra as seen below
      picture
        source(srcset="../../assets/images/mobile/app-mobile4.avif" type="image/avif")
        img.image(src="../../assets/images/mobile/app-mobile4.webp" type="image/webp" alt="Application search image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Details completely rendered
      //- span.details-extra as seen below
      picture
        source(srcset="../../assets/images/mobile/app-mobile5.avif" type="image/avif")
        img.image(src="../../assets/images/mobile/app-mobile5.webp" type="image/webp" alt="Application search image")
      br
      picture
        source(srcset="../../assets/images/mobile/app-mobile6.avif" type="image/avif")
        img.image(src="../../assets/images/mobile/app-mobile6.webp" type="image/webp" alt="Application search image")

    q-btn.button-back2(rounded label="Back" @click="returnHome")

  //- div.fit.column.wrap.justify-center.items-center.content-center(v-if="screenWidth > 500 && screenWidth <= 1000")
  //-   h3.main-title2.center-text Application Status Guide

  //-   section.step.fit.column.wrap.justify-center.items-center.content-center
  //-     span.details Type the Application
  //-     span.details-extra as demonstated below
  //-     img.image(srcset="../../assets/images/tablet/application_search_tablet.jpg" alt="application_search_image")

  //-   section.step.fit.column.wrap.justify-center.items-center.content-center
  //-     span.details Wait to finish downloading
  //-     span.details-extra as seen below
  //-     img.image(srcset="../../assets/images/tablet/application_search_tablet2.jpg" alt="application_search_image")

  //-   section.step.fit.column.wrap.justify-center.items-center.content-center
  //-     span.details Wait for List Generating to finish
  //-     span.details-extra as seen below
  //-     img.image(src="../../assets/images/tablet/application_search_tablet3.jpg" alt="application_search_image")

  //-   section.step.fit.column.wrap.justify-center.items-center.content-center
  //-     span.details Details completely rendered
  //-     span.details-extra as seen below
  //-     img.image(src="../../assets/images/tablet/application_search_tablet4.jpg" alt="application_search_image")

  //-   q-btn.button(rounded label="Back" @click="returnHome")

  div.fit.column.wrap.justify-center.items-center.content-center(v-if="screenWidth > 767")
    h3.main-title2.center-text Application Status Guide

    section.step
      div.grid
        div.grid-right
          span.details Click on the input box to activate typing
          span.details Type the Application Number either with a dash
        //- span.details-extra as demonstated below
        //- img.image(src="../../assets/images/pc/app1.webp" alt="application_search_image")
        div.grid-left
          picture.fit.column.wrap.justify-center.items-center.content-center
            source(srcset="../../assets/images/pc/app1.avif" type="image/avif")
            img.image(src="../../assets/images/pc/app1.webp" type="image/webp" alt="Application search image")

    section.step
      div.grid
        div.grid-left
          span.details Or without a dash
          //- span.details-extra as demonstated below
          //- img.image(src="../../assets/images/pc/app2.webp" alt="application_search_image")
        div.grid-right
          picture.fit.column.wrap.justify-center.items-center.content-center
            source(srcset="../../assets/images/pc/app2.avif" type="image/avif")
            img.image(src="../../assets/images/pc/app2.webp" type="image/webp" alt="Application search image")

    section.step
      div.grid
        div.grid-right
          span.details Then, press Enter on your keyboard
          span.details At selection menu, choose the "Track Application"
          //- span.details-extra as demonstated below
          //- img.image(src="../../assets/images/pc/app3.webp" alt="application_search_image")
        div.grid-left
          picture.fit.column.wrap.justify-center.items-center.content-center
            source(srcset="../../assets/images/pc/app3.avif" type="image/avif")
            img.image(src="../../assets/images/pc/app3.webp" type="image/webp" alt="Application search image")

    section.step
      div.grid
        div.grid-left
          span.details Wait for the data to be finish downloading
          //- span.details-extra as demonstated below
          //- img.image(src="../../assets/images/pc/app4.webp" alt="application_search_image")
        div.grid-right
          picture.fit.column.wrap.justify-center.items-center.content-center
            source(srcset="../../assets/images/pc/app4.avif" type="image/avif")
            img.image(src="../../assets/images/pc/app4.webp" type="image/webp" alt="Application search image")

    section.step
      div.grid
        div.grid-right
          span.details Once finish downloading, you can view the latest status of your application
        //- span.details-extra as demonstated below
        div.grid-left
          picture.fit.column.wrap.justify-center.items-center.content-center
            source(srcset="../../assets/images/pc/app5.avif" type="image/avif")
            img.image(src="../../assets/images/pc/app5.webp" type="image/webp" alt="Application search image")

    //- section.step.fit.column.wrap.justify-center.items-center.content-center
    //-   span.details You can also view the history
    //-   //- span.details-extra as demonstated below
    //-   img.image(src="../../assets/images/pc/app6.webp" alt="application_search_image")

    q-btn.button-back2(rounded label="Back" @click="returnHome")

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

const router = useRouter()
const quasar = useQuasar()
const _currentpage = useCurrentPage()

let screenWidth = ref(null)

const onResize = () => {
  screenWidth.value = quasar.screen.width
}

const returnHome = () => {
  _currentpage.updateValue('helpindex')
  router.push('helpindex', () => {})
}

const loadCurrentPage = () => {
  router.push(_currentpage.getValue)
}

;(async () => {
  loadCurrentPage()
})()
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
</style>
