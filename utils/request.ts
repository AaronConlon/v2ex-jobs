import { getToken } from "./token"

export const request = async <T>(
  url: string,
  _options: RequestInit = {
    method: "GET",
    headers: {}
  }
): Promise<T> => {
  const options = { ..._options } as RequestInit
  const token = await getToken()
  options.headers = {
    ...options.headers,
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }

  const response = await fetch(url, options)
  return response.json()
}
