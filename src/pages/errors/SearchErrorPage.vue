<template lang="pug">

q-page.flex.flex-center(padding)
  div.fit.column.items-center.justify-center.text-center.content-center
    span.error-title {{_errormessage.getMessage}}
    span.subtitle.text-center {{_errormessage.getSubMessage}}
    br
    section.column.items-center.text-center
    span.footer If you need help,&nbsp;
      a.link(@click="gotoHelp") click here
    br
    BackButton(text="Back" @click="gotoHome")

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
// import { useCurrentPage } from 'stores/currentpage'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { encryptXCha, decryptXCha } from 'assets/js/shield'
import { hash } from 'assets/js/OCBO'
import BackButton from 'components/BackButton.vue'

const router = useRouter()
const quasar = useQuasar()
const _errormessage = useErrorMessage()
// const _errorsubmessage = useErrorSubMessage
// const _currentpage = useCurrentPage()

const gotoHome = () => {
  // controller.abort()
  updatePage('/')
  // window.location.reload()
}

const gotoHelp = () => {
  updatePage('helpindex', () => {})
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

<style lang="sass" scoped>
.title
  font-family: 'LexendBold'
  font-size: 2.2rem
  color: white
  padding: 2rem

.subtitle
  font-family: 'LexendBold'
  font-size: 1.8rem
  color: white
  padding: 3rem

.footer
  font-family: 'Roboto'
  font-size: 1.2rem
  color: white
  padding: 1rem

.link
  text-decoration: underline
  cursor: pointer

@media screen and (min-width: 900px)
  .subtitle
    font-size: 1.8rem

  .footer
    font-family: 'Roboto'
    font-size: 1.2rem
    color: white
    padding: 5rem
</style>
