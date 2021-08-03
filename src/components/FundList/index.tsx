import { useStore } from '@/hooks'
import { useFundEst, useFundNet } from '@/services'
import { WatchItem } from '@/stores/fund'
import { Empty, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import { observer } from 'mobx-react-lite'
import React from 'react'
import styles from './style.module.scss'

function FundList() {
  const { FundStore } = useStore()
  const { watchlist, updateWatchItem } = FundStore

  const codes = watchlist.map(item => item.code)
  const { refetch: refetchEst } = useFundEst(codes, {
    onSuccess: estList => estList.forEach(est => updateWatchItem(est))
  })
  const { refetch: refetchNet } = useFundNet(codes, {
    onSuccess: netList => netList.forEach(net => updateWatchItem(net))
  })

  return watchlist.length ? (
    <Table
      className={styles.fundListTable}
      dataSource={[...watchlist]}
      rowKey="code"
      pagination={false}
      size="small"
      scroll={{ y: 'calc(100vh - 115px)' }}
    >
      <Column
        key="name"
        title="基金名称"
        render={(_, { name, code }: WatchItem) => (
          <div>
            <div>{name}</div>
            <div>{code}</div>
          </div>
        )}
        width={230}
      />
      <Column
        key="net"
        title="净值"
        sorter={(a: WatchItem, b: WatchItem) =>
          Number(a.netRate) - Number(b.netRate)
        }
        showSorterTooltip={false}
        render={(_, { net, netRate }: WatchItem) => (
          <div>
            <div>{net}</div>
            <div
              style={{
                color:
                  netRate && Number(netRate) > 0
                    ? 'var(--red-up)'
                    : 'var(--green-down)'
              }}
            >
              {netRate}%
            </div>
          </div>
        )}
      />
      <Column
        key="estimated"
        title="估值"
        sorter={(a: WatchItem, b: WatchItem) =>
          Number(a.estRate) - Number(b.estRate)
        }
        showSorterTooltip={false}
        render={(_, { est, estRate }: WatchItem) => (
          <div>
            <div>{est}</div>
            <div
              style={{
                color:
                  estRate && Number(estRate) > 0
                    ? 'var(--red-up)'
                    : 'var(--green-down)'
              }}
            >
              {estRate}%
            </div>
          </div>
        )}
      />
    </Table>
  ) : (
    <Empty className={styles.fundListEmpty} description="暂无关注基金" />
  )
}

export default observer(FundList)
