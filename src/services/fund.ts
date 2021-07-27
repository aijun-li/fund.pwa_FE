import { useDebounce } from '@/hooks'
import { useQuery } from 'react-query'
import endpoints from './endpoints'
import { Fund } from './interfaces'

/* --------- get fund suggestions ---------*/
async function fetchFundSuggestions(
  keyword: string
): Promise<Fund.Suggestion[]> {
  if (!keyword) return []
  const response = await fetch(endpoints.fund.suggestions(keyword))
  if (!response.ok) {
    throw new Error('获取基金搜索建议失败！')
  }
  return response.json()
}

export function useFundSuggestions(keyword: string) {
  const debouncedKeyword = useDebounce(keyword, 200)
  return useQuery<Fund.Suggestion[], Error>(
    ['fund', 'suggestions', debouncedKeyword],
    () => fetchFundSuggestions(debouncedKeyword),
    {
      staleTime: 1000 * 60,
      keepPreviousData: true
    }
  )
}
