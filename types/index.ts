export interface IInfo {
  id: number
  title: string
  content: string
  content_rendered: string
  syntax: number
  url: string
  replies: number
  last_reply_by: string
  created: number
  last_modified: number
  last_touched: number
}

export interface IRawResponse {
  success: boolean
  message: string
  result: IInfo[]
}

export interface ITokenResult {
  token: string
  scope: string
  expiration: number
  good_for_days: number
  total_used: number
  last_used: number
  created: number
}

export interface ITokenResponse {
  success: boolean
  message: string
  result: ITokenResult
}
