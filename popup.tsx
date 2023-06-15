import "./style.css"

import { useEffect, useState } from "react"

import Initial from "~components/Initial"
import Loading from "~components/Loading"
import Main from "~components/Main"
import Menu from "~components/Menu"
import { dataAtom } from "~store"
import { getCacheData } from "~utils/cache"
import { getMainData } from "~serices"
import { isValidTokenExpiration } from "~utils/token"
import { makeTaskSlow } from "~utils/common"
import { useAtom } from "jotai"

function IndexPopup() {
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)
  const [, setData] = useAtom(dataAtom)

  useEffect(() => {
    const initFunction = async () => {
      const hadValidToken = await isValidTokenExpiration()
      if (hadValidToken) {
        const data =
          (await getCacheData()) ?? (await makeTaskSlow(getMainData()))
        setData(data)
        setIsReady(true)
      } else {
        setIsReady(false)
      }
      setIsLoading(false)
    }
    initFunction()
  }, [])

  if (isLoading) return <Loading />

  if (!isReady) {
    return <Initial onSetIsReady={() => setIsReady(true)} />
  }

  return (
    <div className="main">
      <Menu />
      <Main />
    </div>
  )
}

export default IndexPopup
