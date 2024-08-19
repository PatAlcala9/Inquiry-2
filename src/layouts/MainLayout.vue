<template lang="pug">

q-layout.background(view="lHh Lpr lFf")
  //- q-header.menu(elevated)

  q-page-container()
    router-view

</template>

<style lang="sass" scoped>
// .menu
//   background-color: $orange-5

label
  padding-left: 15px
  text-transform: uppercase
  // color: $indigo-10
  color: $text
  font-weight: bold
  font-size: 1.6rem

// .background
//   // background: rgb(116,161,237)
//   // background: radial-gradient(circle, rgba(116,161,237,1) 0%, rgba(45,128,208,1) 44%, rgba(7,75,150,1) 100%)
//   // background: rgb(13, 13, 101) //original
//   // background: radial-gradient(circle, rgba(0, 84, 181,1) 0%, rgba(0, 46, 101,1) 44%, rgba(0, 26, 58,1) 100%)
//   background: #424f60
//   // background: radial-gradient(circle farthest-corner at center center, #424f60 0%, #223345 40%, #28323e 100%)
//   // background: -webkit-radial-gradient(circle farthest-corner at center center, #424f60 0%, #223345 40%, #28323e 100%)
//   // background: -moz-radial-gradient(circle farthest-corner at center center, #424f60 0%, #223345 40%, #28323e 100%)
//   background-image: url('../assets/images/bg.webp'), radial-gradient(circle farthest-corner at center center, #424f60 0%, #223345 40%, #28323e 100%)


.background
  position: relative
  background-color: #424f60
  background-image: radial-gradient(circle farthest-corner at center center, #424f60 0%, #223345 40%, #28323e 100%)
  background-size: auto
  background-position: center
  background-repeat: no-repeat

.background::before
  content: ""
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-image: url('../assets/images/bg.webp')
  @supports (background-image: url('../assets/images/bg.avif'))
    background-image: url('../assets/images/bg.avif')
  background-size: cover
  background-attachment: fixed
  background-repeat: no-repeat
  opacity: 0.5
  mix-blend-mode: overlay


</style>
