import { AiFillGithub } from "react-icons/ai"
import { CiLogout } from "react-icons/ci"

export default function Menu({ onResetStatus }: { onResetStatus: () => void }) {
  const onClick = () => {
    chrome.storage.local.clear()
    chrome.storage.sync.clear()
    onResetStatus()
  }
  return (
    <div className="bg-white flex p-2 border-t border-t-gray-50 justify-end group items-center mt-auto">
      <a
        href="https://github.com/Developer27149/v2ex-jobs"
        target="_blank"
        className="mr-auto ml-2 text-xl relative transition-all -left-32 group-hover:left-0">
        <AiFillGithub />
      </a>
      <div
        className="rounded-sm bg-gray-100 hover:bg-gray-200 transition-colors text-black flex gap-2 items-center p-1 px-2 select-none cursor-pointer"
        onClick={onClick}>
        <span>
          <CiLogout />
        </span>
        <span>注销</span>
      </div>
    </div>
  )
}
