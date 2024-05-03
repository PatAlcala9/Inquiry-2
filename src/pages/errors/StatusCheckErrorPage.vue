<template lang="pug">
q-page(padding)
  div(class="flex flex-center")
    span(class="main-title2 title") No {{division}} Application Found
    q-btn(rounded class="button" label="Return" to="/")
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
import { useCurrentPage } from 'stores/currentpage'
</script>

<style lang="sass" scoped>
.title
  font-family: "PoppinsBold"
  font-size: 3rem
</style>
