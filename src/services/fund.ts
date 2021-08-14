import endpoints from './endpoints'
import { Fund } from './interfaces'

/* --------- get fund suggestions ---------*/
export async function fetchFundSuggestions(
  keyword: string
): Promise<Fund.SuggestionItem[]> {
  if (!keyword) return []
  const response = await fetch(endpoints.fund.suggestions(keyword))
  if (!response.ok) throw new Error('获取基金搜索建议失败！')
  return response.json()
}

/* --------- get fund estimated value ------ */
export async function fetchFundEst(codes: string[]): Promise<Fund.EstItem[]> {
  if (!codes.length) return []
  const response = await fetch(endpoints.fund.estimated(codes))
  if (!response.ok) throw new Error('获取基金估值失败！')
  return response.json()
}

/* --------- get fund net value --------- */
export async function fetchFundNet(codes: string[]): Promise<Fund.NetItem[]> {
  if (!codes.length) return []
  const response = await fetch(endpoints.fund.net(codes))
  if (!response.ok) throw new Error('获取基金净值失败！')
  return response.json()
}
