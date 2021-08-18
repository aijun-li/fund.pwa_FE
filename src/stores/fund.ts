import { LocalKey } from '@/consts'
import { EstItem, NetItem } from '@/services/interfaces/fund'
import { makeAutoObservable } from 'mobx'

export interface WatchItem {
  code: string
  name: string
  hold: boolean
  est: string
  estRate: string
  estTime: number
  net: string
  netRate: string
  netTime: number
}

const placeholderItem: WatchItem = {
  code: '',
  name: '',
  hold: false,
  est: '0.0000',
  estRate: '0.00',
  estTime: Date.now(),
  net: '0.0000',
  netRate: '0.00',
  netTime: Date.now()
}

export class FundStore {
  watchlist: WatchItem[] = []

  constructor() {
    this.#readFromLocal()
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  addWatchItem(code: string, name: string, hold = false) {
    this.watchlist.push({ ...placeholderItem, code, name, hold })
    this.#writeToLocal()
  }

  removeWatchItem(code: string) {
    const index = this.watchlist.findIndex(item => item.code === code)
    if (index < 0) throw new Error('关注列表中不存在指定基金!')
    this.watchlist.splice(index, 1)
    this.#writeToLocal()
  }

  updateWatchItem(infos: NetItem[] | EstItem[]) {
    infos.forEach(info => {
      const index = this.watchlist.findIndex(item => item.code === info.code)
      if (index >= 0) {
        const fund = this.watchlist[index]
        this.watchlist[index] = { ...fund, ...info }
      }
    })
    this.#writeToLocal()
  }

  #readFromLocal() {
    const serialized = localStorage.getItem(LocalKey.Watchlist)
    if (serialized) {
      this.watchlist = serialized.split(',').map(item => {
        const [code, name, hold, est, estRate, estTime, net, netRate, netTime] =
          item.split('|')
        return {
          code,
          name,
          hold: Boolean(hold),
          est,
          estRate,
          estTime: Number(estTime),
          net,
          netRate,
          netTime: Number(netTime)
        }
      })
    }
  }

  #writeToLocal() {
    const serialized = this.watchlist
      .map(
        ({ code, name, hold, est, estRate, estTime, net, netRate, netTime }) =>
          `${code}|${name}|${hold}|${est}|${estRate}|${estTime}|${net}|${netRate}|${netTime}`
      )
      .join(',')
    localStorage.setItem(LocalKey.Watchlist, serialized)
  }
}

export default new FundStore()
