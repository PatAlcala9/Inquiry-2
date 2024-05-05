<template lang="pug">

div
  h1.title {{ props.text }}

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
.title
  font-family: "LexendBold"
  font-size: 3.1rem
</style>
