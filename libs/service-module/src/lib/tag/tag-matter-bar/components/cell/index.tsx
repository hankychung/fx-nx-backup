import React from 'react'
import cs from 'classnames'
import styles from './index.module.scss'

interface Props {
  img: string | (() => React.ReactNode)
  grayImg?: string
  text?: string
  onClick?: () => void
  cellCla?: string
  cellContentCla?: string
  imgBoxCla?: string
  placeholder?: string
  textEllipsis?: boolean
  content?: () => React.ReactNode // 自定义右边区域
}

const Cell: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const {
    img,
    text,
    onClick,
    cellCla,
    cellContentCla,
    imgBoxCla,
    placeholder,
    content,
    textEllipsis = false
  } = props

  return (
    <div
      className={cs(styles.cell_wrap, cellCla, {
        [styles.ov_hidden]: textEllipsis
      })}
    >
      <div
        data-id="content_wrap "
        className={cs(styles.content_wrap, cellContentCla, {
          [styles.ov_hidden]: textEllipsis
        })}
        onClick={onClick}
      >
        <div className={cs(styles.img_box, imgBoxCla)}>
          {typeof img === 'string' ? <img alt="" src={img} /> : img()}
        </div>
        {content ? (
          content()
        ) : (
          <div
            className={cs(styles.text, {
              [styles.gray]: !text,
              [styles.txt_ellipsis]: textEllipsis
            })}
          >
            {text || placeholder || ''}
          </div>
        )}
      </div>
    </div>
  )
}

export default Cell
