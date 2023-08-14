import React from 'react'
import style from './index.module.scss'

const NewItemDom: React.FC = () => {
  return (
    <div className={style.main}>
      <span className={style.line} />
      <span className={style.txt}>以上是新增事项</span>
      <span className={style.line} />
    </div>
  )
}

export default NewItemDom
