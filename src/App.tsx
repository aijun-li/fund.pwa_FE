import SidePanel from '@/components/SidePanel'
import { UpCircleTwoTone } from '@ant-design/icons'
import { Layout, notification } from 'antd'
import React, { useEffect } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import styles from './App.module.scss'

const { Sider, Content } = Layout

export default function App() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onRegistered() {
      console.log('SW Registered!')
    },
    onRegisterError(error) {
      console.log('SW Registration Error: ' + error)
    }
  })

  useEffect(() => {
    if (needRefresh) {
      notification.open({
        message: '检测到新版本，点击更新',
        onClick: () => updateServiceWorker(true),
        onClose: () => setNeedRefresh(false),
        icon: <UpCircleTwoTone twoToneColor="#52c41a" />,
        duration: null,
        className: styles.updatePrompt
      })
    }
  }, [needRefresh, setNeedRefresh, updateServiceWorker])

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
