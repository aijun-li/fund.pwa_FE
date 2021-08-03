import { useDebounce } from '@/hooks'
import { useQuery, UseQueryOptions } from 'react-query'
import endpoints from './endpoints'
import { Fund } from './interfaces'

/* --------- get fund suggestions ---------*/
async function fetchFundSuggestions(
  keyword: string
): Promise<Fund.SuggestionItem[]> {
  if (!keyword) return []
  const response = await fetch(endpoints.fund.suggestions(keyword))
  if (!response.ok) throw new Error('获取基金搜索建议失败！')
  return response.json()
}

export function useFundSuggestions(keyword: string) {
  const debouncedKeyword = useDebounce(keyword, 200)
  return useQuery<Fund.SuggestionItem[], Error>(
    ['fund', 'suggestions', debouncedKeyword],
    () => fetchFundSuggestions(debouncedKeyword),
    {
      staleTime: 1000 * 60
    }
  )
}

/* --------- get fund estimated value ------ */
async function fetchFundEst(codes: string[]): Promise<Fund.NetItem[]> {
  if (!codes.length) return []
  const response = await fetch(endpoints.fund.estimated(codes))
  if (!response.ok) throw new Error('获取基金估值失败！')
  return response.json()
}

export function useFundEst(
  codes: string[],
  options: UseQueryOptions<Fund.NetItem[], Error> = {}
) {
  return useQuery<Fund.NetItem[], Error>(
    ['fund', 'estimated', codes],
    () => fetchFundEst(codes),
    options
  )
}

/* --------- get fund net value --------- */
async function fetchFundNet(codes: string[]): Promise<Fund.NetItem[]> {
  if (!codes.length) return []
  const response = await fetch(endpoints.fund.net(codes))
  if (!response.ok) throw new Error('获取基金净值失败！')
  return response.json()
}

export function useFundNet(
  codes: string[],
  options: UseQueryOptions<Fund.NetItem[], Error> = {}
) {
  return useQuery<Fund.NetItem[], Error>(
    ['fund', 'net', codes],
    () => fetchFundNet(codes),
    options
  )
}
