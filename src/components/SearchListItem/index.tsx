import { useStore } from '@/hooks'
import { Fund } from '@/services/interfaces'
import { RightOutlined, StarFilled, StarTwoTone } from '@ant-design/icons'
import { Card, Tag } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'

type Props = {
  data: Fund.Suggestion
  className?: string
}

const bodyStyle = {
  display: 'flex',
  padding: '6px 12px 10px'
}

// TODO: support mark fund as 'hold'
function SearchListItem({ data, className }: Props) {
  const [watched, setWatched] = useState(false)
  const { FundStore } = useStore()

  useEffect(() => {
    setWatched(FundStore.watchlist.some(item => item.code === data.code))
  }, [FundStore.watchlist, data.code])

  const handleClick = () => {
    if (watched) {
      FundStore.removeWatchItem(data.code)
    } else {
      FundStore.addWatchItem(data.code, data.name)
    }
    setWatched(!watched)
  }

  return (
    <Card
      className={`${className} ${styles.fundCard}`}
      bodyStyle={bodyStyle}
      size="small"
      hoverable
    >
      <div className={styles.fundBrief}>
        <div className={styles.fundRow}>
          <span className={styles.fundCode}>{data.code}</span>
          <span>{data.name}</span>
          <span className={styles.iconButton}>
            {watched ? (
              <StarFilled
                style={{ color: 'var(--star-yellow)' }}
                onClick={handleClick}
              />
            ) : (
              <StarTwoTone twoToneColor="#ffbb00" onClick={handleClick} />
            )}
          </span>
        </div>
        <div>
          <Tag className={styles.fundType} color="blue">
            {data.type}
          </Tag>
          {data.theme.map(({ tname, tcode }) => (
            <Tag key={tcode} color="magenta">
              {tname}
            </Tag>
          ))}
        </div>
      </div>
      <RightOutlined className={styles.rightArrow} />
    </Card>
  )
}

export default observer(SearchListItem)
