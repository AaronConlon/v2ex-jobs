import type { IInfo, IRawResponse, ITokenResponse } from "~types"
import { saveDataToCache } from "~utils/cache"
import { request } from "~utils/request"
import { isValidTokenExpiration, saveTokenToStorage } from "~utils/token"

const BASE_URL = "https://www.v2ex.com/api/v2/nodes/jobs/topics"
const TOKEN_URL = "https://www.v2ex.com/api/v2/token"

export const getMainData = async (): Promise<IInfo[]> => {
  const res = await Promise.allSettled(
    [1, 2, 3].map((page) => request<IRawResponse>(`${BASE_URL}?p=${page}`))
  )
  const result = res
    .filter((item) => item.status === "fulfilled")
    .map((item) => {
      // @ts-ignore
      return item.value?.result
    })
    .flat()
  // save cache and cache time
  saveDataToCache(result)
  return result
}

export const validTokenFromServer = async () => {
  try {
    // valid cache token
    const isValid = await isValidTokenExpiration()
    if (isValid) {
      return true
    }
    const rawTokenResponse = await request<ITokenResponse>(TOKEN_URL)
    // save token to storage
    await saveTokenToStorage(rawTokenResponse.result)
    return rawTokenResponse.success === true
  } catch (error) {
    console.log("fetch token fail:", error)
    return false
  }
}
