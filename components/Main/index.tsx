import { dataAtom, tagAtom } from "~store"

import { BsArrowBarRight } from "react-icons/bs"
import { RxExternalLink } from "react-icons/rx"
import clsx from "clsx"
import { useAtom } from "jotai"
import { useState } from "react"

export default function Main() {
  const [data] = useAtom(dataAtom)
  const [tags] = useAtom(tagAtom)

  const [showDetailId, setShowDetailId] = useState<number[]>([])

  return (
    <div className="main-container flex flex-col gap-1 pb-12">
      {data
        .filter(
          ({ content, title }) =>
            tags.length == 0 ||
            tags.some((tag) => RegExp(tag, "i").test(`${content}${title}`))
        )
        .map(({ id, title, content_rendered, url }) => {
          return (
            <div>
              <div
                key={id}
                className={clsx(
                  "p-4 hover:bg-gray-50 flex items-center truncate group",
                  {
                    "bg-gray-100 text-[#682b6b]": showDetailId.includes(id)
                  }
                )}>
                <BsArrowBarRight
                  className={clsx(
                    "cursor-pointer opacity-20 group-hover:opacity-100",
                    {
                      "rotate-90 opacity-100 ": showDetailId.includes(id)
                    }
                  )}
                  onClick={() =>
                    setShowDetailId((value) => {
                      if (value.includes(id)) {
                        return value.filter((v) => v !== id)
                      }
                      return [...value, id]
                    })
                  }
                />
                <a
                  href={url}
                  target="blank"
                  className="max-w-[90%] mr-auto ml-4 select-none">
                  {title}
                </a>

                <a
                  href={url}
                  target="_blank"
                  className="opacity-0 group-hover:opacity-100 transition-all">
                  <RxExternalLink />
                </a>
              </div>
              {showDetailId.includes(id) && (
                <div
                  className="data-detail"
                  dangerouslySetInnerHTML={{ __html: content_rendered }}></div>
              )}
            </div>
          )
        })}
    </div>
  )
}
