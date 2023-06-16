import { useEffect, useState } from "react"

import { BsPlusSquareDotted } from "react-icons/bs"
import { CgMenuGridR } from "react-icons/cg"
import { IoIosClose } from "react-icons/io"
import clsx from "clsx"
import { getRandomColor } from "~utils/common"
import logoPng from "data-base64:~assets/logo.png"
import { tagAtom } from "~store"
import { useAtom } from "jotai"

export default function Menu() {
  const [tags, setTags] = useAtom(tagAtom)
  const [value, setValue] = useState("")

  const onClick = () => {
    if (value.trim() === "") return
    setValue("")
    const newTags = [...tags, value]
    setTags(newTags)
    chrome.storage.local.set({ tags: newTags })
  }
  const onRemoveTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag)
    setTags(newTags)
    chrome.storage.local.set({ tags: newTags })
  }

  useEffect(() => {
    chrome.storage.local.get(["tags"], (result) => {
      const tags = result.tags ?? []
      setTags(tags)
    })
  }, [])

  return (
    <div>
      <div className="flex p-2 bg-[#001d25] text-white">
        <img src={logoPng} className="w-16 h-16 rounded-sm mr-4" />
        <div>
          <a
            href="https://www.v2ex.com/"
            target="_blank"
            className="text-xl font-bold">
            v2ex - 酷工作
          </a>
          <p className="opacity-75 mt-2">做有趣的有意义的事情。</p>
        </div>
        <div className="text-black flex items-center ml-auto relative mr-4">
          <input
            type="text"
            value={value}
            placeholder="关键词"
            onChange={(e) => setValue(e.target.value.trim())}
            className="w-full p-2 pr-[34px] outline-none focus:outline-none focus-visible:outline-none rounded-sm"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                onClick()
              }
            }}
          />
          <BsPlusSquareDotted
            className={clsx("absolute right-0 p-2 cursor-pointer h-8 w-8", {
              "opacity-10": value.trim() === ""
            })}
            onClick={onClick}
          />
        </div>
      </div>
      <div className="flex gap-x-2 flex-wrap">
        {tags.map((tag, idx) => (
          <div
            key={tag}
            className={clsx("group tag-item", getRandomColor(idx))}>
            {tag === "全部" && <CgMenuGridR />}
            <section className="flex gap-1 items-center justify-between">
              <span className="min-w-[2rem] text-center text-[13px]">
                {tag}
              </span>
              {tag !== "全部" && (
                <IoIosClose
                  onClick={() => onRemoveTag(tag)}
                  className="text-[20px] p-0.5 rounded-full group-hover:bg-gray-100 transition-all group-hover:text-black cursor-pointer"
                />
              )}
            </section>
          </div>
        ))}
      </div>
    </div>
  )
}
