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
