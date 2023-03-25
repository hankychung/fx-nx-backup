import React, { useRef, useState } from 'react'
import cs from 'classnames'
import { Input, InputRef } from 'antd'
import { ReactComponent as SearchIcon } from '../../../../assets/payImg/search-icon.svg'
import styles from './index.module.scss'

export interface ISearchInputProps {
  value: string
  defaultText?: string
  onChange: (e: string) => void
  onCancel: () => void
  onBlur?: () => void
  onActive?: () => void
  showCancle?: boolean
  filePageScroll?: boolean
  enterSearch?: boolean
  placeholder?: string // 搜索框placeholder
  overlayClassName?: string // 激活时的外部类名
  overlayStaticClassName?: string // 没激活时的外部类名
  overlayAllClassName?: string // 激活 和 没激活时的外部类名 多数用来修改 背景颜色 边框颜色等
  searchStyle?: React.CSSProperties // 搜索框样式
  roundedCornerMode?: boolean // 是否使用全圆角
}

const SearchIconBox: React.FC<React.PropsWithChildren<unknown>> = () => (
  <div className={styles.searchIcon}>
    <SearchIcon color="#B4B4B4" width={16} height={16} />
  </div>
)

const SearchInput = (props: ISearchInputProps) => {
  const {
    value,
    defaultText = '搜索',
    onActive,
    enterSearch,
    placeholder = '输入名称',
    onChange,
    onBlur,
    onCancel,
    filePageScroll,
    overlayClassName,
    overlayAllClassName,
    overlayStaticClassName,
    searchStyle,
    roundedCornerMode,
    showCancle = true
  } = props

  const [active, setActive] = useState(false)

  const lock = useRef(false)

  const inputRef = useRef<InputRef>(null)

  const inputTimer = useRef<NodeJS.Timeout>(null as unknown as NodeJS.Timeout)

  const handleOnChange = (value: string) => {
    clearTimeout(inputTimer.current)

    if (!lock.current && inputRef.current?.input && filePageScroll) {
      const { input } = inputRef.current

      inputTimer.current = setTimeout(() => {
        input.focus()

        const widthSpan = document.getElementById('SearchInputWidthSpan')

        if (!widthSpan) return

        widthSpan.innerHTML = input.value.slice(0, input.selectionEnd || 0)

        const newLeft = (widthSpan.clientWidth || 0) - input.clientWidth + 3

        input.scrollLeft = newLeft
      }, 30)
    }
    onChange(value)
  }

  /**
   * 激活输入框
   */
  const activeInput = () => {
    setActive(true)
    onActive && onActive()
  }

  /**
   * 点击取消
   * 重置搜索栏
   * */
  const handleCancel = () => {
    setActive(false)
    onCancel()
  }

  /**
   * input焦点移出
   */
  const handleBlur = () => {
    onBlur && onBlur()
  }

  return (
    <div className={cs(styles.searchRoot, overlayClassName)}>
      {active ? (
        <div className={styles.searchInputRoot}>
          <Input
            ref={inputRef}
            className={cs(
              styles.searchInput,
              overlayAllClassName,
              roundedCornerMode && styles.roundedClass
            )}
            style={searchStyle}
            placeholder={placeholder}
            prefix={<SearchIconBox />}
            bordered={false}
            allowClear
            autoFocus
            value={value}
            onPressEnter={() => {
              if (!enterSearch) return

              handleOnChange(value)
            }}
            onCompositionStart={(_e) => {
              lock.current = true
            }}
            onCompositionEnd={(e) => {
              lock.current = false
              handleOnChange(e.currentTarget.value)
            }}
            onChange={(e) => handleOnChange(e.currentTarget.value)}
            onBlur={handleBlur}
          />
          {showCancle && (
            <div className={styles.inputCancel} onClick={handleCancel}>
              取消
            </div>
          )}
        </div>
      ) : (
        <div
          className={cs(
            styles.searchStaticRoot,
            roundedCornerMode && styles.roundedClass,
            overlayAllClassName,
            overlayStaticClassName
          )}
          onClick={activeInput}
        >
          <SearchIconBox />
          <div className={styles.staticText}>{defaultText}</div>
        </div>
      )}

      <span
        id="SearchInputWidthSpan"
        className={cs(
          styles.searchInputWidthSpan,
          styles.searchInput,
          overlayAllClassName,
          roundedCornerMode && styles.roundedClass
        )}
        style={searchStyle}
      />
    </div>
  )
}

export default SearchInput
