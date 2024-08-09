<template lang="pug">

q-page.page(padding)
  q-resize-observer(@resize="onResize")

  div(v-if="screenWidth <= 767")
    h1 Hello

  div.column.wrap.justify-center.items-center.content-center.text-center(v-else)
    h4 Pin Code isn't available in PC

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useCurrentPage } from 'stores/currentpage'
// import LinkButton from 'components/LinkButton.vue'

const router = useRouter()
const quasar = useQuasar()
const _currentpage = useCurrentPage()
// const _applicationno = useApplicationNo
let screenWidth = ref(null)

const gotoApplicationHelp = () => {
  _currentpage.updateValue('helpapplication')
  router.push('helpapplication')
}

const gotoNameHelp = () => {
  updatePage('helpname')
}

const gotoHome = () => {
  updatePage('/')
}

const onResize = () => {
  screenWidth.value = quasar.screen.width
}

const updatePage = (page) => {
  _currentpage.updateValue(page)
  router.push(page)
}

const checkMobile = () => {
  console.log(screenWidth.value)
  // if (screenWidth.value <= 767) return true
  // else return false
}

;(async () => {
  if (checkMobile()) gotoHome()
  console.log('yeah')
})()
</script>
