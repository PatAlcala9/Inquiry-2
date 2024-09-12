<template lang="pug">

q-page.flex.flex-center.page(padding)
  div.loading-screen
    span.loading-title Searching for the name
    span.loading-value {{_searchvalue.getValue.toUpperCase()}}
    span.loading-division Please wait

    div.fit.column.items-center
      BackButton(text="Cancel" @click="gotoHome")

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
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useSearchValue } from 'stores/searchvalue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useTableData } from 'stores/tabledata'
import { useCurrentPage } from 'stores/currentpage'
import { encrypt, decrypt, encryptXCha, decryptXCha } from 'assets/js/shield'
import { hash } from 'assets/js/OCBO'
import BackButton from 'components/BackButton.vue'

const router = useRouter()
const quasar = useQuasar()
const _searchvalue = useSearchValue()
const _tabledata = useTableData()
const _currentpage = useCurrentPage()

let message = ref('Downloading Information from the Server')
let found = false
const controller = new AbortController()

const getClientList = async () => {
  try {
    const encryptedEndpoint = encrypt('CheckConnection')
    const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')

    const connection = await api.get('/api/' + replacedEndpoint, { signal: controller.signal })
    const data = connection.data || null
    const result = data !== null ? decrypt(data.result) : null

    if (result !== null) {
      const encryptedEndpoint = encrypt('GetListofClients')
      const replacedEndpoint = encryptedEndpoint.replace(/\//g, '~')
      const encryptedData = encrypt(_searchvalue.getValue.toUpperCase())
      const replacedData = encryptedData.replace(/\//g, '~')
      const response = await api.get('/api/' + replacedEndpoint + '/' + replacedData, { signal: controller.signal })
      const data = response.data.length !== 0 ? response.data : null

      if (data !== null) {
        _tabledata.updateTable(data)
        found = true
      } else {
      }
    } else {
      updatePage('noconnection')
    }
  } catch {
    _tabledata.updateTable({})
    found = false
  }
}

const gotoNextPage = async () => {
  found === true ? updatePage('namecheck') : updatePage('noconnection')
}

const updatePage = (page) => {
  quasar.sessionStorage.setItem(hash('page'), encryptXCha(page))
  router.push(page)
}

const loadCurrentPage = () => {
  const currentPage = quasar.sessionStorage.hasItem(hash('page')) ? quasar.sessionStorage.getItem(hash('page')) : '/'
  const decryptedPage = decryptXCha(currentPage)
  router.push(decryptedPage)
}

const gotoHome = () => {
  controller.abort()
  updatePage('/')
  // window.location.reload()
}

;(async () => {
  loadCurrentPage()
  await getClientList()
  await gotoNextPage()
})()
</script>

<style lang="sass" scoped>
.button:click
  background-color: red

// .loading-title
//   font-size: 2.3rem
//   font-family: 'Roboto'
//   font-weight: bold

// .loading-type
//   font-size: 1.8rem
//   font-family: 'Roboto'

.loading-division
  font-size: 2rem
  font-family: 'Roboto'
  font-weight: bold
  padding-top: 4rem

.loading-value
  margin-top: 2rem
  font-size: 2.4rem
  font-family: 'Roboto'
  font-weight: bold
  color: $yellow
</style>
