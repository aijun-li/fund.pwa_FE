import { StoreContext } from '@/contexts'
import { useContext, useEffect, useState } from 'react'

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
