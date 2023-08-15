import React from 'react'

import cs from 'classnames'
import styles from './index.module.scss'

interface CardProps {
  id: string
  text: string
  actId: string
  clickCard: (id: string) => void
  showRadius?: boolean
  style?: React.CSSProperties
  className?: string
}
export const Card: React.FC<CardProps> = (props) => {
  const { id, text, actId, clickCard, showRadius, style, className } = props

  return (
    <div
      id={id}
      className={cs(
        styles.card,
        'tab-card',
        {
          [styles.card_active]: actId === id,
          [styles.card__active_hidden_lt]: actId === id && !showRadius,
          bold: actId === id
        },
        className
      )}
      onClick={() => {
        clickCard(id)
      }}
      style={style}
    >
      {text}
    </div>
  )
}
