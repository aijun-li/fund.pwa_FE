import { StoreContext } from '@/contexts'
import { useContext } from 'react'

export function useStore() {
  return useContext(StoreContext)
}
