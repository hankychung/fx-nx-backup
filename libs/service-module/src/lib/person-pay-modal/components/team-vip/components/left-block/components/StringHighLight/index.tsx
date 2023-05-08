import React, { useMemo } from 'react'

interface props {
  keyword: string
  text: string
  highColor?: string
}

export const StringHighLight = ({
  keyword,
  text = '',
  highColor = '#1dd2c1'
}: props) => {
  return useMemo(() => {
    console.log(text, keyword)

    const strs = text.split(keyword || '')

    const last = strs.pop()

    if (!keyword || strs.length === 0) return <span>{text}</span>

    return (
      <span>
        {strs.map((text, i) => {
          return (
            <span key={`${text}-${i}`}>
              {text}
              <span style={{ color: highColor }}>{keyword}</span>
              {i === strs.length - 1 && last}
            </span>
          )
        })}
      </span>
    )
  }, [keyword, text, highColor])
}
