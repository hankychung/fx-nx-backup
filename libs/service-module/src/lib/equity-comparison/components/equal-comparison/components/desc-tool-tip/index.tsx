import React from 'react'
import { Tooltip } from 'antd'
import styles from './index.module.scss'
import descTipsIcon from '../../../../../../assets/introduction/descTips.png'

export const DescTooltip = ({ text }: { text: string }) => {
  return (
    <Tooltip title={text} color={`rgba(17, 18, 20, 0.7)`}>
      <div className={styles.imgBox}>
        <img src={descTipsIcon} alt="tips" width={12} height={12} />
      </div>
    </Tooltip>
  )
}
