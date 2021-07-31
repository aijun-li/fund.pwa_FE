import { LocalKey } from '@/consts'
import { makeAutoObservable } from 'mobx'

interface WatchItem {
  code: string
  name: string
  hold: boolean
  est?: string
  estRate?: string
  estTime?: number
  net?: string
  netRate?: string
  netTime?: number
}

export class FundStore {
  watchlist: WatchItem[] = []

  constructor() {
    this.#readFromLocal()
    makeAutoObservable(this)
  }

  addWatchItem(code: string, name: string, hold = false) {
    this.watchlist.push({ code, name, hold })
    this.#writeToLocal()
  }

  removeWatchItem(code: string) {
    const index = this.watchlist.findIndex(item => item.code === code)
    if (index < 0) throw new Error('关注列表中不存在指定基金!')
    this.watchlist.splice(index, 1)
    this.#writeToLocal()
  }

  #readFromLocal() {
    const serialized = localStorage.getItem(LocalKey.Watchlist)
    if (serialized) {
      this.watchlist = serialized.split(',').map(item => {
        const [code, name, hold] = item.split('|')
        return { code, name, hold: JSON.parse(hold) as boolean }
      })
    }
  }

  #writeToLocal() {
    const serialized = this.watchlist
      .map(({ code, name, hold }) => `${code}|${name}|${hold}`)
      .join(',')
    localStorage.setItem(LocalKey.Watchlist, serialized)
  }
}

export default new FundStore()
