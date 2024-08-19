<template lang="pug">

q-page.fit.column.wrap.justify-center.items-center.content-center(padding)
  span.text No Connection on Server
  q-btn.button-back2(rounded label="Back" @click="gotoHome")

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
import { useRouter } from 'vue-router'
import { useCurrentPage } from 'stores/currentpage'
import { encryptXCha, decryptXCha } from 'assets/js/shield'
import { hash } from 'src/assets/js/OCBO'
import { useQuasar } from 'quasar'

const router = useRouter()
const quasar = useQuasar()
const _currentpage = useCurrentPage()

const updatePage = (page) => {
  quasar.sessionStorage.setItem(hash('page'), encryptXCha(page))
  router.push(page)
}

const loadCurrentPage = () => {
  const currentPage = quasar.sessionStorage.hasItem(hash('page')) ? quasar.sessionStorage.getItem(hash('page')) : '/'
  const decryptedPage = decryptXCha(currentPage)
  router.push(decryptedPage)
}

const gotoHome = () => {
  updatePage('/')
  // window.location.reload()
}

;(() => {
  loadCurrentPage()
})()
</script>

<style lang="sass" scoped>
.text
  font-family: 'Roboto'
  font-weight: bold
  font-size: 1.8rem
  color: $text
  text-align: center

.error-button
  margin-top: 2rem

@media screen and (min-width: 768px)
  .text
    font-size: 2.8rem
</style>
