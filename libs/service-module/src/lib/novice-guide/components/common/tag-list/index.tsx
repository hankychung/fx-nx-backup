import { useState, ChangeEvent } from 'react'
import styles from './index.module.scss'
import cs from 'classnames'
import { Input } from 'antd'
import { diyIndustryId } from '@flyele-nx/constant'
import { useMemoizedFn } from 'ahooks'

export interface ITagsList {
  id: string | number
  title: string
}

interface IProps {
  tags: ITagsList[]
  activeTag: string | number
  onClick: (item: ITagsList) => void
  needAdd?: boolean
  placeholder?: string
}

export const CommonTagList = ({
  tags,
  activeTag,
  onClick,
  needAdd = true,
  placeholder = ''
}: IProps) => {
  const [inputValue, setInputValue] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onClickInput = useMemoizedFn(() => {
    onClick({
      id: diyIndustryId,
      title: inputValue
    })
  })

  return (
    <div className={styles.commonTagList}>
      {tags.map((tag) => {
        return (
          <div
            key={tag.id}
            className={cs(styles.tagItem, {
              [styles.activeTag]: tag.id === activeTag
            })}
            onClick={() => onClick(tag)}
          >
            {tag.title}
          </div>
        )
      })}
      {needAdd && (
        <div
          key={diyIndustryId}
          className={cs(styles.tagItem, {
            [styles.activeTag]: diyIndustryId === activeTag
          })}
          onClick={onClickInput}
        >
          <Input
            value={inputValue}
            placeholder={placeholder}
            maxLength={10}
            bordered={false}
            onChange={onChange}
            style={{ width: '388px', fontSize: '20px' }}
          />
        </div>
      )}
    </div>
  )
}
