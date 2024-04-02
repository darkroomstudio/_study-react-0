import { atom } from 'recoil'

export const loginModalOpenState = atom<boolean>({
  key: 'loginModalOpenState',
  default: false,
})

export const signupModalOpenState = atom<boolean>({
  key: 'signupModalOpenState',
  default: false,
})
