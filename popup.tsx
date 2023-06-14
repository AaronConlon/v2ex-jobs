import "./style.css"

import { useAtom } from "jotai"
import { useEffect, useState } from "react"

import Initial from "~components/Initial"
import Loading from "~components/Loading"
import { checkToken, getMainData } from "~serices"
import { dataAtom } from "~store"
import { makeTaskSlow, waitAMoment } from "~utils/common"

function IndexPopup() {
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)
  const [, setData] = useAtom(dataAtom)

  useEffect(() => {
    ;(async () => {
      const isValid = await checkToken()
      if (isValid) {
        // 读取最新数据
        const data = await makeTaskSlow(getMainData())
        setData(data)
      }
      setIsReady(isValid)
      setIsLoading(false)
    })()
  }, [])

  if (isLoading) return <Loading />

  if (!isReady) {
    return <Initial onSetIsReady={() => setIsReady(true)} />
  }

  return <div className="w-[400px]  p-4">popup</div>
}

export default IndexPopup
