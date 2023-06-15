import type { ITokenResult } from "~types"

// 验证 token 有效性
export const isValidTokenExpiration = async () => {
  const { expiration } = await chrome.storage.sync.get("expiration")
  return !!expiration && expiration > Date.now()
}

// get token form storage
export const getTokenFromStorage = async () => {
  const { token = "" } = await chrome.storage.sync.get("token")
  return token as string
}

// save token info and expiration to storage
export const saveTokenToStorage = async (token: ITokenResult) => {
  const { created, good_for_days } = token
  const expiration = created * 1000 + (good_for_days - 1) * 24 * 60 * 60 * 1000
  // save token and expiration to storage
  await chrome.storage.sync.set({ token: token.token, expiration })
}
