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

const router = useRouter()
const _errormessage = useErrorMessage()
// let _errorsubmessage = useErrorSubMessage
const _currentpage = useCurrentPage()

const gotoHome = () => {
  // controller.abort()
  updatePage('/')
  // window.location.reload()
}

const gotoHelp = () => {
  updatePage('helpindex', () => {})
}

const updatePage = (page) => {
  _currentpage.updateValue(page)
  router.push(page)
}
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
