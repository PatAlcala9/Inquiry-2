<template lang="pug">

q-page.page(padding)
  q-resize-observer(@resize="onResize")

  div.fit.column.wrap.justify-center.items-center.content-center(v-if="screenWidth <= 500")
    span.main-title2.center-text Application Status Guide

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Type the Application
      span.details-extra as demonstated below
      img.image(src="../../assets/images/mobile/application_search_mobile.jpg" alt="application_search_image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Wait to finish downloading
      span.details-extra as seen below
      img.image(src="../../assets/images/mobile/application_search_mobile2.jpg" alt="application_search_image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Wait for List Generating to finish
      span.details-extra as seen below
      img.image(src="../../assets/images/mobile/application_search_mobile3.jpg" alt="application_search_image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Details completely rendered
      span.details-extra as seen below
      img.image(src="../../assets/images/mobile/application_search_mobile4.jpg" alt="application_search_image")

    q-btn.button(rounded label="Back" @click="returnHome")

  div.fit.column.wrap.justify-center.items-center.content-center(v-if="screenWidth > 500 && screenWidth <= 1000")
    h3.main-title2.center-text Application Status Guide

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Type the Application
      span.details-extra as demonstated below
      img.image(srcset="../../assets/images/tablet/application_search_tablet.jpg" alt="application_search_image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Wait to finish downloading
      span.details-extra as seen below
      img.image(srcset="../../assets/images/tablet/application_search_tablet2.jpg" alt="application_search_image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Wait for List Generating to finish
      span.details-extra as seen below
      img.image(src="../../assets/images/tablet/application_search_tablet3.jpg" alt="application_search_image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Details completely rendered
      span.details-extra as seen below
      img.image(src="../../assets/images/tablet/application_search_tablet4.jpg" alt="application_search_image")

    q-btn.button(rounded label="Back" @click="returnHome")

  div.fit.column.wrap.justify-center.items-center.content-center(v-if="screenWidth > 1000")
    h3.main-title2.center-text Application Status Guide

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Type the Application
      span.details-extra as demonstated below
      img.image(src="../../assets/images/pc/application_search.jpg" alt="application_search_image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Wait to finish downloading
      span.details-extra as demonstated below
      img.image(src="../../assets/images/pc/application_search2.jpg" alt="application_search_image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Wait for List Generating to finish
      span.details-extra as demonstated below
      img.image(src="../../assets/images/pc/application_search3.jpg" alt="application_search_image")

    section.step.fit.column.wrap.justify-center.items-center.content-center
      span.details Details completely rendered
      span.details-extra as demonstated below
      img.image(src="../../assets/images/pc/application_search4.jpg" alt="application_search_image")

    q-btn.button(rounded label="Back" @click="returnHome")

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
  font-family: "PoppinsBold"
  font-size: 2.3rem
  margin-bottom: 2rem

.step
  margin-bottom: 1.5rem

.details
  font-family: "PoppinsBold"
  color: #ffd56b
  font-weight: bold
  font-size: 1.1rem

.details-extra
  font-family: "Poppins"
  color: rgba(255, 213, 107, 0.9)

.image
  box-shadow: -12px 11px 16px -5px rgba(13, 5, 100, 0.45)
  width: 80%

.button
  width: 90%
  margin-bottom: 1rem

@media screen and (min-width 400px)
  .main-title2
    font-size: 2rem

  .image
    width: 50%

  .details
    font-size: 1.5rem

  .button
    margin: 2rem
    width: 90%

@media screen and (min-width: 900px)
  .button
    width: 250px
    margin: 2rem 0 0 0
</style>
