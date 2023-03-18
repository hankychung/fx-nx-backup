import React from 'react'
import { Input } from 'antd'
import { ReactComponent as SearchIcon } from './assets/searchIcon.svg'

export interface IFlySearchInput {
  onChange: (value: string) => void
  placeholder?: string
}

export const FlySearchInput = ({
  onChange,
  placeholder = '输入关键字'
}: IFlySearchInput) => {
  return (
    <Input
      placeholder={placeholder}
      allowClear
      prefix={<SearchIcon color="#6A6A6A" width={15} height={15} />}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
