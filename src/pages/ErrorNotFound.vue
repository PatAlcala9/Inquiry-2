<template lang="pug">

div.fullscreen.q-pa-md.flex.flex-center.background
  div.body
    picture
      source(srcset="../assets/ocbologo.avif" type="image/avif")
      img.logo(src="../assets/ocbologo.webp" type="image/webp" alt="OCBO Logo")
    h1.main-title(@click="sample") ERROR 404
    h3.error-message Page does not exist

    q-btn.button(rounded to="/") Home
  //- <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
  //-   <div>
  //-     <div style="font-size: 30vh">
  //-       404
  //-     </div>

  //-     <div class="text-h2" style="opacity:.4">
  //-       Oops. Nothing here...
  //-     </div>

  //-     <q-btn
  //-       class="q-mt-xl"
  //-       color="white"
  //-       text-color="blue"
  //-       unelevated
  //-       to="/"
  //-       label="Go Home"
  //-       no-caps
  //-     />
  //-   </div>
  //- </div>
</template>

<script setup></script>

<style lang="sass" scoped>
.background
  position: absolute
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

.body
  display: flex
  flex-direction: column
  flex-wrap: wrap
  justify-content: flex-start
  align-items: center
  align-content: center
  color: white

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

.mobile
  display: inline

.main-title
  font-size: 2.3rem

.error-message
  font-size: 2rem

// .mobile-message
//   font-size: 1rem
//   font-family: 'Poppins', sans-serif

.mobile-title
  margin-top: 2rem
  font-size: 1rem
  font-family: 'Roboto'
  font-weight: bold
  opacity: 0.9

.list
  margin-bottom: 3rem

.bold
  font-weight: bold
  text-decoration: underline
  cursor: pointer





@media screen and (min-width: 768px)
  .logo
    width: 11rem
    height: auto
    margin-top: 1.3rem

  .main-title
    font-size: 3.8rem

  .body
    margin: 4rem 0 0 0



@media screen and (min-width: 1440px)
  .main-title
    font-size: 4.6rem
</style>
