export interface SuggestionItem {
  code: string
  name: string
  type: string
  manager: string[]
  theme: [{ tcode: string; tname: string }]
}

export interface EstItem {
  code: string
  name: string
  est: string
  estRate: string
  estTime: number
}

export interface NetItem {
  code: string
  net: string
  netRate: string
  netTime: number
}
