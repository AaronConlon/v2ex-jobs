// 验证 token 有效性
export const verifyToken = (token: string): any => {
  return ""
}

// get token form storage
export const getToken = async () => {
  const { token = "" } = await chrome.storage.sync.get("token")
  return token as string
}
