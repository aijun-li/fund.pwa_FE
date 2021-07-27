import { Fund } from '@/services/interfaces'
import { RightOutlined } from '@ant-design/icons'
import { Card, Tag } from 'antd'
import React from 'react'
import styles from './style.module.scss'

type Props = {
  data: Fund.Suggestion
  className?: string
}

const bodyStyle = {
  display: 'flex',
  padding: '6px 12px 10px'
}

export default function FundListItem({ data, className }: Props) {
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
