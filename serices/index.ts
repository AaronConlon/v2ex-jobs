import type { IInfo, IRawResponse } from "~types"
import { getCacheData, saveDataToCache } from "~utils/cache"
import { request } from "~utils/request"

const BASE_URL = "https://www.v2ex.com/api/v2/nodes/jobs/topics"
const TOKEN_URL = "https://www.v2ex.com/api/v2/token"

export const getMainData = async (): Promise<IInfo[]> => {
  const cacheData = await getCacheData()
  if (cacheData) {
    return cacheData
  }
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
  saveDataToCache(result)
  return result
}

export const checkToken = async () => {
  try {
    const { success } = await request<{ success: boolean }>(TOKEN_URL)
    return success === true
  } catch (error) {
    console.log("fetch token fail:", error)
    return false
  }
}
