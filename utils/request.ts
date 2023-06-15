import { getTokenFromStorage } from "./token"

export const request = async <T>(
  url: string,
  _options: RequestInit = {
    method: "GET",
    headers: {}
  }
): Promise<T> => {
  const options = { ..._options } as RequestInit
  const token = await getTokenFromStorage()
  options.headers = {
    ...options.headers,
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }

  const response = await fetch(url, options)
  return response.json()
}
