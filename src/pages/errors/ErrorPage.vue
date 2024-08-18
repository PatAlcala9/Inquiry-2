<template lang="pug">

q-page.fit.column.items-center.justify-center.text-center.content-center(padding)
  span.error-title {{ _errormessage.getMessage }}
  span.error-subtitle {{ _errormessage.getSubMessage}}

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
import { useErrorMessage } from 'stores/errormessage'
// import { useErrorSubMessage } from 'stores/errorsubmessage'
import { useCurrentPage } from 'stores/currentpage'
import { useRouter } from 'vue-router'
import { encryptXCha, decryptXCha } from 'src/assets/js/shield'
import { hash } from 'src/assets/js/OCBO'
import { useQuasar } from 'quasar'

const router = useRouter()
const quasar = useQuasar()
const _errormessage = useErrorMessage()
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
  // controller.abort()
  updatePage('/')
  // window.location.reload()
}

;(() => {
  loadCurrentPage()
})()
</script>

<style lang="sass" scoped>
.error-title
  font-family: 'Roboto'
  font-weight: bold
  font-size: 2rem
  color: $text

.error-subtitle
  font-family: 'Roboto'
  font-weight: bold
  font-size: 1.4rem
  margin: 2rem 0 0 0
  color: $text

@media screen and (min-width: 1023px)
  .error-title
    font-size: 3rem

  .error-subtitle
    font-size: 2rem
    padding: 0 0 1rem 0
    margin: 1rem 0 0 0
</style>
