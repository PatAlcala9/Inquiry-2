<template lang="pug">

div
  q-btn.button(rounded) {{props.text}}

</template>

<script setup>
const props = defineProps(['text'])
</script>

<style lang="sass" scoped>
.button
  width: 12rem
  font-size: 0.9rem
  font-family: 'Roboto', sans-serif
  font-weight: bold
  height: 4.8rem
  margin: 1.2rem 1rem 0 1rem
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2)
  border: none
  border-radius: 0 20px 0 0
  background-color: $yellow
  color: $darktext
  cursor: pointer
  transition: background-color 0.3s ease

  &:hover
    background-color: $darktext
    color: $yellow

@media screen and (min-width: 1023px)
  .button
    width: 14rem
    font-size: 1rem
    padding: 0 2rem
</style>
