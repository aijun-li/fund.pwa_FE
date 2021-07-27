export interface Suggestion {
  code: string
  name: string
  type: string
  manager: string[]
  theme: [{ tcode: string; tname: string }]
}
