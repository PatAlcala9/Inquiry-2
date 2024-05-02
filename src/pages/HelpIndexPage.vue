<template lang="pug">

q-page.page(padding)
  q-resize-observer(@resize="onResize")

  h2.main-title2.center-text Help Page

  div.flex.flex-center(v-if="screenWidth < 1280")
    q-list.list(bordered separator)
      q-item.list-item(clickable v-ripple @click="gotoApplicationHelp")
        q-item-section.list-section Inquire Application Status

      q-item.list-item(clickable v-ripple @click="gotoNameHelp")
        q-item-section Inquire Name if exist

      q-item.list-item(clickable v-ripple)
        q-item-section Inquire Approved Permits

  div.fit.column.justify-center.items-center.content-center(v-else)

    div.fit.row.justify-center.items-center.content-center
      q-list.list(bordered separator)
        q-item.list-item(clickable v-ripple @click="gotoApplicationHelp")
          q-item-section Application Status
      q-list.list(bordered separator)
        q-item.list-item(clickable v-ripple @click="gotoNameHelp")
          q-item-section Name exist Inquiry
    div.fit.row.justify-center.items-center.content-center
      q-list.list(bordered separator)
        q-item.list-item(clickable v-ripple)
          q-item-section Approved Permits
      q-list.list(bordered separator)
        q-item.list-item(clickable v-ripple)
          q-item-section Blank

  div(v-if="$q.screen.width <= 500")
    div.full-width.column.no-wrap.justify-center.items-center.content-start
      q-btn.button(rounded label="Home" @click="gotoHome")

  div.flex.flex-center(v-else)
    q-btn.button(rounded label="Home" @click="gotoHome")

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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useCurrentPage } from 'stores/currentpage'

const router = useRouter()
const quasar = useQuasar()
let _currentpage = useCurrentPage

let screenWidth = ref(null)

const gotoApplicationHelp = () => {
  _currentpage.value = 'helpapplication'
  router.push('helpapplication')
}

const gotoNameHelp = () => {
  _currentpage.value = 'helpname'
  router.push('helpname')
}

const onResize = () => {
  screenWidth.value = quasar.screen.width
}

const gotoHome = () => {
  updatePage('/')
  // window.location.reload()
  // window.location.reload()
}

const updatePage = (page) => {
  _currentpage.value = page
  router.push(page, () => {})
}
</script>

<style lang="sass" scoped>
.main-title2
  font-family: "PoppinsBold"
  font-size: 3.1rem

.list
  font-family: "Poppins"
  font-size: 1.6rem
  color: white
  border: none
  text-align: center

.list-item
  box-shadow: -12px 11px 16px -5px rgba(13, 5, 100, 0.45)
  margin-bottom: 1.5rem
  border: 3px solid rgba(14,84,160,1)
  border-radius: 0px 20px 0px 0px
  background-color: rgba(14,84,160,0.5)
  padding: 0.6rem 1.1rem
  // padding-bottom 0.6rem

@media screen and (min-width: 900px)
  .list
    width: 35rem
    font-size: 1.8rem

  .list-item
    padding: 0.6rem 2rem

  .main-title2
    font-size: 3.5rem

@media screen and (min-width: 1280px)
  .list
    font-family: "PoppinsBold"
    width: 16rem
    margin: 1.5rem

  .list-item
    height: 10rem
</style>
