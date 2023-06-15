import type { IInfo } from "~types"
import { atom } from "jotai"

export const dataAtom = atom([] as IInfo[])
export const tagAtom = atom([])
