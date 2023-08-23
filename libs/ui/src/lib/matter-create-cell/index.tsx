import React from 'react'
import cs from 'classnames'
import styles from './index.module.scss'

interface Props {
  img?: string | (() => React.ReactNode)
  grayImg?: string
  text?: string
  onClick?: () => void
  cellCla?: string
  cellContentCla?: string
  imgBoxCla?: string
  placeholder?: string
  textEllipsis?: boolean
  isMatterCreate?: boolean
  showDefaultContent?: boolean
}

const _MatterCreateCell: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const {
    img,
    text,
    onClick,
    cellCla,
    cellContentCla,
    imgBoxCla,
    placeholder,
    textEllipsis = false,
    isMatterCreate = false,
    children,
    showDefaultContent = false
  } = props

  return (
    <div
      className={cs(styles.cell_wrap, cellCla, {
        [styles.ov_hidden]: textEllipsis,
        [styles.cellBoxCla]: isMatterCreate
      })}
    >
      <div
        data-id="content_wrap "
        className={cs(styles.content_wrap, cellContentCla, {
          [styles.ov_hidden]: textEllipsis
        })}
        onClick={onClick}
      >
        {img && (
          <div className={cs(styles.img_box, imgBoxCla)}>
            {typeof img === 'string' ? <img alt="" src={img} /> : img()}
          </div>
        )}
        {showDefaultContent ? (
          <div
            className={cs(styles.text, {
              [styles.gray]: !text,
              [styles.txt_ellipsis]: textEllipsis
            })}
          >
            {text || placeholder || ''}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

export const MatterCreateCell = React.memo(_MatterCreateCell)
