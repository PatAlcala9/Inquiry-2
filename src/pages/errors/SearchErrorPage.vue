<template lang="pug">

q-page.flex.flex-center(padding)
  div.fit.column.items-center.justify-center.text-center.content-center
    span.title {{_errormessage.value}}
    span.subtitle.text-center {{_errorsubmessage.value}}
    br
    section.column.items-center.text-center
    span.footer If you need help,&nbsp;
      a.link(@click="gotoHelp") click here
    br
    q-btn(rounded class="button" label="Back" @click="gotoHome")

</template>

<script>
export default {
  preFetch({ redirect }) {
    let _currentpage = useCurrentPage

    if (_currentpage.value === undefined) {
      redirect({ path: '/' })
    }
  },
}
</script>

<script setup>
import { useErrorMessage } from 'stores/errormessage'
import { useErrorSubMessage } from 'stores/errorsubmessage'
import { useCurrentPage } from 'stores/currentpage'
import { useRouter } from 'vue-router'

const router = useRouter()
let _errormessage = useErrorMessage
let _errorsubmessage = useErrorSubMessage
let _currentpage = useCurrentPage

const gotoHome = () => {
  // controller.abort()
  // updatePage('/')
  window.location.reload()
}

const gotoHelp = () => {
  updatePage('helpindex', () => {})
}

const updatePage = (page) => {
  _currentpage.value = page
  router.push(page, () => {})
}
</script>

<style lang="sass" scoped>
.title
  font-family: 'PoppinsBold'
  font-size: 2.6rem
  color: white
  padding: 2rem

.subtitle
  font-family: 'Poppins'
  font-size: 2rem
  color: white
  padding: 3rem

.footer
  font-family: 'PoppinsLight'
  font-size: 1.2rem
  color: white
  padding: 1rem

.link
  text-decoration: underline
  cursor: pointer

@media screen and (min-width: 900px)
  .subtitle
    font-size: 2.5rem

  .footer
    font-family: 'PoppinsLight'
    font-size: 1.6rem
    color: white
    padding: 5rem
</style>
