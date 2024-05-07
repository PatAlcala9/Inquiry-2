<template lang="pug">

q-page.padding.flex.flex-center.page
  div.full-width.column.items-center.justify-center.text-center
    span.loading-title Searching for the name
    span.loading-value {{_searchvalue.value.toUpperCase()}}
    span.loading-division Please wait

    div.fit.column.items-center
      q-btn.button(rounded @click="gotoHome") Cancel

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
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useSearchValue } from 'stores/searchvalue'
import { useRouter } from 'vue-router'
import { useTableData } from 'stores/tabledata'
import { useCurrentPage } from 'stores/currentpage'

const router = useRouter()
let _searchvalue = useSearchValue
let _tabledata = useTableData
let _currentpage = useCurrentPage

let message = ref('Downloading Information from the Server')
let found = false
const controller = new AbortController()

const getClientList = async () => {
  try {
    const connection = await api.get('/api/CheckConnection')
    const data = connection.data || null
    const result = data !== null ? data.result : null

    if (result !== null) {
      const response = await api.get('/api/GetListofClients/' + _searchvalue.value.toUpperCase(), {
        signal: controller.signal,
      })
      const data = response.data.length !== 0 ? response.data : null
      let tempData = []
      if (data !== null) {
        data.forEach((element) => {
          if (element.result !== null && element.result2 !== null) {
            tempData.push(element)
          }
        })

        _tabledata.value = tempData
        found = true
      }
    } else {
      updatePage('noconnection')
    }
  } catch {
    _tabledata.value = []
    found = false
  }
}

const gotoNextPage = async () => {
  found === true ? updatePage('namecheck') : updatePage('noconnection')
}

const updatePage = (page) => {
  _currentpage.value = page
  router.push(page, () => {})
}

const gotoHome = () => {
  controller.abort()
  // updatePage('/')
  window.location.reload()
}

const loadCurrentPage = () => {
  router.push(_currentpage.value, () => {})
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

.loading-title
  font-size: 2.3rem
  font-family: 'PoppinsBold'

.loading-type
  font-size: 1.8rem
  font-family: 'Poppins'

.loading-division
  font-size: 2rem
  font-family: 'PoppinsBold'
  padding-top: 4rem

.loading-value
  margin-top: 2rem
  font-size: 2.4rem
  font-family: 'PoppinsBold'
  color: yellow
</style>
