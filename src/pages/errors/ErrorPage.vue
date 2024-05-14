<template lang="pug">

q-page.page(padding)
  div.fit.column.items-center.justify-center.text-center.content-center
    span.error-title {{_errormessage.value}}
    span.subtitle.text-center {{_errorsubmessage.value}}
    br
    section.column.items-center.text-center
    span.footer If you need help,&nbsp;
      a.link(@click="gotoHelp") click here

  div
    q-btn.button-back(rounded label="Back" @click="gotoHome")

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
import { useErrorMessage } from 'stores/errormessage'
import { useErrorSubMessage } from 'stores/errorsubmessage'
import { useCurrentPage } from 'stores/currentpage'
import { useRouter } from 'vue-router'

const router = useRouter()
let _errormessage = useErrorMessage
let _errorsubmessage = useErrorSubMessage
let _currentpage = useCurrentPage

const gotoHome = () => {
  // controller.abort()
  updatePage('/')
  // window.location.reload()
}

</script>
