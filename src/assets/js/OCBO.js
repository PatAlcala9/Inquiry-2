const GenerateMD5 = require('md5')
// const Cryptr = require('cryptr')
// const hasher = require('hashr')

// const currentDate = new Date()
// const day = currentDate.getDate()
// const month = currentDate.getMonth()
// const year = currentDate.getFullYear()

export function hash (Password) {
  const md51 = GenerateMD5(Password)
  let vowelCount = 0
  let cosnCount = 0

  // let p1 = md51.substr(0, 8)
  const p2 = md51.substr(8, 8)
  // let p3 = md51.substr(16, 8)
  const p4 = md51.substr(24, 8)

  for (let i = 0; i < Password.length; i++) {
    if (Password.charAt(i) === 'a' || Password.charAt(i) === 'A' || Password.charAt(i) === 'e' || Password.charAt(i) === 'E' || Password.charAt(i) === 'i' || Password.charAt(i) === 'I' || Password.charAt(i) === 'o' || Password.charAt(i) === 'O' || Password.charAt(i) === 'u' || Password.charAt(i) === 'U') {
      vowelCount++
    } else {
      cosnCount++
    }
  }

  const xtra = cosnCount.toString() + vowelCount.toString()
  const md52 = GenerateMD5(xtra)

  const p21 = md52.substr(0, 8)
  // let p22 = md52.substr(8, 8)
  const p23 = md52.substr(16, 8)
  // let p24 = md52.substr(24, 8)

  // return p2 + p22 + p1 + p21 + p4 + p24 + p3 + p23
  return p2 + p21 + p4 + p23
}

export function compareHashes (dbPassword, strPassword) {
  let result
  const estrPassword = GenerateMD5(strPassword)

  if (dbPassword === estrPassword) {
    result = true
  } else {
    result = false
  }
  return result
}

// const key = 'ÑªÙïjX¼n?¢+VB0ö'
// const iv = 'V.ø!»þâ['

// export function encryptAES (network) {
//   const key = new Cryptr('ÑªÙïjX¼n?¢+VB0ö')
//   // this.series++
//   // const key = new Cryptr(hasher.hash(day + '-' + month + '-' + year, 'binary'))
//   const part1 = key.encrypt(network)

//   function reverseString (str) {
//     let stringRev = ''
//     for (let i = 0; i < str.length; i++) {
//       stringRev = str[i] + stringRev
//     }
//     return stringRev
//   }

//   const reversed = reverseString(network)
//   const part2 = key.encrypt(reversed)
//   const combine = part2.substring(0, 4) + part1.substring(0, 4) + part2.substring(4, 8) + part1.substring(4)

//   return combine
// }

// export function decryptAES (network) {
//   const key = new Cryptr('ÑªÙïjX¼n?¢+VB0ö')
//   // const key = new Cryptr(hasher.hash(day + '-' + month + '-' + year, 'binary'))

//   const part1 = network.toString().substring(4, 8)
//   const part2 = network.toString().substring(12)
//   const combine = part1 + part2
//   const decrypted = key.decrypt(combine)

//   return decrypted
// }
