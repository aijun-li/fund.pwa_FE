import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { ChangeEvent, useCallback, useEffect, useRef } from 'react'
import styles from './style.module.scss'

type Props = {
  value: string
  expanded: boolean
  onChange: (val: string) => void
  onExpanded: (expanded: boolean) => void
}

export default function SearchInput({
  value,
  onChange,
  expanded,
  onExpanded
}: Props) {
  const inputRef = useRef<Input>(null!)

  const shortcutIcon = (
    <span className={styles.keyBinding}>
      <kbd className={styles.keyIcon}>⌘</kbd>
      <kbd className={styles.keyIcon} style={{ fontSize: '12px' }}>
        K
      </kbd>
    </span>
  )

  const handleFocus = useCallback(() => {
    onExpanded(true)
  }, [onExpanded])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  const handleCancelClick = useCallback(() => {
    onChange('')
    onExpanded(false)
  }, [onChange, onExpanded])

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (e.metaKey && e.code === 'KeyK') {
        inputRef.current.focus()
      } else if (e.code === 'Escape') {
        onExpanded(false)
        onChange('')
        inputRef.current.blur()
      }
    }
    document.addEventListener('keydown', handleShortcut)
    return () => {
      document.removeEventListener('keydown', handleShortcut)
    }
  }, [onChange, onExpanded])

  useEffect(() => {
    if (!expanded) {
      onChange('')
    }
  }, [expanded, onChange])

  return (
    <>
      <Input
        allowClear
        ref={inputRef}
        className={styles.searchInput}
        style={{ width: expanded ? '100%' : '50%' }}
        value={value}
        prefix={<SearchOutlined style={{ color: 'gray' }} />}
        suffix={expanded ? undefined : shortcutIcon}
        placeholder={expanded ? '请输入基金代码、名称或简拼' : '搜索基金'}
        onFocus={handleFocus}
        onChange={handleChange}
      />
      {expanded && (
        <Button
          className={styles.cancelButton}
          shape="circle"
          icon={<ArrowLeftOutlined />}
          onClick={handleCancelClick}
        />
      )}
    </>
  )
}
