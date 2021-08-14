import { ChinaTimeZone } from '@/consts'
import dayjs from 'dayjs'

function isWeekday() {
  const day = dayjs().tz(ChinaTimeZone).day()
  return ![0, 6].includes(day)
}

function isTimeBetween(start: string, end: string) {
  const time = dayjs().tz(ChinaTimeZone)
  const hour = time.hour().toString().padStart(2, '0')
  const minute = time.minute().toString().padStart(2, '0')
  const second = time.second().toString().padStart(2, '0')
  const now = `${hour}:${minute}:${second}`

  return now >= start && now <= end
}

export function isStockOpen() {
  return isWeekday() && isTimeBetween('09:25:00', '15:35:00')
}

export function isNetUpdatePeriod() {
  return isWeekday() && isTimeBetween('19:00:00', '23:59:59')
}

export function getMMDD(stamp: number) {
  return dayjs(stamp).tz(ChinaTimeZone).format('MM-DD')
}

export function getHHMM(stamp: number) {
  return dayjs(stamp).tz(ChinaTimeZone).format('HH:mm')
}
