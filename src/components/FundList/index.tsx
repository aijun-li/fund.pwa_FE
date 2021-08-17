import { useFundEst, useFundNet, useStore } from '@/hooks'
import { WatchItem } from '@/stores/fund'
import { getMMDD } from '@/utils'
import { LoadingOutlined, SyncOutlined } from '@ant-design/icons'
import { Empty, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import { observer } from 'mobx-react-lite'
import React from 'react'
import styles from './style.module.scss'

function getRateClass(rateS: string) {
  return +rateS < 0 ? styles.rateDown : +rateS > 0 ? styles.rateUp : undefined
}

function FundList() {
  const { FundStore } = useStore()
  const { watchlist } = FundStore

  const codes = watchlist.map(item => item.code)
  const { netDate, refetchNet, isFetchingNet } = useFundNet(codes)
  const { estDate, estTime, refetchEst, isFetchingEst } = useFundEst(codes)

  return watchlist.length ? (
    <div className={styles.listWrapper}>
      <Table
        className={styles.fundListTable}
        dataSource={[...watchlist]}
        rowKey="code"
        pagination={false}
        size="small"
        scroll={{ y: 'calc(100vh - 129px)' }}
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
          width={'60%'}
        />
        <Column
          key="net"
          title={
            <>
              <div>净值</div>
              <div className={styles.fundDate}>{netDate}</div>
            </>
          }
          sorter={(a: WatchItem, b: WatchItem) =>
            Number(a.netRate) - Number(b.netRate)
          }
          showSorterTooltip={false}
          render={(_, { net, netRate, netTime }: WatchItem) => (
            <div>
              <div>{net}</div>
              <div className={getRateClass(netRate)}>{netRate}%</div>
              {netDate !== '00-00' && getMMDD(netTime) !== netDate && (
                <div className={styles.fundDate}>{getMMDD(netTime)}</div>
              )}
            </div>
          )}
        />
        <Column
          key="estimated"
          title={
            <>
              <div>估值</div>
              <div className={styles.fundDate}>{estDate}</div>
            </>
          }
          sorter={(a: WatchItem, b: WatchItem) =>
            Number(a.estRate) - Number(b.estRate)
          }
          showSorterTooltip={false}
          render={(_, { est, estRate, netTime }: WatchItem) => (
            <div>
              <div>{est}</div>
              <div className={getRateClass(estRate)}>{estRate}%</div>
              {netDate !== '00-00' && getMMDD(netTime) !== netDate && (
                <div style={{ height: '18px' }}></div>
              )}
            </div>
          )}
        />
      </Table>
      <div className={styles.bottomInfo}>
        <span>数据来源: 天天基金网</span>
        <span>
          <span className={styles.fetchIcon}>
            {isFetchingEst || isFetchingNet ? (
              <LoadingOutlined />
            ) : (
              <SyncOutlined
                onClick={() => {
                  refetchEst()
                  refetchNet()
                }}
              />
            )}
          </span>
          <span>估值更新于 {estTime}</span>
        </span>
      </div>
    </div>
  ) : (
    <Empty className={styles.fundListEmpty} description="暂无关注基金" />
  )
}

export default observer(FundList)
