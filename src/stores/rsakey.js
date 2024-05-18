import { defineStore } from 'pinia'

export const useRSAKey = defineStore('rsakey', {
  state: () => {
    return {
      private: `
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA5K5OVa7Qz0hJMJPeN6fAD53eKMlV6WctaXmP0zNzf3eRBaj6
XLlTObEASFsV+VibUlIcZu3tKiW3joHxwjhpMCEQCwGP2405gR0g7ckPZWHCJLUI
xHv+FeD/Y59TrokwLrnyYuBtmYcnvbu7u9apYKDs3OaKFfKeYqiAGz7tLlHT3ceJ
wtuiLIp6nPUViqqRfzOv5rn2SC/Mc9xishbui4ZxZh87ilxTrdWcTOyL8tmwCXHI
Ra8AMFZ4UQDboQOn/SEN3fMQ/OJj/YmVgS18ymr3jrxcmfPQssTKzrTDSq3KC5cA
isrDwMXJ15RPH7tBzw8d0sozubdhW9858jKhiwIDAQABAoIBAQC51535rBQuIES6
obDZ8g33owhEhTq4cA1LxmrH7OxUDstgmi685C9qlxnvs3ZsKUIw6GIElB9FPVmr
Cpd6i3WQk44CI8bRWjf9Ybq9A8TrU0L/qc/yPgIDrdJfF8Bd+0eY8ay2BkWLm3cE
jmjHAnCsApv7+a8GnyFwdBeIDN+b34LMFuVl14ZrVAUyMjn6Lc2sxwuqfnerMOw3
yUHHT2Q5PqEIS+lvTxq1PibcXPSFlc5p6WPO0hpVAsJf1REXbAahpJp9npFRgG4S
y/jgXxHfmBVWPB43m1+fs1g00r9hE9gG6PII6sso9vSn4gBPTMG7javaoKk1m1BO
6xZoxw4hAoGBAPV5Nic8IS5v9rJd7Oc/VmCjLc+MGoWUqHyTefTOPcyeBoIY88U+
7SNiRPcSMBtHL0aJN7OnWNrQ2a0fVNh6Y1y/3sVjttBdHpKSABLMOFY+i/KUjHuP
6DFGMqpByUHXI7/WlQlIeQisZI0hL61m5+aZuDLsgulk0y1dZifCJXrVAoGBAO58
vyL6t4wyuzGiiBMCjtAebXdeyOHNbHmJao30/haF/Xjy29FfwQuNQfN8+Nhnej/5
H6e4DWM6jFnSj7nMt8xHc94RVLHAiZ8liwfxxWaJ0uIR9pAY5lis3nTgdr4Xo/2B
HtbkWw4jk+kGfzOk9aa6cm726Cii0EtmruEkRxrfAoGAEWEjlGONddw3eylrPHQf
iXgEJk2lExATXb6TQ+HWPkZx74QUvkJWR8sNVvDStxuzHStZ5j5S7CsdPkSZnToN
DuQGwbLtnpL5NydfGfWbh3+mKOabi6QErHhr3eIKfb7dqRdoNeALsbGC7PsMhRpk
EM+RWwmjuyKIUQ3rzaTRQoECgYBRKtHetNf9dlKxrPCFD8zNVl3JT9As0b6Gitdi
IyzLO6UuIfHgi6dnKBd3KGSFOoqn9UDp00FzMT0NYRWblepEM1ljDiD2MmJkcOGl
vYqCwIuud5CkMGVNbuBzhOXFAsTEhcqaNrQq1r8DgzuNtyoIKdLCo3QWSHt9/h+s
7qzonwKBgQCo4U9pZq6OSL2I+AyVSJ52mfbWTNU3fu0g9wRAF2+qr3jl3Yyfnxow
mvvVBtIWYUn8t1+z2zyfOgqs2DMOSDB3Q0pVMzjEShL24J8fJMP0eWeLTjnULynG
DHhOo+IuoiWyXOhqtQKdGwt7A14xgfSsh+RqBVHsyCMP3oFSDM9AuA==
-----END RSA PRIVATE KEY-----
`,

      public: `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5K5OVa7Qz0hJMJPeN6fA
D53eKMlV6WctaXmP0zNzf3eRBaj6XLlTObEASFsV+VibUlIcZu3tKiW3joHxwjhp
MCEQCwGP2405gR0g7ckPZWHCJLUIxHv+FeD/Y59TrokwLrnyYuBtmYcnvbu7u9ap
YKDs3OaKFfKeYqiAGz7tLlHT3ceJwtuiLIp6nPUViqqRfzOv5rn2SC/Mc9xishbu
i4ZxZh87ilxTrdWcTOyL8tmwCXHIRa8AMFZ4UQDboQOn/SEN3fMQ/OJj/YmVgS18
ymr3jrxcmfPQssTKzrTDSq3KC5cAisrDwMXJ15RPH7tBzw8d0sozubdhW9858jKh
iwIDAQAB
-----END PUBLIC KEY-----
      `,
    }
  },

  getters: {
    privatekey: (state) => state.private,
    publickey: (state) => state.public,
  },
})
