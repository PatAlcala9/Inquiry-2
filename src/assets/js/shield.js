import { useRSAKey } from 'stores/rsakey'
import { JSEncrypt } from 'jsencrypt'

const _rsakey = useRSAKey()
const enc = new JSEncrypt()

export const encrypt = (text) => {
  enc.setPublicKey(_rsakey.publickey)
  const encrypted = enc.encrypt(text)

  return encrypted
}

export const decrypt = (encrypted) => {
  enc.setPrivateKey(_rsakey.privatekey)
  const decrypted = enc.decrypt(encrypted)

  return decrypted
}

// export const aesd = async (text) => {
//   // const response = await fetch('assets/js/aes.wasm')
//   // const buffer = await response.arrayBuffer()
//   // const module = await WebAssembly.compile(buffer)
//   // const instance = new WebAssembly.Instance(module)

//   // const result = instance.exports.encryptAES
//   // return result

//   const key = 'b0a8c7f246e5937812d9e4f5a6b3c2d1'

//   const encryptedContent = new Uint8Array(text.length + authTag.length)
//   encryptedContent.set(ciphertext, 0)
//   encryptedContent.set(authTag, ciphertext.length)

//   const decryptedContent = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv, tagLength: 128 }, key, encryptedContent)

//   const decryptedData = new TextDecoder().decode(decryptedContent)
// }

