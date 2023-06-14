import type { IInfo } from "~types"

export const getCacheData = async (): Promise<IInfo[] | null> => {
  const now = new Date().getTime()
  const { info = [], express = now } = await chrome.storage.local.get([
    "info",
    "express"
  ])
  // cache info for 2 minutes
  if (now - express < 2 * 60 * 1000 && info.length > 0) {
    // valid cache
    return info
  } else {
    // invalid cache
    return null
  }
}

export const saveDataToCache = async (data: IInfo[]): Promise<void> => {
  const now = new Date().getTime()
  await chrome.storage.local.set({
    info: data,
    express: now
  })
}
