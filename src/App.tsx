import SidePanel from '@/components/SidePanel'
import { Layout } from 'antd'
import React from 'react'

const { Sider, Content } = Layout

export default function App() {
  return (
    <Layout>
      <Sider theme="light" width={400}>
        <SidePanel />
      </Sider>
      <Content></Content>
    </Layout>
  )
}
