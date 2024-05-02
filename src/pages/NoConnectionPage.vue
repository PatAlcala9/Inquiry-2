<template lang="pug">

q-page.fit.column.wrap.justify-center.items-center.content-center(padding)
  span.text No Connection on Server
  q-btn.error-button.button(rounded label="Back" @click="gotoHome")

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
import { useRouter } from 'vue-router'
import { useCurrentPage } from 'stores/currentpage'

const router = useRouter()
let _currentpage = useCurrentPage

const gotoHome = () => {
  updatePage('/')
  // window.location.reload()
}

const updatePage = (page) => {
  _currentpage.value = page
  router.push(page, () => {})
}
</script>

<style lang="sass" scoped>
.text
  font-family: 'PoppinsBold'
  font-size: 2.1rem
  color: white
  text-align: center

.error-button
  margin-top: 2rem

@media screen and (min-width: 900px)
  .text
    font-family: 'PoppinsBold'
    font-size: 3rem
    color: white
</style>
