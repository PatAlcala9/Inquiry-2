import { defineStore } from 'pinia'

export const useRSAKey = defineStore('rsakey', {
  state: () => {
    return {
      private: `
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDS6hjsPuSjYXu4
f2CW34GKyNEQf6AvwCdF77dsiULIvR3U/exnQJWV4ZuWPhyRZlccBxlTNlbvGCK5
/svplXvDNf9CjcPoFwksrtRlK04w7+1DLiX4PQoaDRLZZTaxWtvwEUXXtqtmr8Pw
3MFn5F8cBC5OHloMSBvHs4JXidyCu5i473AUGZeuyF0YFwhrFdu0zNxa5dgu2Uvg
IrG0mTO0OQ1BWap7OQ3HvgC7+asdI9lXwlXlAT/z+zkNrzf1IeqLfwyCktsID7NZ
+j7wQFvwuaElnPLan9Kd/igwXO60es7461c8nSfGapHSUiDG/3CQfCYh+eufZ4fR
kG3Lh18rAgMBAAECggEAJ4mt2V+i4cPM+xWZyD6m3Jrvoh2irEDju9cHtgd3JwVY
ucxODD8Nq5aq4XvMRC+ApeboxvIZUuHd5KsQk72rgTk2nEXSE0h6Nk+hzkNTeZYI
jr7wbDwZEDAiN/Gi0pV7RGIgiyMZt3q8iwL/GJg1gh2AhrFm5QWBe6q5hOp5lWH5
SIhTNKii5+nYglgBwhOqbA8e3B2afjLQiHukwH1we7ho7RL6lgbhr6AJGr3fYIHq
N745lnbK47k82i+spmCPYMisSTmmnswjYQQAB/C7iwfbjrGame22FpPFQdlqn5A4
laEzUi4qZ4FZYue6aaOQoZzMG355zszfvtyF4PVKiQKBgQDtG7qfhqeVWhAQT7Kx
TZ/ruSSlKHi4qoaaIjPXGEZ2Rgv1mp06Z8kLXXfkj3P+j60PL8dU3Pfefq2CjO4X
vbV2CwVrj6Ma8FLBP9/5NtIZuPO1u87+qC1SGpKU+EiGI3MBGPgiqQ6xoo69oCRf
yb0MPsmJSNTr2PYjs2mQkw20mQKBgQDjuBhNzA4cyH+nlBwy0HT/8J9p1niHiCFA
mR6pLl6o3EC6j05kKB6XtK4jCLvuvuJ5OuxL1ZdkTV2e7UP357cvCFsZpxl4bEf4
ZvGWBe4rooas+5ywDrmkIRHfbhOgrA9gJbKmz3mnRYGQEpt/rTutMeFWG+gIUr+6
nrwhDBvIYwKBgQDFjbD0cXD3k06HCKBN8esor93EbfAHjK0RhyXCNUugB8S3IdeW
bhqoCXx3Rr7SfksmuBxQrLso+kr+1wUZasriS1R8xfST4WBR+zJVpkNvgxYreQuC
SgVYvyMaU7O5b5fGdlNoLYs8ncBoZiFoXeHRbg7k/3XH+8E5BacS+jMVIQKBgQCo
dIo+GuKhtkyAylcl3AGBSB6Va9vT3wdCQ0NkQfIylmSn3dVO0EL5VOaw8ggccEcX
CVi+LK6Gu5izNa/fFyHzAApsaqmz5N5EytqScaajzuIz2xopP2tjGDehgkuwwzfI
l3qWXcsPy6Ix0yIHDD6mO80HJzO53IUK59wh0lRHIwKBgHILMa8cxXtrWnQkv5qz
lhqO+mvX+tMi3C6Dxvw4pxNrO6are1xyM3EedKanRLk52fDIohUHJ6mwwrXTgelO
57KypF/r3TZgrVMCNbtjLqMovzN+V182KQ8Rkgrlwqv8zhPbVwpQ1wU+pRS1cogq
gwpnjBzmwSswUnHYmLTjWkT3
-----END PRIVATE KEY-----
`,

      public: `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvKtDDJFfXuBnw+XLIjST
CzGq4n4Znpyx3h2VBAUNM9dWvYfz0P1og3cX/YTY23eVfc16u+ZNmifp/5aYL7IU
ooogM0bJwSRYXUPiTE27gYuCxq/fwOXnSGCmMXgSQ8kgHaRH1mKLWHY/6KrM0k1V
a4tNbfnuax906B+Hw/3zUSKVHcRQTJ7yInXuwdKI2LZgS8VTQRXORoj59nVm0M8T
OPlUeGgoiT4WPMARKgW2A61o6glOVwUNbhBwjHDv0nt+nMZdt4Ivwb3zD3biybtB
2w1Bs0twuYM/Q2UZbJK6BM+XYFmqR5lwTk0/axesaxe/n7mLbie/J5+7UJ2OQvIJ
bQIDAQAB
-----END PUBLIC KEY-----
      `,
    }
  },

  getters: {
    privatekey: (state) => state.private,
    publickey: (state) => state.public,
  },
})
