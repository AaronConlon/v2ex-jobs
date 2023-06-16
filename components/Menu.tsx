import { CiLogout } from "react-icons/ci"

export default function Menu({ onResetStatus }: { onResetStatus: () => void }) {
  const onClick = () => {
    chrome.storage.local.clear()
    chrome.storage.sync.clear()
    onResetStatus()
  }
  return (
    <div
      className="fixed bottom-2 right-4 rounded-sm bg-black text-white flex gap-2 items-center p-1 px-2 opacity-10 hover:opacity-100 transition-all select-none cursor-pointer"
      onClick={onClick}>
      <span>
        <CiLogout />
      </span>
      <span>注销</span>
    </div>
  )
}
