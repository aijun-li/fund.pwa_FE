import { StoreContext } from '@/contexts'
import { fetchFundEst, fetchFundNet, fetchFundSuggestions } from '@/services'
import { Fund } from '@/services/interfaces'
import { getHHMM, getMMDD, isNetUpdatePeriod, isStockOpen } from '@/utils'
import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

export function useStore() {
  return useContext(StoreContext)
}

export function useDebounce<T>(val: T, delay: number) {
  const [state, setState] = useState(val)

  useEffect(() => {
    const timer = setTimeout(() => setState(val), delay)
    return () => {
      clearTimeout(timer)
    }
  }, [val, delay])

  return state
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

export function useFundEst(codes: string[]) {
  const {
    FundStore: { updateWatchItem }
  } = useStore()
  const [estDate, setEstDate] = useState('00-00')
  const [estTime, setEstTime] = useState('--:--')

  const { refetch, isFetching } = useQuery<Fund.EstItem[], Error>(
    ['fund', 'est', codes],
    () => fetchFundEst(codes),
    {
      onSuccess(estList) {
        let latest = 0
        estList.forEach(est => {
          updateWatchItem(est)
          latest = Math.max(latest, est.estTime)
        })
        setEstDate(getMMDD(latest))
        setEstTime(getHHMM(latest))
      }
    }
  )

  useEffect(() => {
    const timer = setInterval(() => {
      if (estDate === '00-00' || isStockOpen()) {
        refetch()
      }
    }, 30 * 1000)

    return () => clearInterval(timer)
  }, [estDate, refetch])

  return { estDate, estTime, refetchEst: refetch, isFetchingEst: isFetching }
}

export function useFundNet(codes: string[]) {
  const {
    FundStore: { updateWatchItem }
  } = useStore()
  const [netDate, setNetDate] = useState('00-00')
  const [isAllLatest, setIsAllLatest] = useState(false)

  const { refetch, isFetching } = useQuery<Fund.NetItem[], Error>(
    ['fund', 'net', codes],
    () => fetchFundNet(codes),
    {
      onSuccess(netList) {
        const today = getMMDD(Date.now())
        let latest = 0
        let allLatest = true

        netList.forEach(net => {
          updateWatchItem(net)
          latest = Math.max(latest, net.netTime)
          if (getMMDD(net.netTime) !== today) allLatest = false
        })
        setIsAllLatest(allLatest)
        setNetDate(getMMDD(latest))
      }
    }
  )

  useEffect(() => {
    const timer = setInterval(() => {
      if (netDate === '00-00' || (isNetUpdatePeriod() && !isAllLatest)) {
        refetch()
      }
    }, 30 * 1000)

    return () => clearInterval(timer)
  }, [codes, isAllLatest, netDate, refetch])

  return { netDate, refetchNet: refetch, isFetchingNet: isFetching }
}
