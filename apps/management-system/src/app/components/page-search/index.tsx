import React, { useState } from 'react'
import styles from './index.module.scss'
import { FlySearchInput } from '@flyele-nx/ui'
import { FlyButton } from '@flyele/flyele-components'

interface ISearchItem {
  key: string
  title: string
  searchType?: 'text' | 'number' // 搜索类型，目前只有 text文本的需求
  placeholder?: string
}

interface IPageSearch {
  onSearch: (key: string, value: string) => void
  searchItems: ISearchItem[]
}

const _PageSearch = ({ searchItems, onSearch }: IPageSearch) => {
  const [searchValue, setSearchValue] = useState('')

  const onInput = (value: string) => {
    setSearchValue(value)
  }

  return (
    <div className={styles.pageSearchRoot}>
      {searchItems.map((item) => {
        return (
          <div key={item.key} className={styles.searchItem}>
            <div className={styles.searchTitle}>{item.title}</div>
            <div className={styles.search}>
              <div style={{ width: '210px' }}>
                <FlySearchInput
                  placeholder={item.placeholder}
                  onChange={onInput}
                />
              </div>
              <FlyButton
                theme="primary"
                onClick={() => onSearch(item.key, searchValue)}
              >
                搜索
              </FlyButton>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const PageSearch = React.memo(_PageSearch)
