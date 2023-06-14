import { atom } from "jotai"

import type { IInfo } from "~types"

export const dataAtom = atom([] as IInfo[])
