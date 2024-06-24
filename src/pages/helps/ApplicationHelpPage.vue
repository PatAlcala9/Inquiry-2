<template lang="pug">

q-page.page(padding)
  q-resize-observer(@resize="onResize")

  div.fit.column.wrap.justify-center.items-center.content-center(v-if="screenWidth <= 500")
    span.main-title2.center-text Application Status Guide

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Type the Application with a dash
      //- span.details-extra as demonstated below
      img.image(src="../../assets/images/mobile/app-mobile1.webp" alt="application_search_image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Or without a dash
      //- span.details-extra as demonstated below
      img.image(src="../../assets/images/mobile/app-mobile2.webp" alt="application_search_image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Press Enter on your keyboard
      span.details At selection menu, choose the "Track Application"
      //- span.details-extra as demonstated below
      img.image(src="../../assets/images/mobile/app-mobile3.webp" alt="application_search_image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Wait for the data to be finish downloading
      //- span.details-extra as seen below
      img.image(src="../../assets/images/mobile/app-mobile4.webp" alt="application_search_image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Details completely rendered
      span.details-extra as seen below
      img.image(src="../../assets/images/mobile/application_search_mobile4.jpg" alt="application_search_image")

    q-btn.button(rounded label="Back" @click="returnHome")

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

  div.fit.column.wrap.justify-center.items-center.content-center(v-if="screenWidth > 500")
    h3.main-title2.center-text Application Status Guide

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Type the Application Number with a dash
      //- span.details-extra as demonstated below
      img.image(src="../../assets/images/pc/app1.webp" alt="application_search_image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Or without a dash
      //- span.details-extra as demonstated below
      img.image(src="../../assets/images/pc/app2.webp" alt="application_search_image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Press Enter on your keyboard
      span.details At selection menu, choose the "Track Application"
      //- span.details-extra as demonstated below
      img.image(src="../../assets/images/pc/app3.webp" alt="application_search_image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Wait for the data to be finish downloading
      //- span.details-extra as demonstated below
      img.image(src="../../assets/images/pc/app4.webp" alt="application_search_image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Once finish downloading, you can view the latest status of your application
      //- span.details-extra as demonstated below
      img.image(src="../../assets/images/pc/app5.webp" alt="application_search_image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details You can also view the history
      //- span.details-extra as demonstated below
      img.image(src="../../assets/images/pc/app6.webp" alt="application_search_image")

    q-btn.button-back(rounded label="Back" @click="returnHome")

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
  _currentpage.value = '/'
  router.push('/', () => {})
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
  font-family: "LexendBold"
  font-size: 2rem
  margin-bottom: 2rem

.step
  margin-bottom: 1.5rem

.details
  font-family: "Lexend"
  color: $text
  font-size: 1.2rem
  margin: 0 0 1rem 0

// .details-extra
//   font-family: "Poppins"
//   color: rgba(255, 213, 107, 0.9)

.image
  box-shadow: -12px 11px 16px -5px rgba(0, 0, 0, 0.45)
  width: 60%

.button
  width: 90%
  margin-bottom: 1rem

@media screen and (min-width: 1023px)
  .image
    width: 40%
</style>
