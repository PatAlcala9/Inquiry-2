import { useRSAKey } from 'stores/rsakey'
import { JSEncrypt } from 'jsencrypt'
import XChaCha20 from '@rabbit-company/xchacha20'

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

export const encryptXCha = (text) => {
  const encXc = XChaCha20.encrypt(text, process.env.SHIELD)
  return encXc
}

export const decryptXCha = (encrypted) => {
  const decXc = XChaCha20.decrypt(encrypted, process.env.SHIELD)
  return decXc
}
