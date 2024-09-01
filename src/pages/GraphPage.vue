<template lang="pug">

q-page.page(padding)
  GraphGen

  div.flex.flex-center.button-area
    q-btn.button-back2(rounded label="Home" @click="gotoHome")

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useCurrentPage } from 'stores/currentpage'
import { useNumberCode } from 'stores/numbercode'
import LinkButton from 'components/LinkButton.vue'
import PinCodeBar from 'components/PinCodeBar.vue'
import { encryptXCha, decryptXCha } from 'assets/js/shield'
import { hash } from 'assets/js/OCBO'
import GraphGen from 'components/GraphGen.vue'

const quasar = useQuasar()
const router = useRouter()

const gotoHome = () => {
  updatePage('/')
}

const updatePage = (page) => {
  quasar.sessionStorage.setItem(hash('page'), encryptXCha(page))
  router.push(page)
}

const loadCurrentPage = () => {
  const currentPage = quasar.sessionStorage.hasItem(hash('page')) ? quasar.sessionStorage.getItem(hash('page')) : '/'
  const decryptedPage = decryptXCha(currentPage)
  router.push(decryptedPage)
}

;(() => {
  loadCurrentPage()
})()
</script>
