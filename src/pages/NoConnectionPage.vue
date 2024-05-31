<template lang="pug">

q-page.fit.column.wrap.justify-center.items-center.content-center(padding)
  span.text No Connection on Server
  q-btn.button-back(rounded label="Back" @click="gotoHome")

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

const router = useRouter()
const _currentpage = useCurrentPage()

const gotoHome = () => {
  updatePage('/')
  // window.location.reload()
}

const updatePage = (page) => {
  _currentpage.updatePage(page)
  router.push(page, () => {})
}
</script>

<style lang="sass" scoped>
.text
  font-family: 'LexendBold'
  font-size: 2.1rem
  color: $text
  text-align: center

.error-button
  margin-top: 2rem

@media screen and (min-width: 900px)
  .text
    font-size: 3rem

</style>
