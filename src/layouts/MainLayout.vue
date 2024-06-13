<template lang="pug">

q-layout(view="lHh Lpr lFf" class="background")
  q-header(elevated class="menu")

  q-page-container()
    router-view

</template>

<style lang="sass" scoped>
.menu
  background-color: $orange-5

label
  padding-left: 15px
  text-transform: uppercase
  // color: $indigo-10
  color: $text
  font-weight: bold
  font-size: 1.6rem

.background
  // background: rgb(116,161,237)
  // background: radial-gradient(circle, rgba(116,161,237,1) 0%, rgba(45,128,208,1) 44%, rgba(7,75,150,1) 100%)
  background: rgb(13, 13, 101)
  background: radial-gradient(circle, rgba(0, 84, 181,1) 0%, rgba(0, 46, 101,1) 44%, rgba(0, 26, 58,1) 100%)
</style>
