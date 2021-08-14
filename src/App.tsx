import SidePanel from '@/components/SidePanel'
import { Layout } from 'antd'
import React from 'react'
import styles from './App.module.scss'

const { Sider, Content } = Layout

export default function App() {
  return (
    <Layout>
      <Sider
        className={styles.fundSider}
        theme="light"
        width="max(375px, 25vw)"
      >
        <SidePanel />
      </Sider>
      <Content className={styles.fundContent}></Content>
    </Layout>
  )
}
