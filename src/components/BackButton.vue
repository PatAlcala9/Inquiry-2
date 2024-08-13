<template lang="pug">

div
  q-btn.button(rounded) {{props.text}}

</template>

<script setup>
const props = defineProps(['text'])
</script>

<style lang="sass" scoped>
.button
  font-family: 'Roboto'
  width: 9rem
  height: 2rem
  background-color: $darktext
  color: $yellow
  font-size: 1.1rem
  opacity: 0.8
  margin: 1rem 0
  border: 1px solid $yellow
</style>
