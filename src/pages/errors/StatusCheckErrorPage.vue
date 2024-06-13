<template lang="pug">

q-page(padding)
  div.flex.flex-centerflex.flex-center
    span.main-title2.title No {{division}} Application Found
    q-btn.button(rounded label="Return" to="/")

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
import { useCurrentPage } from 'stores/currentpage'
</script>

<style lang="sass" scoped>
.title
  font-family: "PoppinsBold"
  font-size: 3rem
</style>
