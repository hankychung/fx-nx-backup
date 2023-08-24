import React from 'react'
import { Dayjs } from 'dayjs'

interface IProps {
  onClose: () => void
  onConfirm: (date: Dayjs) => void
}

const _ExecuteAtSelector = ({ onClose, onConfirm }: IProps) => {
  return <div>ExecuteAtSelector</div>
}

export const ExecuteAtSelector = React.memo(_ExecuteAtSelector)
