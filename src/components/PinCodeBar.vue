<template lang="pug">

div
  div.flexbox
    span.code {{ codeValue }}
    section.grid
      button.button.one(@click="pinClick(0)") {{newNumberList[0]}}
      button.button.two(@click="pinClick(1)") {{newNumberList[1]}}
      button.button.three(@click="pinClick(2)") {{newNumberList[2]}}
      button.button.four(@click="pinClick(3)") {{newNumberList[3]}}
      button.button.five(@click="pinClick(4)") {{newNumberList[4]}}
      button.button.six(@click="pinClick(5)") {{newNumberList[5]}}
      button.button.seven(@click="pinClick(6)") {{newNumberList[6]}}
      button.button.eight(@click="pinClick(7)") {{newNumberList[7]}}
      button.button.nine(@click="pinClick(8)") {{newNumberList[8]}}
      button.button.clear(@click="clearPin()") C
      button.button.zero(@click="pinClick(9)") {{newNumberList[9]}}
      button.button.back(@click="backPin()") B

</template>

<script setup>
import { ref } from 'vue'
import { useNumberCode } from 'stores/numbercode'

const _numbercode = useNumberCode()

const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const newNumberList = shuffleArray(numberList)

let codeValue = ref('0')

const pinClick = (num) => {
  codeValue.value = codeValue.value === '0' ? newNumberList[num] : codeValue.value + ' ' + newNumberList[num]
  _numbercode.updateValue(codeValue.value)
}

const clearPin = () => {
  codeValue.value = '0'
  _numbercode.updateValue(codeValue.value)
}

const backPin = () => {
  codeValue.value = codeValue.value.length === 1 || codeValue.value.length === undefined ? '0' : codeValue.value.substring(0, codeValue.value.lastIndexOf(' ')).trim()
  _numbercode.updateValue(codeValue.value)
}
</script>

<style lang="sass" scoped>
.flexbox
  display: flex
  flex-direction: column
  flex-wrap: wrap
  justify-content: center
  align-items: center
  align-content: center
  padding: auto
  margin: 2rem 0 0 0

.grid
  display: grid
  grid-template-columns: 1fr 1fr 1fr
  grid-template-rows: 1fr 1fr 1fr 1fr
  gap: 0px 0px
  grid-template-areas: "one two three" "four five six" "seven eight nine" "clear zero back"

.one
  grid-area: one

.two
  grid-area: two

.three
  grid-area: three

.four
  grid-area: four

.five
  grid-area: five

.six
  grid-area: six

.seven
  grid-area: seven

.eight
  grid-area: eight

.nine
  grid-area: nine

.clear
  grid-area: clear

.zero
  grid-area: zero

.back
  grid-area: back

.code
  color: $yellow
  font-size:  2rem
  padding: 0 0 1rem 0

.button
  width: 3rem
  height: 3rem
  border-radius: 50%
  background-color: $yellow
  color: $darktext
  text-align: center
  // line-height: 40px
  font-size: 1.2rem
  cursor: pointer
  font-weight: bold
  margin: 0.5rem

.button:active
  background-color: $darktext
  color: $yellow

@media screen and (min-width: 1400px)
  .flexbox
    display: flex
    flex-direction: column
    flex-wrap: wrap
    justify-content: center
    align-items: center
    align-content: center
    padding: auto
    margin: -3rem 0 0 0
</style>
