<template lang="pug">

div.div
  span.title {{ props.text }}

</template>

<script setup>
// const props = defineProps({
//   text: {
//     type: String,
//     required: true
//   }
// })

const props = defineProps(['text'])
</script>

<style lang="sass" scoped>
.div
  padding: 1rem 0 2rem 0
  width: 100%
  text-align: center

.title
  font-family: 'Roboto'
  font-weight: bold
  font-size: 1.6rem

@media screen and (min-width: 768px)
  .title
    font-size: 2.4rem

@media screen and (min-width: 1440px)
  .title
    font-size: 2.8rem

</style>
