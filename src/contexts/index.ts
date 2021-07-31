import { FundStore } from '@/stores/fund'
import { createContext } from 'react'

interface Stores {
  FundStore: FundStore
}

export const StoreContext = createContext<Stores>(null!)
