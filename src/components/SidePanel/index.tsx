import SearchInput from '@/components/SearchInput'
import SearchListItem from '@/components/SearchListItem'
import { useFundSuggestions } from '@/services'
import React, { useState } from 'react'
import styles from './style.module.scss'

export default function SidePanel() {
  const [expanded, setExpanded] = useState(false)
  const [keyword, setKeyword] = useState('')
  const { data: suggestions } = useFundSuggestions(keyword)

  return (
    <div className={styles.sidePanel}>
      <div className={styles.sideHeader}>
        <SearchInput
          value={keyword}
          expanded={expanded}
          onChange={setKeyword}
          onExpanded={setExpanded}
        />
      </div>
      <div className={styles.sideBody}>
        {expanded && suggestions?.length ? (
          <div className={styles.suggestionList}>
            {suggestions.map(suggestion => (
              <SearchListItem
                key={suggestion.code}
                className={styles.suggestionListItem}
                data={suggestion}
              />
            ))}
          </div>
        ) : null}
        <div className={styles.fundList}>
          {expanded ? (
            <div
              className={styles.shade}
              onClick={() => {
                setExpanded(false)
                setKeyword('')
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}