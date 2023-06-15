import clsx from "clsx"
import { useAtom } from "jotai"
import { useState } from "react"
import { BiLoaderCircle } from "react-icons/bi"

import { getMainData } from "~serices"
import { dataAtom } from "~store"
import { saveTokenToStorage } from "~utils/token"

import { validTokenFromServer } from "../serices/index"

interface IProps {
  onSetIsReady: (isReady: boolean) => void
}
// 初始化保存翻译 API 的 KEY 和 APPID
export default function Initial({ onSetIsReady }: IProps) {
  const [token, setToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [, setData] = useAtom(dataAtom)

  const onSubmit = async () => {
    try {
      if (isLoading) return
      setIsLoading(true)
      if (token.trim().length === 0) return
      chrome.storage.sync.set({ token })
      // saveTokenToStorage(token)
      const isValidToken = await validTokenFromServer()
      if (!isValidToken) throw new Error("token is invalid")
      const data = await getMainData()
      // const token = await
      setData(data)
      onSetIsReady(true)
    } catch (error) {
      setError("网络异常或token失效")
      console.log("valid token error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="">
      <div className="flex justify-between mb-4 bg-gray-100 items-center p-4">
        <h5 className="text-lg font-bold text-center">V2EX 访问令牌</h5>
        <a
          href="https://www.v2ex.com/help/personal-access-token"
          target="_blank"
          className="underline-purple-300 underline">
          如何获取？
        </a>
      </div>
      <div className="flex my-4 items-center w-[400px] gap-2 p-4">
        <input
          type="text"
          placeholder="v2ex access token"
          className="flex-grow outline-none border border-transparent border-b-purple-200 p-1.5"
          autoFocus
          value={token}
          onChange={(e) => setToken(e.target.value.trim())}
        />
        <button
          disabled={token.trim().length === 0 || isLoading}
          onClick={onSubmit}
          className={clsx(
            "px-3 py-1.5 rounded-sm  text-white flex items-center gap-1",
            `${token.trim().length === 0 ? "bg-purple-500" : "bg-purple-500"}`
          )}>
          {isLoading && <BiLoaderCircle className="animate-spin" />}
          验证
        </button>
      </div>
      <span className="text-red-600 text-[12px] p-4 h-4">{error}</span>
    </div>
  )
}
